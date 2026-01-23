import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { memory } = await req.json();

    if (!memory || memory.length < 40) {
      // If already short, return as-is
      return NextResponse.json({
        compressed: memory,
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const prompt = `
You are compressing a personal university memory into a short poster caption.

Rules:
- Output ONLY the compressed text
- 3 to 8 words maximum
- No emojis
- No hashtags
- No quotes
- Neutral, respectful tone
- Suitable for a university commemorative poster

Memory:
${memory}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text()?.trim() ?? "A Moment to Remember";

    return NextResponse.json({
      compressed: text,
    });
  } catch (error) {
    console.error("Compression error:", error);
    return NextResponse.json(
      { error: "Failed to compress memory" },
      { status: 500 },
    );
  }
}
