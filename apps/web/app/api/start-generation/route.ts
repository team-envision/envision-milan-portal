import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { v4 as uuidv4 } from "uuid";

const config = { region: process.env.REGION || "ap-south-1" };
const s3 = new S3Client(config);
const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient(config));
const lambda = new LambdaClient(config);

export async function POST(req: Request) {
  console.log("--- 🚀 API STARTING: NEW ARCHITECTURE ---"); // LOOK FOR THIS LOG
  const start = Date.now();

  try {
    const { prompt, images } = await req.json();
    console.log(
      `Payload received. Images: ${images?.length}, Time: ${Date.now() - start}ms`,
    );

    const jobId = uuidv4();
    const inputKeys: string[] = [];

    // 1. Upload to S3
    console.log("Starting S3 Upload...");
    await Promise.all(
      images.map(async (base64Data: string, index: number) => {
        const buffer = Buffer.from(base64Data, "base64");
        const key = `temp/${jobId}/img_${index}.jpg`;
        await s3.send(
          new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: "image/jpeg",
          }),
        );
        inputKeys.push(key);
      }),
    );
    console.log(`S3 Upload Done. Time: ${Date.now() - start}ms`);

    // 2. DynamoDB
    console.log("Saving to DynamoDB...");
    const now = Math.floor(Date.now() / 1000);
    await dynamo.send(
      new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
          jobId: jobId,
          status: "processing",
          prompt: prompt,
          inputImageKeys: inputKeys,
          createdAt: now,
          ttl: now + 86400,
        },
      }),
    );
    console.log(`DynamoDB Saved. Time: ${Date.now() - start}ms`);

    // 3. Invoke Worker
    console.log("Invoking Worker Lambda...");
    await lambda.send(
      new InvokeCommand({
        FunctionName: "poster-generation-worker",
        InvocationType: "Event",
        Payload: JSON.stringify({ jobId }),
      }),
    );
    console.log(`Worker Invoked. TOTAL TIME: ${Date.now() - start}ms`);

    return NextResponse.json({ success: true, jobId });
  } catch (error) {
    console.error("❌ CRITICAL ERROR:", error);
    return NextResponse.json({ error: "Failed to start job" }, { status: 500 });
  }
}
