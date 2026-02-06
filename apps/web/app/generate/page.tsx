import GeneratorForm from "@/components/generator/GeneratorForm";
import GeneratedPreview from "@/components/generator/GeneratedPreview";
import { GeneratorProvider } from "@/context/GeneratorContext";

export default function GeneratePage() {
  return (
    <GeneratorProvider>
      <div className="min-h-screen pt-28 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-center mb-12 text-white/80">
            Generate your Poster
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <GeneratorForm />
            <GeneratedPreview />
          </div>
        </div>
      </div>
    </GeneratorProvider>
  );
}
