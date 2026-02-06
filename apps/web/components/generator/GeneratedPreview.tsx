"use client";

import { useGenerator } from "@/context/GeneratorContext";
import ShareActions from "./ShareActions";

export default function GeneratedPreview() {
  const { state } = useGenerator();

  return (
    <div className="bg-transparent p-8 rounded-xl border border-white/20 flex flex-col items-center h-full">
      <h2 className="text-3xl font-semibold mb-8 text-center text-white">Generated Poster</h2>

      <div className="relative w-full h-full min-h-[600px] border border-white/20 rounded-xl overflow-hidden bg-[#1a1a1a]/50 flex items-center justify-center">
        {state.isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-white/50 animate-pulse">
            Generating...
          </div>
        )}

        {state.generatedImage && !state.isLoading && (
          <img
            src={state.generatedImage}
            className="w-full h-full object-contain"
            alt="Generated Poster"
          />
        )}
        
        {!state.generatedImage && !state.isLoading && (
             <div className="text-white/20">Preview will appear here</div>
        )}

      </div>
      {state.compressedText && (
        <p className="mt-4 text-sm text-gray-400 italic text-center max-w-md">
          Caption: {state.compressedText}
        </p>
      )}

      <div className="mt-6 w-full flex justify-center"> 
        {state.generatedImage && <ShareActions />}
      </div>
    </div>
  );
}
