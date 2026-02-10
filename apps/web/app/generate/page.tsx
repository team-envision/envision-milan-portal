import GeneratorForm from "@/components/generator/GeneratorForm";
import GeneratedPreview from "@/components/generator/GeneratedPreview";
import { GeneratorProvider } from "@/context/GeneratorContext";

export default function GeneratePage() {
  return (
    <GeneratorProvider>
     
      <div className="min-h-screen pt-28 bg-linear-to-br from-[#1B0B05] to-[#2D130A]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <GeneratorForm />
          <GeneratedPreview />
        </div>
      </div>
    </GeneratorProvider>
  );
}