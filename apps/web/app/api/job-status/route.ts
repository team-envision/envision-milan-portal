import { NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const dynamo = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: process.env.REGION || "ap-south-1" }),
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");

  const result = await dynamo.send(
    new GetCommand({
      TableName: process.env.TABLE_NAME,
      Key: { jobId },
    }),
  );

  if (!result.Item) return NextResponse.json({ status: "not_found" });

  return NextResponse.json({
    status: result.Item.status,
    imageUrl: result.Item.imageUrl,
  });
}
