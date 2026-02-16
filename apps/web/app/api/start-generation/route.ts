import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { v4 as uuidv4 } from "uuid";

interface GenerationRequest {
  prompt: string;
  images: string[];
}

interface JobItem {
  jobId: string;
  status: "processing" | "completed" | "failed";
  prompt: string;
  inputImageKeys: string[];
  ttl: number;
}

const s3 = new S3Client({ region: process.env.REGION || "ap-south-1" });
const dynamo = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: process.env.REGION || "ap-south-1" }),
);
const lambda = new LambdaClient({
  region: process.env.REGION || "ap-south-1",
});

export async function POST(req: Request) {
  try {
    const { prompt, images }: GenerationRequest = await req.json();

    if (!prompt || !images || !Array.isArray(images)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const jobId = uuidv4();

    const inputKeys: string[] = await Promise.all(
      images.map(async (b64, i) => {
        const buffer = Buffer.from(b64, "base64");
        const key = `temp/${jobId}/img_${i}.jpg`;

        await s3.send(
          new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: "image/jpeg",
          }),
        );
        return key;
      }),
    );

    const jobItem: JobItem = {
      jobId,
      status: "processing",
      prompt,
      inputImageKeys: inputKeys,
      ttl: Math.floor(Date.now() / 1000) + 86400,
    };

    await dynamo.send(
      new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: jobItem,
      }),
    );

    const payload = JSON.stringify({ jobId });
    await lambda.send(
      new InvokeCommand({
        FunctionName: "poster-generation-worker",
        InvocationType: "Event",
        Payload: new TextEncoder().encode(payload),
      }),
    );

    return NextResponse.json({ jobId });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API Error:", message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
