"use client";

import { useState } from "react";
import { Download, Linkedin, Twitter, Instagram } from "lucide-react";
import { useGenerator } from "@/context/GeneratorContext";
import { Button } from "@/components/ui/button";

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

  const saveAndGetPublicUrl = async (): Promise<string | null> => {
    if (!state.generatedImage) return null;

    try {
      const res = await fetch("/api/save-poster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: state.generatedImage,
          theme: state.theme,
          memory: state.memory,
          compressedText: state.compressedText,
        }),
      });

      if (!res.ok) return null;

      const data = await res.json();
      // Expecting backend to return { url: string }
      return data?.url ?? null;
    } catch (err) {
      console.error("Failed to save poster for sharing", err);
      return null;
    }
  };

  const dataUrlToFile = async (dataUrl: string, fileName = "poster.png") => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  const handleShare = async (platform: "instagram" | "linkedin") => {
    if (!state.generatedImage) return;

    setIsSaving(true);
    try {
      const publicUrl = await saveAndGetPublicUrl();

      if (platform === "linkedin") {
        // LinkedIn shares a URL; use the public URL from backend
        const shareTarget = publicUrl ?? state.generatedImage;
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareTarget,
        )}`;
        window.open(shareUrl, "_blank", "noopener,noreferrer");
        return;
      }

      if (platform === "instagram") {
        // Try Web Share API with files (mobile browsers)
        const canShareFiles = !!navigator.share && (navigator as any).canShare;

        try {
          const file = await dataUrlToFile(state.generatedImage, "milan-poster.png");

          if ((navigator as any).canShare && (navigator as any).canShare({ files: [file] })) {
            await (navigator as any).share({
              files: [file],
              title: state.theme,
              text: state.compressedText,
            });
            return;
          }
        } catch (err) {
          // fallthrough to fallback
        }

        // Fallback: open the image in a new tab so user can manually save/share
        const win = window.open(state.generatedImage, "_blank", "noopener,noreferrer");
        if (!win) {
          // as a final fallback copy the public url to clipboard if available
          if (publicUrl) {
            await navigator.clipboard.writeText(publicUrl);
            alert("Image URL copied to clipboard. Paste it into Instagram.");
          } else {
            alert("Unable to open share window. Please save the image and upload to Instagram.");
          }
        }
      }
    } catch (err) {
      console.error("Share failed", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      <Button
        onClick={handleDownload}
        disabled={isSaving}
        className="h-12 min-w-[200px] px-6 text-lg rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/50 backdrop-blur-sm transition-all flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" />
        {isSaving ? "Saving..." : "Download & Save"}
      </Button>

      <Button
        variant="outline"
        onClick={() => handleShare("instagram")}
        disabled={isSaving}
        className="h-12 min-w-[200px] px-6 text-lg rounded-full flex items-center justify-center gap-2"
        title="Share on Instagram"
      >
        <Instagram className="w-4 h-4" />
        <span className="hidden sm:inline">Instagram</span>
      </Button>

      <Button
        variant="outline"
        onClick={() => handleShare("linkedin")}
        disabled={isSaving}
        className="h-12 min-w-[200px] px-6 text-lg rounded-full flex items-center justify-center gap-2"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
        <span className="hidden sm:inline">LinkedIn</span>
      </Button>

      <Button
        variant="outline"
        title="Share on Twitter"
        className="h-12 min-w-[200px] px-6 text-lg rounded-full flex items-center justify-center gap-2"
      >
        <Twitter className="w-4 h-4" />
        <span className="hidden sm:inline">Twitter</span>
      </Button>
    </div>
  );
}