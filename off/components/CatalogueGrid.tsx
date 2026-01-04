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
            className="bg-white shadow-lg mb-2 mx-2 rounded-lg"
            style={{
              minHeight: 'calc(100vh - 1rem)',
              maxHeight: 'calc(100vh - 1rem)',
              overflow: 'hidden'
            }}
          >
            {/* Page Header - Minimal padding */}
            <div className="text-center py-2 px-4 border-b border-[#c7a332] bg-[#c7a332]">
              <h1 className="text-sm font-bold text-black">
                BLOUDAN JEWELLERY
              </h1>
              <h2 className="text-xs text-black">
                BANGLES CATALOGUE
              </h2>
            </div>

            {/* Page Content - Tight spacing */}
            <div className="p-1">
              <div className="grid grid-cols-2 grid-rows-2 gap-1 h-[calc(100vh-100px)]">
                {pageItems.map((item) => (
                  <div 
                    key={item._id}
                    className="relative border-2 border-[#c7a332] rounded-lg overflow-hidden flex flex-col items-center p-0.5 bg-white"
                  >
                    {/* Image container - fill available space */}
                    <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
                      {item.image ? (
                        <div className="relative w-full h-full max-w-[140px] max-h-[140px]">
                          <Image
                            src={urlFor(item.image).width(500).url()}
                            alt={`B${item.modelNumber}`}
                            fill
                            className="object-contain p-0.5"
                            unoptimized
                            sizes="45vw"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full max-w-[140px] max-h-[140px] bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Model number - directly below image */}
                    <div className="w-full text-center pt-0">
                      <p className="text-xl font-bold text-[#0b1a3d]">
                        B{item.modelNumber}
                      </p>
                      <div>
                        {item.sizes?.includes("Adult") && item.weightAdult && (
                          <p className="text-xs text-gray-700">
                            Adult - {item.weightAdult}g
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && item.weightKids && (
                          <p className="text-xs text-gray-700">
                            Kids - {item.weightKids}g
                          </p>
                        )}
                        {/* If no weight specified */}
                        {item.sizes?.includes("Adult") && !item.weightAdult && (
                          <p className="text-xs text-gray-700">Adult</p>
                        )}
                        {item.sizes?.includes("Kids") && !item.weightKids && (
                          <p className="text-xs text-gray-700">Kids</p>
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
                      className="border-2 border-dashed border-[#c7a332] rounded-lg flex items-center justify-center p-0.5 bg-gray-50"
                    >
                      <span className="text-gray-300">—</span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Page Footer - Minimal padding */}
            <div className="text-center py-1 border-t border-[#c7a332] bg-[#c7a332]">
              <p className="text-xs font-medium text-black">
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
            {/* Page Header - Minimal padding */}
            <div className="text-center py-2 px-6 border-b border-[#c7a332] bg-[#c7a332]">
              <h1 className="text-lg font-bold text-black">
                BLOUDAN JEWELLERY
              </h1>
              <h2 className="text-md text-black">
                BANGLES CATALOGUE
              </h2>
            </div>

            {/* Page Content - Tight spacing */}
            <div className="p-4">
              <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[calc(297mm-100px)]">
                {pageItems.map((item) => (
                  <div 
                    key={item._id}
                    className="relative border-2 border-[#c7a332] rounded-xl overflow-hidden flex flex-col items-center p-1 bg-white"
                  >
                    {/* Image container - fill space */}
                    <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
                      {item.image ? (
                        <div className="relative w-full h-full max-w-[220px] max-h-[220px]">
                          <Image
                            src={urlFor(item.image).width(800).url()}
                            alt={`B${item.modelNumber}`}
                            fill
                            className="object-contain p-1"
                            unoptimized
                            sizes="25vw"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full max-w-[220px] max-h-[220px] bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Model number - directly below image */}
                    <div className="w-full text-center pt-1">
                      <p className="text-2xl font-bold text-[#0b1a3d]">
                        B{item.modelNumber}
                      </p>
                      <div>
                        {item.sizes?.includes("Adult") && item.weightAdult && (
                          <p className="text-sm text-gray-800">
                            Adult - {item.weightAdult}g
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && item.weightKids && (
                          <p className="text-sm text-gray-800">
                            Kids - {item.weightKids}g
                          </p>
                        )}
                        {/* If no weight specified */}
                        {item.sizes?.includes("Adult") && !item.weightAdult && (
                          <p className="text-sm text-gray-800">Adult</p>
                        )}
                        {item.sizes?.includes("Kids") && !item.weightKids && (
                          <p className="text-sm text-gray-800">Kids</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Fill empty slots */}
                {pageItems.length < 4 && 
                  Array.from({ length: 4 - pageItems.length }).map((_, index) => (
                    <div 
                      key={`empty-desktop-${pageIndex}-${index}`} 
                      className="border-2 border-dashed border-[#c7a332] rounded-xl flex items-center justify-center p-1 bg-gray-50"
                    >
                      <span className="text-gray-300 text-xl">—</span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Page Footer - Minimal padding */}
            <div className="text-center py-1 border-t border-[#c7a332] bg-[#c7a332]">
              <p className="text-sm font-medium text-black">
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
