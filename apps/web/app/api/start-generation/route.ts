/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { v4 as uuidv4 } from "uuid";
import { access } from "fs";

export async function POST(req: Request) {
  console.log("--- 🔍 DEBUG MODE V2 STARTING ---");

  // 1. CHECK VARIABLES
  // Use REGION if AWS_REGION is missing (Amplify Console variable name mismatch fix)
  const bucket = process.env.S3_BUCKET_NAME;
  const table = process.env.TABLE_NAME;
  const region = process.env.AWS_REGION || process.env.REGION;

  console.log("Config Check:", {
    hasBucket: !!bucket,
    bucketName: bucket ? bucket.substring(0, 3) + "..." : "MISSING ❌",
    hasTable: !!table,
    tableName: table || "MISSING ❌",
    hasRegion: !!region,
    region: region || "MISSING ❌",
  });

  if (!bucket || !table || !region) {
    return NextResponse.json(
      {
        error:
          "Server Configuration Error: Missing Env Vars. Check Amplify Console.",
      },
      { status: 500 },
    );
  }

  const accessKeyId: string = process.env.ACCESS_KEY_ID || "";
  const secretAccessKey: string = process.env.SECRET_ACCESS_KEY || "";

  if (!accessKeyId || !secretAccessKey) {
    console.error("AWS Credentials Missing");
    return NextResponse.json(
      {
        error:
          "Server Configuration Error: Missing AWS Credentials. Check Amplify Console.",
      },
      { status: 500 },
    );
  }

  // Initialize Clients
  // We initialize them here so we can fail fast if creds are bad
  const credentials = {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  };

  const config = { region, credentials };
  const s3 = new S3Client(config);
  const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient(config));
  const lambda = new LambdaClient(config);

  let step = "init";

  try {
    const { prompt, images } = await req.json();
    const jobId = uuidv4();
    const inputKeys: string[] = [];

    // --- STEP 1: S3 UPLOAD ---
    step = "S3_UPLOAD";
    console.log(`Step 1: Uploading to bucket [${bucket}]...`);

    try {
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
    } catch (s3Error: any) {
      console.error("❌ S3 ERROR:", s3Error);
      throw new Error(`S3 Upload Failed: ${s3Error.message}`);
    }

    // --- STEP 2: DYNAMODB SAVE ---
    step = "DYNAMO_SAVE";
    console.log(`Step 2: Saving to table [${table}]...`);
    const now = Math.floor(Date.now() / 1000);

    try {
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
    } catch (dbError: any) {
      console.error("❌ DYNAMO ERROR:", dbError);
      throw new Error(`DynamoDB Save Failed: ${dbError.message}`);
    }

    // --- STEP 3: LAMBDA INVOKE ---
    step = "LAMBDA_INVOKE";
    console.log("Step 3: Invoking worker lambda...");

    try {
      await lambda.send(
        new InvokeCommand({
          FunctionName: "poster-generation-worker", // Ensure this matches EXACTLY in AWS Lambda Console
          InvocationType: "Event",
          Payload: JSON.stringify({ jobId }),
        }),
      );
    } catch (lambdaError: any) {
      console.error("❌ LAMBDA ERROR:", lambdaError);
      throw new Error(`Lambda Invoke Failed: ${lambdaError.message}`);
    }

    console.log("✅ SUCCESS: Job started");
    return NextResponse.json({ success: true, jobId });
  } catch (error: any) {
    console.error(`❌ CRASHED AT STEP [${step}]:`, error);

    return NextResponse.json(
      {
        error: "Generation Failed",
        failedStep: step, // This tells us exactly WHERE it stopped
        details: error.message,
        name: error.name,
      },
      { status: 500 },
    );
  }
}
