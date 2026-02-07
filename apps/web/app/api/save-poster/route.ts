import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import sharp from "sharp";

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

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const TARGET_QUALITY = 85; // Initial quality level

/**
 * Compress image to be under 5MB without significant quality loss
 * Uses adaptive quality reduction and format optimization
 */
async function compressImage(buffer: Buffer): Promise<Buffer> {
  let quality = TARGET_QUALITY;
  let compressed = buffer;

  // If image is already under 5MB, return as-is
  if (buffer.length <= MAX_FILE_SIZE) {
    return buffer;
  }

  // Iteratively compress until under 5MB
  while (compressed.length > MAX_FILE_SIZE && quality > 50) {
    try {
      compressed = await sharp(buffer)
        .jpeg({ quality, progressive: true, mozjpeg: true })
        .toBuffer();

      if (compressed.length <= MAX_FILE_SIZE) {
        return compressed;
      }

      // Reduce quality for next iteration
      quality -= 5;
    } catch (error) {
      console.error("Error during compression:", error);
      break;
    }
  }

  // If still too large, resize the image dimensions
  if (compressed.length > MAX_FILE_SIZE) {
    quality = 80;
    try {
      const metadata = await sharp(buffer).metadata();
      const newWidth = Math.floor((metadata.width || 1920) * 0.8);

      while (compressed.length > MAX_FILE_SIZE && quality > 50) {
        compressed = await sharp(buffer)
          .resize(newWidth, undefined, {
            withoutEnlargement: true,
            fit: "inside",
          })
          .jpeg({ quality, progressive: true, mozjpeg: true })
          .toBuffer();

        if (compressed.length <= MAX_FILE_SIZE) {
          return compressed;
        }

        quality -= 5;
      }
    } catch (error) {
      console.error("Error during resize compression:", error);
    }
  }

  return compressed;
}

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
    let buffer = Buffer.from(base64Data, "base64");
    
    // 2. Compress image if needed (silently)
    buffer = await compressImage(buffer);
    
    // Generate unique IDs and S3 key
    const posterId = crypto.randomUUID();
    // Folder in S3 where posters are saved. Configure via env var S3_POSTERS_FOLDER
    const folder = process.env.S3_POSTERS_FOLDER || "posters";
    const fileName = `${folder}/${posterId}.png`;

    // 3. Upload to S3
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

    // 4. Save Metadata to DynamoDB
    const timestamp = new Date().toISOString();
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