import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";

export default function CatalogueGrid({ items }) {
  return (
    <div className="min-h-screen bg-[#fdf8f3] p-6">
      <h1 className="text-3xl font-bold text-center text-[#0b1a3d] mb-8">
        Bloudan Bangles Catalogue
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(item => (
          <div key={item._id} className="bg-white rounded-xl shadow">
            <div className="relative aspect-square">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}