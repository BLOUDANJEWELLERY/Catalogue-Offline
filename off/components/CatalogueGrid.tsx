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
    <div className="min-h-screen bg-gray-50 p-0">
      {/* Mobile view */}
      <div className="md:hidden">
        {pages.map((pageItems, pageIndex) => (
          <div 
            key={`page-mobile-${pageIndex}`}
            className="bg-white mb-2"
            style={{
              minHeight: '100vh',
              maxHeight: '100vh',
              overflow: 'hidden'
            }}
          >
            {/* Page Header - Golden background */}
            <div className="text-center py-3 px-4 bg-gradient-to-r from-amber-400 to-yellow-500 border-b border-amber-300">
              <h1 className="text-base font-bold text-black">
                BLOUDAN JEWELLERY
              </h1>
              <h2 className="text-sm font-medium text-black">
                BANGLES CATALOGUE
              </h2>
            </div>

            {/* Page Content */}
            <div className="p-2">
              <div className="grid grid-cols-2 grid-rows-2 gap-2 h-[calc(100vh-120px)]">
                {pageItems.map((item) => (
                  <div 
                    key={item._id}
                    className="relative border-2 border-amber-400 rounded-xl overflow-hidden flex flex-col items-center justify-center bg-white shadow-sm"
                  >
                    {/* Image container - bigger */}
                    <div className="relative w-full flex-1 flex items-center justify-center p-1">
                      {item.image ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={urlFor(item.image).width(600).url()}
                            alt={`B${item.modelNumber}`}
                            fill
                            className="object-contain p-1 rounded-lg"
                            unoptimized
                            sizes="50vw"
                            priority={pageIndex === 0}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Model number and weight */}
                    <div className="w-full text-center mt-1 px-1 pb-1">
                      {/* Model number - blue and larger */}
                      <p className="text-2xl font-extrabold text-blue-700 mb-1 tracking-tight">
                        B{item.modelNumber}
                      </p>
                      
                      {/* Weight/size badges */}
                      <div className="space-y-0.5">
                        {item.sizes?.includes("Adult") && item.weightAdult && (
                          <p className="text-xs font-semibold text-gray-800 bg-gray-100 rounded-full px-2 py-0.5 inline-block">
                            Adult - {item.weightAdult}g
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && item.weightKids && (
                          <p className="text-xs font-semibold text-gray-800 bg-gray-100 rounded-full px-2 py-0.5 inline-block">
                            Kids - {item.weightKids}g
                          </p>
                        )}
                        {/* If no weight specified */}
                        {item.sizes?.includes("Adult") && !item.weightAdult && (
                          <p className="text-xs font-semibold text-gray-800 bg-gray-100 rounded-full px-2 py-0.5 inline-block">
                            Adult
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && !item.weightKids && (
                          <p className="text-xs font-semibold text-gray-800 bg-gray-100 rounded-full px-2 py-0.5 inline-block">
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
                      className="border-2 border-dashed border-amber-200 rounded-xl flex items-center justify-center bg-amber-50"
                    >
                      <span className="text-amber-200 text-xl">—</span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Page Footer - Golden background */}
            <div className="text-center py-2 bg-gradient-to-r from-amber-400 to-yellow-500 border-t border-amber-300">
              <p className="text-sm font-bold text-black">
                Page {pageIndex + 1}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block max-w-[210mm] mx-auto space-y-4">
        {pages.map((pageItems, pageIndex) => (
          <div 
            key={`page-desktop-${pageIndex}`}
            className="bg-white shadow-xl rounded-lg"
            style={{
              width: '210mm',
              minHeight: '297mm',
              aspectRatio: '1 / 1.414',
              margin: '0 auto'
            }}
          >
            {/* Page Header - Desktop - Golden */}
            <div className="text-center py-4 px-6 bg-gradient-to-r from-amber-400 to-yellow-500 border-b border-amber-300">
              <h1 className="text-2xl font-bold text-black tracking-wider">
                BLOUDAN JEWELLERY
              </h1>
              <h2 className="text-xl font-semibold text-black">
                BANGLES CATALOGUE
              </h2>
            </div>

            {/* Page Content - Desktop */}
            <div className="p-6">
              <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[calc(297mm-120px)]">
                {pageItems.map((item) => (
                  <div 
                    key={item._id}
                    className="relative border-3 border-amber-500 rounded-2xl overflow-hidden flex flex-col items-center justify-center bg-white shadow-md hover:shadow-lg transition-shadow"
                  >
                    {/* Image container - Desktop - bigger */}
                    <div className="relative w-full flex-1 flex items-center justify-center p-2">
                      {item.image ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={urlFor(item.image).width(800).url()}
                            alt={`B${item.modelNumber}`}
                            fill
                            className="object-contain p-2 rounded-xl"
                            unoptimized
                            sizes="25vw"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Model number and weight - Desktop */}
                    <div className="w-full text-center px-3 pb-3">
                      {/* Model number - blue and much larger */}
                      <p className="text-3xl font-black text-blue-700 mb-2 tracking-tight">
                        B{item.modelNumber}
                      </p>
                      
                      {/* Weight/size badges */}
                      <div className="space-y-1">
                        {item.sizes?.includes("Adult") && item.weightAdult && (
                          <p className="text-sm font-bold text-gray-800 bg-gray-100 rounded-full px-3 py-1 inline-block">
                            Adult - {item.weightAdult}g
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && item.weightKids && (
                          <p className="text-sm font-bold text-gray-800 bg-gray-100 rounded-full px-3 py-1 inline-block">
                            Kids - {item.weightKids}g
                          </p>
                        )}
                        {/* If no weight specified */}
                        {item.sizes?.includes("Adult") && !item.weightAdult && (
                          <p className="text-sm font-bold text-gray-800 bg-gray-100 rounded-full px-3 py-1 inline-block">
                            Adult
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && !item.weightKids && (
                          <p className="text-sm font-bold text-gray-800 bg-gray-100 rounded-full px-3 py-1 inline-block">
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
                      className="border-3 border-dashed border-amber-300 rounded-2xl flex items-center justify-center bg-amber-50"
                    >
                      <span className="text-amber-300 text-3xl">—</span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Page Footer - Desktop - Golden */}
            <div className="text-center py-3 bg-gradient-to-r from-amber-400 to-yellow-500 border-t border-amber-300">
              <p className="text-lg font-bold text-black">
                Page {pageIndex + 1}
              </p>
            </div>
          </div>
        ))}
        
        {/* Total pages info */}
        <div className="text-center text-sm text-gray-600 mt-6 mb-8 px-4 py-2 bg-amber-50 rounded-lg">
          <p className="font-medium">Total {pages.length} pages • Scroll vertically to view all</p>
        </div>
      </div>
    </div>
  );
}
