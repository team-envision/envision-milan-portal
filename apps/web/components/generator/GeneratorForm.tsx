"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { useGenerator } from "@/context/GeneratorContext";
import { buildPosterPrompt } from "@/utils/prompts/build";

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
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

/* ---------------- Helpers ---------------- */

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]); // strip data:image/...;base64,
    };
    reader.onerror = reject;
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

  const onSubmit = async (values: FormValues) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      /* ---- 1. Sync Text Fields ---- */
      setState((prev) => ({
        ...prev,
        theme: values.theme,
        backgroundColor: values.backgroundColor,
        memory: values.memory,
        uploadedImages: values.images,
      }));

      /* ---- 2. Memory Compression (TEXT ONLY) ---- */
      let finalText = values.memory;

      if (values.memory.length > 40) {
        const compressRes = await fetch("/api/compress-memory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ memory: values.memory }),
        });

        if (!compressRes.ok) throw new Error("Text compression failed");

        const compressData = await compressRes.json();
        finalText = compressData.compressed;

        setState((prev) => ({ ...prev, compressedText: finalText }));
      }

      /* ---- 3. Build Prompt ---- */
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

      /* ---- 4. Convert Images to Base64 ---- */
      const imagesBase64 = await Promise.all(values.images.map(fileToBase64));

      /* ---- 5. Generate Poster ---- */
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          images: imagesBase64,
        }),
      });

      if (!res.ok) throw new Error("Image generation failed");

      const data = await res.json();
      const imageUrl = `data:${data.mimeType};base64,${data.imageBase64}`;

      setState((prev) => ({
        ...prev,
        generatedImage: imageUrl,
        isLoading: false,
        hasGenerated: true,
      }));

      localStorage.setItem("srm_poster_generated", "true");
    } catch (error) {
      console.error(error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="bg-transparent p-8 rounded-xl border border-white/20">
      <h2 className="text-3xl font-semibold mb-8 text-center text-white">
        Create Your Memory
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Theme */}
          <FormField
            name="theme"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-lg">Theme</FormLabel>
                <FormControl>
                  <Input
                    className="bg-[#1a1a1a] border-white/20 text-white h-12 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-white/30"
                    {...field}
                  />
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
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Background Color and Texture */}
          <FormField
            name="backgroundTexture"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-lg">
                  Background Color and Texture
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-[#1a1a1a] border-white/20 text-white h-12 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-white/30"
                    {...field}
                  />
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
                  <Input
                    className="bg-[#1a1a1a] border-white/20 text-white h-12 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-white/30"
                    {...field}
                  />
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
                  <Input
                    className="bg-[#1a1a1a] border-white/20 text-white h-12 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-white/30"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Output Style */}
          <FormField
            name="imageStyle"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-lg">
                  Image Output Style
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-[#1a1a1a] border-white/20 text-white h-12 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-white/30"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Your Memory */}
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
                    className="resize-none bg-[#1a1a1a] border-white/20 text-white focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-white/30"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <FormField
            control={form.control}
            name="images"
            render={({ field: { onChange, value, ...fieldProps } }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-lg">
                  Upload 3 Photos
                </FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    className="bg-[#1a1a1a] border-white/20 text-white pt-2 h-14 cursor-pointer file:text-white file:mr-4 file:bg-white/10 file:px-4 file:rounded-full file:border-0 hover:file:bg-white/20 transition-all"
                    onChange={(e) => onChange(Array.from(e.target.files || []))}
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
                        className="h-24 w-full object-cover rounded-md border border-white/20"
                        alt={`preview-${i}`}
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
              disabled={state.isLoading}
              className="px-8 h-12 text-lg rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm transition-all flex items-center gap-2"
            >
              <Image 
                src="/images/star.png" 
                alt="Star" 
                width={30} 
                height={30} 
                className="w-8 h-8"
              />
              {state.isLoading ? "Generating..." : "Generate Poster"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
