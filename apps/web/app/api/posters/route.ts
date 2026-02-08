import { NextResponse } from "next/server";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

// Initialize DynamoDB client (server-side)
const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  try {
    const table = process.env.DYNAMODB_TABLE_NAME;
    if (!table) {
      return NextResponse.json({ error: "DynamoDB table not configured" }, { status: 500 });
    }

    // Simple scan to return all items (consider pagination for production)
    const command = new ScanCommand({ TableName: table, Limit: 200 });
    const res = await dynamoClient.send(command);

    const items = (res.Items || []).map((it) => unmarshall(it as any));

    return NextResponse.json({ success: true, items });
  } catch (err) {
    console.error("GET /api/posters error", err);
    return NextResponse.json({ error: "Failed to fetch posters" }, { status: 500 });
  }
}
