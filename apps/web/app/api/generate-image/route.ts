import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt, images } = await req.json();

    if (!prompt || !images || images.length !== 3) {
      return NextResponse.json(
        { error: "Prompt and exactly 3 images are required" },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-image",
    });

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: images[0],
        },
      },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: images[1],
        },
      },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: images[2],
        },
      },
    ]);

    const candidate = result.response.candidates?.[0];
    const imagePart = candidate?.content?.parts?.find(
      (p) => p.inlineData?.data,
    );

    if (!imagePart || !imagePart.inlineData) {
      console.error("Gemini response:", result.response);
      return NextResponse.json(
        { error: "Image generation failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      imageBase64: imagePart.inlineData.data,
      mimeType: imagePart.inlineData.mimeType,
    });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 },
    );
  }
}
