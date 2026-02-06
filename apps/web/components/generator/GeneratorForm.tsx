"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
    <div className="bg-black p-8 rounded-xl shadow-sm border">
      <h2 className="text-2xl font-semibold mb-6">Generate Your Poster</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="theme"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="University Event – Aaruush '25"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="imageStyle"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Output Style</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Photorealistic, vibrant night event"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="backgroundColor"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Color</FormLabel>
                <FormControl>
                  <Input placeholder="Dark shades, warm tones" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="backgroundTexture"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Texture</FormLabel>
                  <FormControl>
                    <Input placeholder="Shiny, aesthetic texture" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="backgroundDecorations"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Decorations</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Faded academic watermark patterns"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="frameColor"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frame Color</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Metallic silver / matte black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="memory"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Memory</FormLabel>
                <FormControl>
                  <Textarea rows={4} className="resize-none" {...field} />
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
                <FormLabel>Upload 3 Photos</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    onChange={(e) => onChange(Array.from(e.target.files || []))}
                  />
                </FormControl>
                <FormDescription>
                  Exactly 3 images. Max 20MB each.
                </FormDescription>

                {uploadedImages?.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {uploadedImages.map((file, i) => (
                      <img
                        key={i}
                        src={URL.createObjectURL(file)}
                        className="h-24 w-full object-cover rounded-md border"
                        alt={`preview-${i}`}
                      />
                    ))}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={state.isLoading}
            className="w-full h-12 text-lg"
          >
            {state.isLoading ? "Generating..." : "Generate Poster"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
