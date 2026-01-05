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
  const itemsPerPage = 4;
  const pages = [];
  
  for (let i = 0; i < items.length; i += itemsPerPage) {
    pages.push(items.slice(i, i + itemsPerPage));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-0">
      <div className="md:hidden">
        {pages.map((pageItems, pageIndex) => (
          <div 
            key={`page-mobile-${pageIndex}`}
            className="bg-white shadow-lg mb-3 mx-2 rounded-lg"
            style={{
              minHeight: 'calc(75vh - 1rem)',
              maxHeight: 'calc(75vh - 1rem)',
              overflow: 'hidden'
            }}
          >
            <div className="text-center py-3 px-4 border-b border-[#c7a332] bg-[#c7a332]">
              <h1 className="text-base font-bold text-black">
                BLOUDAN JEWELLERY
              </h1>
              <h2 className="text-sm text-black font-medium">
                BANGLES CATALOGUE
              </h2>
            </div>

            <div className="p-2">
              <div className="grid grid-cols-2 grid-rows-2 gap-2 h-[calc(75vh-140px)]">
                {pageItems.map((item) => (
                  <div 
                    key={item._id}
                    className="relative border-2 border-[#c7a332] rounded-xl shadow-sm bg-white"
                  >
                    <div className="relative w-full h-40 flex items-center justify-center pt-1">
                      {item.image ? (
                        <div className="relative w-36 h-36">
                          <Image
                            src={urlFor(item.image).width(500).url()}
                            alt={`B${item.modelNumber}`}
                            fill
                            className="object-contain rounded-lg"
                            unoptimized
                            sizes="45vw"
                          />
                        </div>
                      ) : (
                        <div className="w-36 h-36 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No Image</span>
                        </div>
                      )}
                    </div>

                    <div className="w-full text-center px-2 pb-2">
                      <p className="text-3xl font-bold text-[#0b1a3d] mt-0.5">
                        B{item.modelNumber}
                      </p>
                      <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
                        {item.sizes?.includes("Adult") && item.weightAdult && (
                          <p className="text-xs font-medium text-gray-800 bg-gray-100 rounded-full px-2 py-0.5 inline-block">
                            {item.weightAdult}g
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && item.weightKids && (
                          <p className="text-xs font-medium text-gray-800 bg-gray-100 rounded-full px-2 py-0.5 inline-block">
                            K-{item.weightKids}g
                          </p>
                        )}
                        {item.sizes?.includes("Adult") && !item.weightAdult && (
                          <p className="text-xs font-medium text-gray-800 bg-gray-100 rounded-full px-2 py-0.5 inline-block">
                            
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && !item.weightKids && (
                          <p className="text-xs font-medium text-gray-800 bg-gray-100 rounded-full px-2 py-0.5 inline-block">
                            
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {pageItems.length < 4 && 
                  Array.from({ length: 4 - pageItems.length }).map((_, index) => (
                    <div 
                      key={`empty-mobile-${pageIndex}-${index}`} 
                      className="border-2 border-dashed border-[#c7a332] rounded-xl bg-gray-50 flex items-center justify-center"
                    >
                      <span className="text-gray-300 text-lg">—</span>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="text-center py-2 border-t border-[#c7a332] bg-[#c7a332]">
              <p className="text-sm font-medium text-black">
                Page {pageIndex + 1}
              </p>
            </div>
          </div>
        ))}
      </div>

<div className="hidden md:block max-w-[210mm] mx-auto">
  {pages.map((pageItems, pageIndex) => (
    <div
      key={`page-desktop-${pageIndex}`}
      className="bg-white shadow-lg border border-gray-300 rounded-lg mb-4 p-2"
    >
      <div className="text-center py-1 px-4 border-b border-[#c7a332] bg-[#c7a332]">
        <h1 className="text-lg font-bold text-black tracking-tight">
          BLOUDAN JEWELLERY
        </h1>
        <h2 className="text-sm text-black font-medium -mt-0.5">
          BANGLES CATALOGUE
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-2">
        {pageItems.map((item) => (
          <div
            key={item._id}
            className="border-2 border-[#c7a332] rounded-xl bg-white flex flex-col items-center p-2"
          >
            <div className="relative w-40 h-40 flex items-center justify-center">
              {item.image ? (
                <Image
                  src={urlFor(item.image).width(800).url()}
                  alt={`B${item.modelNumber}`}
                  fill
                  className="object-contain rounded-lg"
                  unoptimized
                  sizes="25vw"
                />
              ) : (
                <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>

            <p className="text-2xl font-bold text-[#0b1a3d] mt-2">
              B{item.modelNumber}
            </p>

            <div className="flex flex-wrap justify-center gap-1 mt-1">
              {item.sizes?.includes("Adult") && item.weightAdult && (
                <p className="text-xs font-medium text-gray-800 bg-gray-100 rounded-full px-1.5 py-0.5">
                  {item.weightAdult}g
                </p>
              )}
              {item.sizes?.includes("Kids") && item.weightKids && (
                <p className="text-xs font-medium text-gray-800 bg-gray-100 rounded-full px-1.5 py-0.5">
                  K-{item.weightKids}g
                </p>
              )}
            </div>
          </div>
        ))}

        {pageItems.length < 4 &&
          Array.from({ length: 4 - pageItems.length }).map((_, index) => (
            <div
              key={`empty-desktop-${pageIndex}-${index}`}
              className="border-2 border-dashed border-[#c7a332] rounded-xl bg-gray-50 flex items-center justify-center h-40"
            >
              <span className="text-gray-300 text-xl">—</span>
            </div>
          ))}
      </div>

      {/* PAGE NUMBER - this must be inside the map where pageIndex exists */}
      <div className="text-center py-1 border-t border-[#c7a332] bg-[#c7a332] mt-2">
        <p className="text-sm font-medium text-black">Page {pageIndex + 1}</p>
      </div>
    </div>
  ))}
</div>

      <div className="text-center py-1 border-t border-[#c7a332] bg-[#c7a332] mt-2">
        <p className="text-sm font-medium text-black">Page {pageIndex + 1}</p>
      </div>
    </div>
  ))}
</div>

      <div className="text-center py-2 border-t border-[#c7a332] bg-[#c7a332]">
        <p className="text-sm font-medium text-black">Page {pageIndex + 1}</p>
      </div>
    </div>
  ))}
      </div>
    </div>
  );
}
