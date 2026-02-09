"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { useGenerator } from "@/context/GeneratorContext";
import { buildPosterPrompt } from "@/utils/prompts/build";
import formOptions from "@/data/formOptions.json";
import { CAMPUS_BUILDINGS } from "@/data/buildings";

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const MAX_UPLOAD_SIZE = 20 * 1024 * 1024;
const MAX_DIMENSION = 1280;
const JPEG_QUALITY = 0.8;

const calculateVerticalCrop = (
  srcWidth: number,
  srcHeight: number,
  maxDimension: number,
) => {
  let sx = 0,
    // eslint-disable-next-line prefer-const
    sy = 0,
    sWidth = srcWidth,
    sHeight = srcHeight;

  if (srcWidth >= srcHeight) {
    const targetAspect = 3 / 4;
    sWidth = srcHeight * targetAspect;
    sHeight = srcHeight;
    sx = (srcWidth - sWidth) / 2;
  }

  let dWidth = sWidth;
  let dHeight = sHeight;

  if (dWidth > maxDimension || dHeight > maxDimension) {
    const scale = maxDimension / Math.max(dWidth, dHeight);
    dWidth = Math.round(dWidth * scale);
    dHeight = Math.round(dHeight * scale);
  }

  return { sx, sy, sWidth, sHeight, dWidth, dHeight };
};

const compressImageToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    const img = new window.Image();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    img.onload = () => {
      const { sx, sy, sWidth, sHeight, dWidth, dHeight } =
        calculateVerticalCrop(img.width, img.height, MAX_DIMENSION);

      const canvas = document.createElement("canvas");
      canvas.width = dWidth;
      canvas.height = dHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas error"));

      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);

      const base64 = canvas.toDataURL("image/jpeg", JPEG_QUALITY).split(",")[1];
      resolve(base64);
    };

    reader.onerror = () => reject(new Error("File read failed"));
    reader.readAsDataURL(file);
  });

const convertUrlToBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    const blob = await response.blob();

    const img = await createImageBitmap(blob);

    const { sx, sy, sWidth, sHeight, dWidth, dHeight } = calculateVerticalCrop(
      img.width,
      img.height,
      MAX_DIMENSION,
    );

    const canvas = document.createElement("canvas");
    canvas.width = dWidth;
    canvas.height = dHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context failed");

    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);

    const base64 = canvas.toDataURL("image/jpeg", JPEG_QUALITY).split(",")[1];
    return base64;
  } catch (error) {
    console.error("S3 Processing Error:", error);
    throw error;
  }
};

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
});

type FormValues = z.infer<typeof formSchema>;

type FrameState = {
  id: number;
  label: string;
  buildingId: string;
  userImage: File | null;
};

export default function GeneratorForm() {
  const { state, setState } = useGenerator();
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [limitError, setLimitError] = useState<string | null>(null);

  const [frames, setFrames] = useState<[FrameState, FrameState, FrameState]>([
    { id: 0, label: "Center Frame (Main)", buildingId: "", userImage: null },
    { id: 1, label: "Top Right Frame", buildingId: "", userImage: null },
    { id: 2, label: "Bottom Right Frame", buildingId: "", userImage: null },
  ]);

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
    },
  });

  const updateFrame = (
    index: 0 | 1 | 2,
    field: keyof FrameState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
  ) => {
    setFrames((prev) => {
      const newFrames = [...prev] as [FrameState, FrameState, FrameState];
      newFrames[index] = { ...newFrames[index], [field]: value };
      return newFrames;
    });
  };

  const onSubmit = async (values: FormValues): Promise<void> => {
    if (!canGeneratePoster()) {
      setLimitError("Only two poster generations allowed.");
      return;
    }

    const isIncomplete = frames.some((f) => !f.buildingId || !f.userImage);
    if (isIncomplete) {
      setLimitError(
        "Please select a building and upload a photo for ALL 3 frames.",
      );
      return;
    }

    const selectedBuildings = frames.map((f) => f.buildingId);
    const uniqueBuildings = new Set(selectedBuildings);
    if (uniqueBuildings.size !== selectedBuildings.length) {
      setLimitError(
        "You cannot select the same building twice. Please choose 3 different buildings.",
      );
      return;
    }

    setLimitError(null);
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      setState((prev) => ({
        ...prev,
        theme: values.theme,
        backgroundColor: values.backgroundColor,
        memory: values.memory,
      }));

      let finalText = values.memory;
      if (values.memory.length > 20) {
        const compressRes = await fetch("/api/compress-memory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ memory: values.memory }),
        });
        if (!compressRes.ok) throw new Error("Compression failed");
        const compressData = await compressRes.json();
        finalText = compressData.compressed;
        setState((prev) => ({ ...prev, compressedText: finalText }));
      }

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

      setIsCompressing(true);

      const processingPromises = frames.map(async (frame) => {
        const userBase64 = await compressImageToBase64(frame.userImage!);

        const building = CAMPUS_BUILDINGS.find(
          (b) => b.id === frame.buildingId,
        );
        if (!building)
          throw new Error(`Building not found for frame ${frame.id}`);

        const buildingBase64 = await convertUrlToBase64(building.url);

        return [userBase64, buildingBase64];
      });

      const pairs = await Promise.all(processingPromises);

      const flatImages = pairs.flat();

      setIsCompressing(false);

      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, images: flatImages }),
      });

      if (!res.ok) throw new Error("Image generation failed");

      const data: { imageBase64: string; mimeType: string } = await res.json();
      const imageUrl = `data:${data.mimeType};base64,${data.imageBase64}`;

      incrementPosterCount();

      setState((prev) => ({
        ...prev,
        generatedImage: imageUrl,
        isLoading: false,
      }));
    } catch (error) {
      console.error(error);
      setIsCompressing(false);
      setLimitError("An error occurred while generating. Please try again.");
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
          <FormField
            name="theme"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-lg">Theme</FormLabel>
                <FormControl>
                  <>
                    <Input
                      {...field}
                      list="theme-options"
                      placeholder="Choose a theme or type your own"
                      className="bg-[#1a1a1a] text-white h-12"
                    />
                    <datalist id="theme-options">
                      {formOptions.themes.map((t) => (
                        <option key={t} value={t} />
                      ))}
                    </datalist>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="backgroundColor"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-lg">
                  Background Color
                </FormLabel>
                <FormControl>
                  <>
                    <Input
                      {...field}
                      list="background-color-options"
                      placeholder="Choose a color or type your own"
                      className="bg-[#1a1a1a] text-white h-12"
                    />
                    <datalist id="background-color-options">
                      {formOptions.backgroundColors.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="backgroundTexture"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-lg">
                  Background Texture
                </FormLabel>
                <FormControl>
                  <>
                    <Input
                      {...field}
                      list="background-texture-options"
                      placeholder="Choose a texture or type your own"
                      className="bg-[#1a1a1a] text-white h-12"
                    />
                    <datalist id="background-texture-options">
                      {formOptions.textures.map((t) => (
                        <option key={t} value={t} />
                      ))}
                    </datalist>
                  </>
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
                <FormLabel className="text-white/90 text-lg">
                  Background Decorations
                </FormLabel>
                <FormControl>
                  <>
                    <Input
                      {...field}
                      list="background-decorations-options"
                      placeholder="Choose decorations or type your own"
                      className="bg-[#1a1a1a] text-white h-12"
                    />
                    <datalist id="background-decorations-options">
                      {formOptions.decorations.map((d) => (
                        <option key={d} value={d} />
                      ))}
                    </datalist>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="frameColor"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 text-lg">
                  Frame Color
                </FormLabel>
                <FormControl>
                  <>
                    <Input
                      {...field}
                      list="frame-color-options"
                      placeholder="Choose a frame color or type your own"
                      className="bg-[#1a1a1a] text-white h-12"
                    />
                    <datalist id="frame-color-options">
                      {formOptions.frameColors.map((f) => (
                        <option key={f} value={f} />
                      ))}
                    </datalist>
                  </>
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
                <FormLabel className="text-white/90 text-lg">
                  Image Output Style
                </FormLabel>
                <FormControl>
                  <>
                    <Input
                      {...field}
                      list="image-style-options"
                      placeholder="Choose a style or type your own"
                      className="bg-[#1a1a1a] text-white h-12"
                    />
                    <datalist id="image-style-options">
                      {formOptions.styles.map((s) => (
                        <option key={s} value={s} />
                      ))}
                    </datalist>
                  </>
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

          <div className="space-y-6 pt-4 border-t border-white/20">
            <h3 className="text-xl text-white font-medium">
              Customize Your Frames
            </h3>

            {frames.map((frame, index) => (
              <div
                key={frame.id}
                className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-yellow-400">
                    {frame.label}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">
                      Select Location
                    </label>
                    <select
                      value={frame.buildingId}
                      onChange={(e) =>
                        updateFrame(
                          index as 0 | 1 | 2,
                          "buildingId",
                          e.target.value,
                        )
                      }
                      className="w-full h-12 bg-[#1a1a1a] text-white rounded-md px-3 border border-white/20"
                    >
                      <option value="">-- Choose Building --</option>
                      {CAMPUS_BUILDINGS.map((b) => (
                        <option
                          key={b.id}
                          value={b.id}
                          disabled={frames.some(
                            (f) => f.id !== frame.id && f.buildingId === b.id,
                          )}
                        >
                          {b.name}{" "}
                          {frames.some(
                            (f) => f.id !== frame.id && f.buildingId === b.id,
                          )
                            ? "(Taken)"
                            : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-white/70">
                      Upload Photo
                    </label>
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="bg-[#1a1a1a] text-white h-12 cursor-pointer"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          if (file && file.size > MAX_UPLOAD_SIZE) {
                            alert("File is too large (Max 20MB)");
                            e.target.value = "";
                            return;
                          }
                          updateFrame(index as 0 | 1 | 2, "userImage", file);
                        }}
                      />
                      {frame.userImage && (
                        <div className="absolute right-2 top-1.5 w-9 h-9 rounded overflow-hidden border border-white/50">
                          <img
                            src={URL.createObjectURL(frame.userImage)}
                            className="w-full h-full object-cover"
                            alt="preview"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button
              type="submit"
              disabled={state.isLoading || isCompressing}
              className="px-8 h-12 text-lg rounded-full bg-white/10 text-white flex items-center gap-2 hover:bg-white/20 transition-all"
            >
              <Image src="/images/star.png" alt="Star" width={30} height={30} />
              {isCompressing
                ? "Preparing images..."
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
