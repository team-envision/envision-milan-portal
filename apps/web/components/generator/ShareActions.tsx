"use client";

import { useState } from "react";
import { Download, Share2, Linkedin, Twitter, Instagram } from "lucide-react";
import { useGenerator } from "@/context/GeneratorContext";
import { Button } from "@/components/ui/button"; // Assuming you have a UI Button, otherwise standard button works

export default function ShareActions() {
  const { state } = useGenerator();
  const [isSaving, setIsSaving] = useState(false);

  const handleDownload = async () => {
    if (!state.generatedImage) return;

    try {
      setIsSaving(true);

      // --- 1. Local Download (Immediate User Feedback) ---
      const link = document.createElement("a");
      link.href = state.generatedImage;
      link.download = `milan-poster-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // --- 2. Save to AWS (Background Process) ---
      const response = await fetch("/api/save-poster", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageBase64: state.generatedImage,
          theme: state.theme,
          memory: state.memory,
          compressedText: state.compressedText,
          // We don't have the raw prompt here, but the backend handles it being optional
        }),
      });

      if (!response.ok) {
        console.error("Failed to back up poster to cloud");
        // Optional: Add a toast notification here if you have a toast system
      } else {
        console.log("Poster successfully backed up to S3");
      }

    } catch (error) {
      console.error("Download action failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      <Button 
        onClick={handleDownload}
        disabled={isSaving}
        className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"
      >
        <Download className="w-4 h-4" />
        {isSaving ? "Saving..." : "Download & Save"}
      </Button>

      {/* Social Placeholders - Visual only for now */}
      <Button variant="outline" size="icon" title="Share on Instagram">
        <Instagram className="w-4 h-4" />
      </Button>
      <Button variant="outline" size="icon" title="Share on LinkedIn">
        <Linkedin className="w-4 h-4" />
      </Button>
      <Button variant="outline" size="icon" title="Share on Twitter">
        <Twitter className="w-4 h-4" />
      </Button>
    </div>
  );
}