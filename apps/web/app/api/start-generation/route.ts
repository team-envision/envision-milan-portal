import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  console.log("--- 🔍 DEBUG MODE STARTING ---");

  // 1. CHECK VARIABLES
  const bucket = process.env.S3_BUCKET_NAME;
  const table = process.env.TABLE_NAME;
  const region = process.env.REGION || "ap-south-1";

  console.log("Config Check:", {
    hasBucket: !!bucket,
    bucketName: bucket ? bucket.substring(0, 3) + "..." : "MISSING ❌",
    hasTable: !!table,
    tableName: table || "MISSING ❌",
    region: region || "MISSING ❌",
  });

  if (!bucket || !table || !region) {
    console.error("❌ CRITICAL: Missing Environment Variables");
    return NextResponse.json(
      { error: "Server Configuration Error: Missing Env Vars" },
      { status: 500 },
    );
  }

  // Initialize Clients INSIDE the handler to catch config errors
  try {
    const config = { region };
    const s3 = new S3Client(config);
    const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient(config));
    const lambda = new LambdaClient(config);

    const { prompt, images } = await req.json();
    const jobId = uuidv4();
    const inputKeys: string[] = [];

    // 2. UPLOAD TO S3
    console.log(`Step 1: Uploading to bucket [${bucket}]...`);
    await Promise.all(
      images.map(async (base64Data: string, index: number) => {
        const buffer = Buffer.from(base64Data, "base64");
        const key = `temp/${jobId}/img_${index}.jpg`;
        await s3.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: buffer,
            ContentType: "image/jpeg",
          }),
        );
        inputKeys.push(key);
      }),
    );

    // 3. SAVE TO DYNAMODB
    console.log(`Step 2: Saving to table [${table}]...`);
    const now = Math.floor(Date.now() / 1000);
    await dynamo.send(
      new PutCommand({
        TableName: table,
        Item: {
          jobId,
          status: "processing",
          prompt,
          inputImageKeys: inputKeys,
          createdAt: now,
          ttl: now + 86400,
        },
      }),
    );

    // 4. INVOKE WORKER
    console.log("Step 3: Invoking worker lambda...");
    await lambda.send(
      new InvokeCommand({
        FunctionName: "poster-generation-worker",
        InvocationType: "Event",
        Payload: JSON.stringify({ jobId }),
      }),
    );

    console.log("✅ SUCCESS: Job started");
    return NextResponse.json({ success: true, jobId });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ CRASHED:", error);
    // Return the ACTUAL error message to the frontend so you can see it in browser console
    return NextResponse.json(
      {
        error: "Generation Failed",
        details: error.message,
        name: error.name,
      },
      { status: 500 },
    );
  }
}
