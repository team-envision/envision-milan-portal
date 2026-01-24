"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

type GeneratorState = {
  theme: string;
  backgroundColor: string;
  memory: string;
  isLoading: boolean;
  generatedImage: string | null;
  compressedText?: string | null;
  uploadedImages: File[];
};

interface GeneratorContextType {
  state: GeneratorState;
  setState: Dispatch<SetStateAction<GeneratorState>>;
}

const GeneratorContext = createContext<GeneratorContextType | null>(null);

export function GeneratorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GeneratorState>({
    theme: "University Convocation",
    backgroundColor: "Warm cream",
    memory: "",
    isLoading: false,
    generatedImage: null,
    uploadedImages: [],
  });

  return (
    <GeneratorContext.Provider value={{ state, setState }}>
      {children}
    </GeneratorContext.Provider>
  );
}

export function useGenerator() {
  const context = useContext(GeneratorContext);

  if (!context) {
    throw new Error("useGenerator must be used within a GeneratorProvider");
  }

  return context;
}
