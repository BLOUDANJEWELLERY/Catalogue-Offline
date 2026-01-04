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
  // Split items into pages of 4
  const itemsPerPage = 4;
  const pages = [];
  
  for (let i = 0; i < items.length; i += itemsPerPage) {
    pages.push(items.slice(i, i + itemsPerPage));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-0 md:p-2">
      {/* Mobile view - perfectly fits screen */}
      <div className="md:hidden">
        {pages.map((pageItems, pageIndex) => (
          <div 
            key={`page-mobile-${pageIndex}`}
            className="bg-white shadow-lg mb-3 mx-2 rounded-lg"
            style={{
              minHeight: 'calc(100vh - 1rem)',
              maxHeight: 'calc(100vh - 1rem)',
              overflow: 'hidden'
            }}
          >
            {/* Page Header - Golden background, black text */}
            <div className="text-center py-3 px-4 border-b border-[#c7a332] bg-[#c7a332]">
              <h1 className="text-base font-bold text-black">
                BLOUDAN JEWELLERY
              </h1>
              <h2 className="text-sm text-black font-medium">
                BANGLES CATALOGUE
              </h2>
            </div>

            {/* Page Content */}
            <div className="p-2">
              <div className="grid grid-cols-2 grid-rows-2 gap-2 h-[calc(100vh-140px)]">
                {pageItems.map((item) => (
                  <div 
                    key={item._id}
                    className="relative border-2 border-[#c7a332] rounded-xl shadow-sm overflow-hidden flex flex-col items-center justify-center p-1 bg-white"
                  >
                    {/* Image container - bigger */}
                    <div className="relative w-full flex items-center justify-center pt-1">
                      {item.image ? (
                        <div className="relative w-40 h-40">
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
                        <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Model number - larger and blue */}
                    <div className="w-full text-center mt-0.5">
                      <p className="text-2xl font-bold text-[#0b1a3d] mb-0">
                        B{item.modelNumber}
                      </p>
                      <div className="space-y-0">
                        {item.sizes?.includes("Adult") && item.weightAdult && (
                          <p className="text-xs font-medium text-gray-700 bg-gray-100 rounded-full px-2 py-0.5 inline-block">
                            Adult - {item.weightAdult}g
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && item.weightKids && (
                          <p className="text-xs font-medium text-gray-700 bg-gray-100 rounded-full px-2 py-0.5 inline-block">
                            Kids - {item.weightKids}g
                          </p>
                        )}
                        {/* If no weight specified */}
                        {item.sizes?.includes("Adult") && !item.weightAdult && (
                          <p className="text-xs font-medium text-gray-700 bg-gray-100 rounded-full px-2 py-0.5 inline-block">
                            Adult
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && !item.weightKids && (
                          <p className="text-xs font-medium text-gray-700 bg-gray-100 rounded-full px-2 py-0.5 inline-block">
                            Kids
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Fill empty slots */}
                {pageItems.length < 4 && 
                  Array.from({ length: 4 - pageItems.length }).map((_, index) => (
                    <div 
                      key={`empty-mobile-${pageIndex}-${index}`} 
                      className="border-2 border-dashed border-[#c7a332] rounded-xl flex items-center justify-center bg-gray-50"
                    >
                      <span className="text-gray-300 text-lg">—</span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Page Footer - Golden background, black text */}
            <div className="text-center py-2 border-t border-[#c7a332] bg-[#c7a332]">
              <p className="text-sm font-medium text-black">
                Page {pageIndex + 1}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view - A4 PDF style */}
      <div className="hidden md:block max-w-[210mm] mx-auto space-y-6">
        {pages.map((pageItems, pageIndex) => (
          <div 
            key={`page-desktop-${pageIndex}`}
            className="bg-white shadow-lg border border-gray-300 rounded-lg"
            style={{
              width: '210mm',
              minHeight: '297mm',
              aspectRatio: '1 / 1.414',
              margin: '0 auto'
            }}
          >
            {/* Page Header - Desktop with golden background */}
            <div className="text-center py-4 px-6 border-b border-[#c7a332] bg-[#c7a332]">
              <h1 className="text-xl font-bold text-black tracking-wide">
                BLOUDAN JEWELLERY
              </h1>
              <h2 className="text-lg text-black font-medium">
                BANGLES CATALOGUE
              </h2>
            </div>

            {/* Page Content - Desktop */}
            <div className="p-6">
              <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[calc(297mm-140px)]">
                {pageItems.map((item) => (
                  <div 
                    key={item._id}
                    className="relative border-2 border-[#c7a332] rounded-2xl shadow-md overflow-hidden flex flex-col items-center justify-center p-2 bg-white"
                  >
                    {/* Image container - Desktop, bigger */}
                    <div className="relative w-full flex items-center justify-center pt-2">
                      {item.image ? (
                        <div className="relative w-56 h-56">
                          <Image
                            src={urlFor(item.image).width(800).url()}
                            alt={`B${item.modelNumber}`}
                            fill
                            className="object-contain rounded-xl"
                            unoptimized
                            sizes="25vw"
                          />
                        </div>
                      ) : (
                        <div className="w-56 h-56 bg-gray-100 rounded-xl flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Model number and weight - Desktop, larger text */}
                    <div className="w-full text-center mt-1">
                      <p className="text-3xl font-bold text-[#0b1a3d] mb-0.5">
                        B{item.modelNumber}
                      </p>
                      <div className="space-y-1">
                        {item.sizes?.includes("Adult") && item.weightAdult && (
                          <p className="text-sm font-medium text-gray-800 bg-gray-100 rounded-full px-3 py-1 inline-block">
                            Adult - {item.weightAdult}g
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && item.weightKids && (
                          <p className="text-sm font-medium text-gray-800 bg-gray-100 rounded-full px-3 py-1 inline-block">
                            Kids - {item.weightKids}g
                          </p>
                        )}
                        {/* If no weight specified */}
                        {item.sizes?.includes("Adult") && !item.weightAdult && (
                          <p className="text-sm font-medium text-gray-800 bg-gray-100 rounded-full px-3 py-1 inline-block">
                            Adult
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && !item.weightKids && (
                          <p className="text-sm font-medium text-gray-800 bg-gray-100 rounded-full px-3 py-1 inline-block">
                            Kids
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Fill empty slots - Desktop */}
                {pageItems.length < 4 && 
                  Array.from({ length: 4 - pageItems.length }).map((_, index) => (
                    <div 
                      key={`empty-desktop-${pageIndex}-${index}`} 
                      className="border-2 border-dashed border-[#c7a332] rounded-2xl flex items-center justify-center bg-gray-50"
                    >
                      <span className="text-gray-300 text-2xl">—</span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Page Footer - Desktop with golden background */}
            <div className="text-center py-3 border-t border-[#c7a332] bg-[#c7a332]">
              <p className="text-base font-medium text-black">
                Page {pageIndex + 1}
              </p>
            </div>
          </div>
        ))}
        
        {/* Print message */}
        <div className="text-center text-sm text-gray-500 mt-8 mb-4">
          <p>Designed for printing • {pages.length} pages total</p>
        </div>
      </div>
    </div>
  );
}
