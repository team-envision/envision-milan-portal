import { NextResponse } from "next/server";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const dynamoClient = new DynamoDBClient({
  region: process.env.REGION || "ap-south-1",
  credentials:
    process.env.ACCESS_KEY_ID && process.env.SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.ACCESS_KEY_ID,
          secretAccessKey: process.env.SECRET_ACCESS_KEY,
        }
      : undefined,
});

export async function GET() {
  console.log("--> API Route Started: GET /api/posters");

  if (process.env.ACCESS_KEY_ID) {
    console.log("--> Auth Method: Using Env Var Credentials");
  } else {
    console.log("--> Auth Method: Using IAM Role (Default)");
  }

  try {
    const tableName = process.env.DYNAMODB_TABLE_NAME || process.env.TABLE_NAME;

    if (!tableName) {
      console.error(
        "--> ERROR: Table Name is missing. Check 'DYNAMODB_TABLE_NAME' in next.config.js",
      );
      return NextResponse.json(
        { error: "Server Configuration Error: Missing Table Name" },
        { status: 500 },
      );
    }

    console.log(`--> Scanning Table: ${tableName}`);

    const command = new ScanCommand({ TableName: tableName, Limit: 200 });
    const res = await dynamoClient.send(command);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = (res.Items || []).map((it) => unmarshall(it as any));

    console.log(`--> Success: Found ${items.length} items`);

    return NextResponse.json({ success: true, items });
  } catch (err) {
    console.error("--> CRITICAL API ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch posters" },
      { status: 500 },
    );
  }
}
