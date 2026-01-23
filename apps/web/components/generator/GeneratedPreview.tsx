"use client";

import { useGenerator } from "@/context/GeneratorContext";
import ShareActions from "./ShareActions";

export default function GeneratedPreview() {
  const { state } = useGenerator();

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Generated Poster</h2>

      <div className="relative w-[360px] h-[640px] bg-gray-100 rounded-xl shadow-lg">
        {state.isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            Generating...
          </div>
        )}

        {state.generatedImage && !state.isLoading && (
          <img
            src={state.generatedImage}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Fixed overlay frame */}
        <div className="absolute inset-0 border-[12px] border-[#5a3e2b] pointer-events-none" />
      </div>
      {state.compressedText && (
        <p className="mt-3 text-sm text-gray-600 italic">
          Caption: {state.compressedText}
        </p>
      )}

      {state.generatedImage && <ShareActions />}
    </div>
  );
}
