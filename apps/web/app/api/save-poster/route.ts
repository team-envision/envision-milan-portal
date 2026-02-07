import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

// Initialize AWS Clients
// Note: In Next.js 16/App Router, these are initialized on the server side.
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      imageBase64, // Expecting base64 string (either raw or data URI)
      prompt, 
      theme, 
      memory, 
      compressedText 
    } = body;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "Image data is required" },
        { status: 400 }
      );
    }

    // 1. Process Image Data
    // Strip "data:image/jpeg;base64," prefix if present
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    
    // Generate unique IDs and S3 key
    const posterId = crypto.randomUUID();
    // Folder in S3 where posters are saved. Configure via env var S3_POSTERS_FOLDER
    const folder = process.env.S3_POSTERS_FOLDER || "posters";
    const fileName = `${folder}/${posterId}.png`;

    // 2. Upload to S3
    const uploadParams: any = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: "image/png",
      ContentEncoding: "base64",
    };

    // Optionally set public read ACL when S3_PUBLIC env var is 'true'
    if (process.env.S3_PUBLIC === "true") {
      uploadParams.ACL = "public-read";
    }

    await s3Client.send(new PutObjectCommand(uploadParams));

    // Construct the public URL (assuming standard S3 public access or CloudFront)
    // If bucket is private, you might generate a presigned URL instead.
    const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    // 3. Save Metadata to DynamoDB
    const dbParams = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: {
        id: { S: posterId },
        createdAt: { S: timestamp },
        imageUrl: { S: imageUrl },
        theme: { S: theme || "Unknown" },
        memoryOriginal: { S: memory || "" },
        memoryCaption: { S: compressedText || "" },
        promptUsed: { S: prompt || "" },
        // Add user ID here if you have authentication, e.g., userId: { S: user.id }
      },
    };

    await dynamoClient.send(new PutItemCommand(dbParams));

    return NextResponse.json({
      success: true,
      posterId,
      imageUrl,
      message: "Poster saved successfully",
    });

  } catch (error) {
    console.error("Save poster error:", error);
    return NextResponse.json(
      { error: "Failed to save poster" },
      { status: 500 }
    );
  }
}