import GeneratorForm from "@/components/generator/GeneratorForm";
import GeneratedPreview from "@/components/generator/GeneratedPreview";
import { GeneratorProvider } from "@/context/GeneratorContext";

export default function GeneratePage() {
  return (
    <GeneratorProvider>
      <div className="min-h-screen pt-28 bg-gray-50">
        <div className="max-w-full flex flex-col md:flex-row justify-center align-middle gap-12">
          <div className="w-full md:w-3xl flex-1">
            <GeneratorForm />
          </div>
          <div className="w-full flex-2">
            <GeneratedPreview />
          </div>
        </div>
      </div>
    </GeneratorProvider>
  );
}
