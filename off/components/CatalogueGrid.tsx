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
      {/* Mobile view - scaled to fit perfectly */}
      <div className="md:hidden">
        <div className="fixed top-2 left-0 right-0 text-center z-50">
          <div className="inline-block bg-black/70 text-white text-xs px-3 py-1 rounded-full">
            Scroll to view pages
          </div>
        </div>
        
        {pages.map((pageItems, pageIndex) => (
          <div 
            key={`page-mobile-${pageIndex}`}
            className="bg-white shadow-lg mb-4 mx-2 rounded-lg"
            style={{
              minHeight: 'calc(100vh - 1rem)',
              maxHeight: 'calc(100vh - 1rem)',
              overflow: 'hidden'
            }}
          >
            {/* Page Header - Mobile */}
            <div className="text-center py-3 px-4 border-b border-gray-200">
              <h1 className="text-base font-bold text-black">
                BLOUDAN JEWELLERY
              </h1>
              <h2 className="text-sm text-black">
                BANGLES CATALOGUE
              </h2>
            </div>

            {/* Page Content - Mobile */}
            <div className="p-3">
              <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[calc(100vh-140px)]">
                {pageItems.map((item) => (
                  <div 
                    key={item._id}
                    className="relative border-2 border-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col items-center justify-center p-2 bg-gradient-to-br from-white to-gray-50"
                  >
                    {/* Image container - smaller on mobile */}
                    <div className="relative w-full flex-1 flex items-center justify-center">
                      {item.image ? (
                        <div className="relative w-32 h-32 md:w-40 md:h-40">
                          <Image
                            src={urlFor(item.image).width(400).url()}
                            alt={`B${item.modelNumber}`}
                            fill
                            className="object-contain p-1 rounded-lg"
                            unoptimized
                            sizes="40vw"
                          />
                        </div>
                      ) : (
                        <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Model number and weight - larger on mobile */}
                    <div className="w-full text-center mt-2">
                      <p className="text-xl font-bold text-black mb-1">
                        B{item.modelNumber}
                      </p>
                      <div className="space-y-1">
                        {item.sizes?.includes("Adult") && item.weightAdult && (
                          <p className="text-sm font-medium text-gray-700 bg-gray-100 rounded-full px-3 py-1 inline-block">
                            Adult - {item.weightAdult}g
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && item.weightKids && (
                          <p className="text-sm font-medium text-gray-700 bg-gray-100 rounded-full px-3 py-1 inline-block">
                            Kids - {item.weightKids}g
                          </p>
                        )}
                        {/* If no weight specified */}
                        {item.sizes?.includes("Adult") && !item.weightAdult && (
                          <p className="text-sm font-medium text-gray-700 bg-gray-100 rounded-full px-3 py-1 inline-block">
                            Adult
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && !item.weightKids && (
                          <p className="text-sm font-medium text-gray-700 bg-gray-100 rounded-full px-3 py-1 inline-block">
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
                      className="border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
                    >
                      <span className="text-gray-300 text-lg">—</span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Page Footer - Mobile */}
            <div className="text-center py-2 border-t border-gray-200 bg-gray-50">
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
            {/* Page Header - Desktop */}
            <div className="text-center py-4 px-6 border-b border-gray-300">
              <h1 className="text-xl font-bold text-black tracking-wide">
                BLOUDAN JEWELLERY
              </h1>
              <h2 className="text-lg text-black font-medium">
                BANGLES CATALOGUE
              </h2>
            </div>

            {/* Page Content - Desktop */}
            <div className="p-8">
              <div className="grid grid-cols-2 grid-rows-2 gap-6 h-[calc(297mm-140px)]">
                {pageItems.map((item) => (
                  <div 
                    key={item._id}
                    className="relative border-2 border-gray-200 rounded-2xl shadow-md overflow-hidden flex flex-col items-center justify-center p-4 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Image container - Desktop */}
                    <div className="relative w-full flex-1 flex items-center justify-center">
                      {item.image ? (
                        <div className="relative w-48 h-48">
                          <Image
                            src={urlFor(item.image).width(600).url()}
                            alt={`B${item.modelNumber}`}
                            fill
                            className="object-contain p-2 rounded-xl"
                            unoptimized
                            sizes="25vw"
                          />
                        </div>
                      ) : (
                        <div className="w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Model number and weight - Desktop */}
                    <div className="w-full text-center mt-4">
                      <p className="text-2xl font-bold text-black mb-2">
                        B{item.modelNumber}
                      </p>
                      <div className="space-y-2">
                        {item.sizes?.includes("Adult") && item.weightAdult && (
                          <p className="text-base font-medium text-gray-800 bg-gray-100 rounded-full px-4 py-2 inline-block">
                            Adult - {item.weightAdult}g
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && item.weightKids && (
                          <p className="text-base font-medium text-gray-800 bg-gray-100 rounded-full px-4 py-2 inline-block">
                            Kids - {item.weightKids}g
                          </p>
                        )}
                        {/* If no weight specified */}
                        {item.sizes?.includes("Adult") && !item.weightAdult && (
                          <p className="text-base font-medium text-gray-800 bg-gray-100 rounded-full px-4 py-2 inline-block">
                            Adult
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && !item.weightKids && (
                          <p className="text-base font-medium text-gray-800 bg-gray-100 rounded-full px-4 py-2 inline-block">
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
                      className="border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
                    >
                      <span className="text-gray-300 text-2xl">—</span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Page Footer - Desktop */}
            <div className="text-center py-3 border-t border-gray-300 bg-gray-50">
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
