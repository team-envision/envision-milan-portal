"use client";

import { useGenerator } from "@/context/GeneratorContext";
import { buildPosterPrompt } from "@/utils/prompts/build";

export default function GeneratorForm() {
  const { state, setState } = useGenerator();
  const handleGenerate = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));

    let finalText = state.memory;

    // STEP 1: Compress memory if long
    if (state.memory.length > 40) {
      const compressRes = await fetch("/api/compress-memory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memory: state.memory }),
      });

      const compressData = await compressRes.json();
      finalText = compressData.compressed;

      setState((prev) => ({
        ...prev,
        compressedText: finalText,
      }));
    }

    // STEP 2: Build poster prompt
    const prompt =
      buildPosterPrompt({
        theme: state.theme,
        style: "Photorealistic, vintage scrapbook aesthetic",
        quality: "High resolution, cinematic lighting, 8k",
        backgroundColor: state.backgroundColor,
        backgroundTexture: "Vintage parchment paper",
        frameColor: "Dark wood",
      }) + `\nText to include on poster:\n${finalText}`;

    // STEP 3: Call image generation
    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    const imageUrl = `data:${data.mimeType};base64,${data.imageBase64}`;

    setState((prev) => ({
      ...prev,
      generatedImage: imageUrl,
      isLoading: false,
    }));
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold">Generate Your Poster</h2>

      <div className="mt-6">
        <label className="text-sm font-medium">Theme</label>
        <input
          className="w-full mt-2 border rounded-md p-2"
          value={state.theme}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              theme: e.target.value,
            }))
          }
        />
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium">Background Color</label>
        <input
          className="w-full mt-2 border rounded-md p-2"
          value={state.backgroundColor}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              backgroundColor: e.target.value,
            }))
          }
        />
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium">Your Memory / Text</label>
        <textarea
          rows={5}
          className="w-full mt-2 border rounded-md p-2"
          value={state.memory}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              memory: e.target.value,
            }))
          }
        />
      </div>

      <button
        disabled={state.isLoading}
        onClick={handleGenerate}
        className={`mt-6 w-full py-3 rounded-lg text-white ${
          state.isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {state.isLoading ? "Generating..." : "Generate Poster"}
      </button>
    </div>
  );
}
