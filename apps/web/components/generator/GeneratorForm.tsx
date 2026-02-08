"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { useGenerator } from "@/context/GeneratorContext";
import { buildPosterPrompt } from "@/utils/prompts/build";

/* ---------------- Cookie Utilities ---------------- */

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

const setCookie = (name: string, value: string, days: number = 365): void => {
  if (typeof document === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

const POSTER_COUNT_COOKIE = "poster_generation_count";
const MAX_POSTER_LIMIT = 2;

const incrementPosterCount = (): void => {
  const currentCount = parseInt(getCookie(POSTER_COUNT_COOKIE) || "0", 10);
  setCookie(POSTER_COUNT_COOKIE, String(currentCount + 1));
};

const canGeneratePoster = (): boolean => {
  const currentCount = parseInt(getCookie(POSTER_COUNT_COOKIE) || "0", 10);
  return currentCount < MAX_POSTER_LIMIT;
};

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

/* ---------------- Constants ---------------- */

const MAX_UPLOAD_SIZE = 20 * 1024 * 1024; // 20MB
const MAX_DIMENSION = 2048;
const JPEG_QUALITY = 0.85;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

/* ---------------- Image Compression Helper ---------------- */

const compressImageToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    const img = new window.Image();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    img.onload = () => {
      let { width, height } = img;

      if (width > height && width > MAX_DIMENSION) {
        height = Math.round((height * MAX_DIMENSION) / width);
        width = MAX_DIMENSION;
      } else if (height > MAX_DIMENSION) {
        width = Math.round((width * MAX_DIMENSION) / height);
        height = MAX_DIMENSION;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas error"));

      ctx.drawImage(img, 0, 0, width, height);

      const base64 = canvas.toDataURL("image/jpeg", JPEG_QUALITY).split(",")[1];

      resolve(base64);
    };

    reader.onerror = () => reject(new Error("File read failed"));
    reader.readAsDataURL(file);
  });

/* ---------------- Schema ---------------- */

const formSchema = z.object({
  theme: z.string().min(3, "Theme is required"),
  imageStyle: z.string().min(3, "Image style is required"),
  backgroundColor: z.string().min(3, "Background color is required"),
  backgroundTexture: z.string().min(3, "Background texture is required"),
  backgroundDecorations: z
    .string()
    .min(3, "Background decorations are required"),
  frameColor: z.string().min(3, "Frame color is required"),
  memory: z.string().min(5, "Memory is required"),

  images: z
    .custom<File[]>()
    .refine((files) => files?.length === 3, "You must upload exactly 3 images.")
    .refine(
      (files) => files?.every((file) => file.size <= MAX_UPLOAD_SIZE),
      "Max file size is 20MB per image.",
    )
    .refine(
      (files) =>
        files?.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only JPG, PNG, or WEBP images are allowed.",
    ),
});

type FormValues = z.infer<typeof formSchema>;

/* ---------------- Component ---------------- */

export default function GeneratorForm() {
  const { state, setState } = useGenerator();
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [limitError, setLimitError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: state.theme,
      imageStyle: "",
      backgroundColor: state.backgroundColor,
      backgroundTexture: "",
      backgroundDecorations: "",
      frameColor: "",
      memory: state.memory,
      images: [],
    },
  });

  const uploadedImages = form.watch("images");

  const onSubmit = async (values: FormValues): Promise<void> => {
    /* ---- Check Cookie Limit ---- */
    if (!canGeneratePoster()) {
      setLimitError("Only two poster generations allowed.");
      return;
    }

    setLimitError(null);
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      /* ---- Sync to Context ---- */
      setState((prev) => ({
        ...prev,
        theme: values.theme,
        backgroundColor: values.backgroundColor,
        memory: values.memory,
        uploadedImages: values.images,
      }));

      /* ---- Memory Compression ---- */
      let finalText = values.memory;

      if (values.memory.length > 20) {
        const compressRes = await fetch("/api/compress-memory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ memory: values.memory }),
        });

        if (!compressRes.ok) throw new Error("Compression failed");

        const compressData: { compressed: string } = await compressRes.json();

        finalText = compressData.compressed;

        setState((prev) => ({ ...prev, compressedText: finalText }));
      }

      /* ---- Build Prompt ---- */
      const prompt = buildPosterPrompt({
        theme: values.theme,
        imageStyle: values.imageStyle,
        quality: "8k resolution, cinematic lighting, high texture fidelity",
        backgroundColor: values.backgroundColor,
        backgroundTexture: values.backgroundTexture,
        backgroundDecorations: values.backgroundDecorations,
        frameColor: values.frameColor,
        quoteText: finalText,
      });

      /* ---- Compress Images ---- */
      setIsCompressing(true);

      const imagesBase64: string[] = await Promise.all(
        values.images.map(compressImageToBase64),
      );

      setIsCompressing(false);

      /* ---- Generate Poster ---- */
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, images: imagesBase64 }),
      });

      if (!res.ok) throw new Error("Image generation failed");

      const data: { imageBase64: string; mimeType: string } = await res.json();

      const imageUrl = `data:${data.mimeType};base64,${data.imageBase64}`;

      /* ---- Increment Cookie Count ---- */
      incrementPosterCount();

      setState((prev) => ({
        ...prev,
        generatedImage: imageUrl,
        isLoading: false,
      }));
    } catch (error) {
      console.error(error);
      setIsCompressing(false);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="bg-transparent p-8 rounded-xl border border-white/20">
      <h2 className="text-3xl font-semibold mb-8 text-center text-white">
        Create Your Memory
      </h2>

      {limitError && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-center">
          <p className="text-red-400 font-semibold">{limitError}</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* 🔹 ALL INPUT FIELDS UNCHANGED (as requested) */}

          {/* Theme */}
          <FormField
            name="theme"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-lg">Theme</FormLabel>
                <FormControl>
                  <Input className="bg-[#1a1a1a] text-white h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Background Color (Hidden) */}
          <FormField
            name="backgroundColor"
            control={form.control}
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Background Texture */}
          <FormField
            name="backgroundTexture"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-lg">
                  Background Color and Texture
                </FormLabel>
                <FormControl>
                  <Input className="bg-[#1a1a1a] text-white h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Background Decorations */}
          <FormField
            name="backgroundDecorations"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-lg">
                  Background Decorations
                </FormLabel>
                <FormControl>
                  <Input className="bg-[#1a1a1a] text-white h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Frame Color */}
          <FormField
            name="frameColor"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-lg">
                  Frame Color
                </FormLabel>
                <FormControl>
                  <Input className="bg-[#1a1a1a] text-white h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Style */}
          <FormField
            name="imageStyle"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-lg">
                  Image Output Style
                </FormLabel>
                <FormControl>
                  <Input className="bg-[#1a1a1a] text-white h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Memory */}
          <FormField
            name="memory"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-lg">
                  Your Memory
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    className="bg-[#1a1a1a] text-white resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Images */}
          <FormField
            name="images"
            control={form.control}
            render={({ field: { onChange } }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-lg">
                  Upload 3 Photos
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    onChange={(e) => onChange(Array.from(e.target.files ?? []))}
                    className="bg-[#1a1a1a] text-white h-14"
                  />
                </FormControl>
                <FormDescription className="text-white/50">
                  Exactly 3 images. Max 20MB each.
                </FormDescription>

                {uploadedImages?.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {uploadedImages.map((file, i) => (
                      <img
                        key={i}
                        src={URL.createObjectURL(file)}
                        alt={`preview-${i}`}
                        className="h-24 w-full object-cover rounded-md border border-white/20"
                      />
                    ))}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              disabled={state.isLoading || isCompressing}
              className="px-8 h-12 text-lg rounded-full bg-white/10 text-white flex items-center gap-2"
            >
              <Image src="/images/star.png" alt="Star" width={30} height={30} />
              {isCompressing
                ? "Compressing images..."
                : state.isLoading
                  ? "Generating..."
                  : "Generate Poster"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
