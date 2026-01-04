import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";

interface CatalogueItem {
  _id: string;
  modelNumber: number;
  image?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  sizes?: ("Adult" | "Kids")[];
  weightAdult?: number;
  weightKids?: number;
}

interface CatalogueGridProps {
  items: CatalogueItem[];
}

export default function CatalogueGrid({ items }: CatalogueGridProps) {
  return (
    <div className="min-h-screen bg-[#fdf8f3] p-6">
      <h1 className="text-3xl font-bold text-center text-[#0b1a3d] mb-8">
        Bloudan Bangles Catalogue
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow">
            <div className="relative aspect-square bg-[#0b1a3d]">
              {item.image && (
                <Image
                  src={urlFor(item.image).width(600).url()}
                  alt={`B${item.modelNumber}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
            </div>

            <div className="p-4 text-center">
              <p className="text-xl font-bold text-[#0b1a3d]">
                B{item.modelNumber}
              </p>

              <div className="flex justify-center gap-2 mt-2">
                {item.sizes?.includes("Adult") && (
                  <span className="bg-[#c7a332] text-[#0b1a3d] px-2 py-1 rounded text-xs font-semibold">
                    Adult {item.weightAdult ? `- ${item.weightAdult}g` : ""}
                  </span>
                )}
                {item.sizes?.includes("Kids") && (
                  <span className="bg-[#c7a332] text-[#0b1a3d] px-2 py-1 rounded text-xs font-semibold">
                    Kids {item.weightKids ? `- ${item.weightKids}g` : ""}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
