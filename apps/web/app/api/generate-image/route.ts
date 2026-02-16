import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt, images } = await req.json();

    if (!prompt || !images || images.length !== 6) {
      return NextResponse.json(
        { error: "Prompt and exactly 6 images (3 pairs) are required" },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3-pro-image-preview",
    });

    const imageParts = images.map((imgData: string) => ({
      inlineData: {
        mimeType: "image/jpeg",
        data: imgData,
      },
    }));

    const result = await model.generateContent([prompt, ...imageParts]);

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
