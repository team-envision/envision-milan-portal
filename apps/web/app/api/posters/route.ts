import { NextResponse } from "next/server";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION || process.env.REGION || "ap-south-1",
});

export async function GET() {
  console.log("--> API Route Started: GET /api/posters");

  try {
    const tableName = process.env.DYNAMODB_TABLE_NAME || process.env.TABLE_NAME;

    if (!tableName) {
      console.error("--> ERROR: Table Name is missing from Env Vars");
      return NextResponse.json(
        { error: "Server Configuration Error: Missing Table Name" },
        { status: 500 },
      );
    }

    const command = new ScanCommand({ TableName: tableName, Limit: 200 });
    const res = await dynamoClient.send(command);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = (res.Items || []).map((it) => unmarshall(it as any));

    return NextResponse.json({ success: true, items });
  } catch (err) {
    console.error("--> CRITICAL API ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch posters" },
      { status: 500 },
    );
  }
}
