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
            className="bg-white"
            style={{
              minHeight: '100vh',
              maxHeight: '100vh',
              overflow: 'hidden'
            }}
          >
            {/* Page Header */}
            <div 
              className="text-center py-2 px-4 border-b"
              style={{ 
                backgroundColor: '#c7a332',
                borderColor: '#b3942d'
              }}
            >
              <h1 className="text-base font-bold text-black">
                BLOUDAN JEWELLERY
              </h1>
              <h2 className="text-sm font-medium text-black">
                BANGLES CATALOGUE
              </h2>
            </div>

            {/* Page Content - Very tight spacing */}
            <div className="p-0">
              <div className="grid grid-cols-2 grid-rows-2 gap-0 h-[calc(100vh-100px)]">
                {pageItems.map((item) => (
                  <div 
                    key={item._id}
                    className="relative border flex flex-col items-center justify-center bg-white"
                    style={{ borderColor: '#c7a332' }}
                  >
                    {/* Image container - NO PADDING/MARGIN */}
                    <div className="relative w-full flex-1 flex items-center justify-center">
                      {item.image ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={urlFor(item.image).width(600).url()}
                            alt={`B${item.modelNumber}`}
                            fill
                            className="object-contain"
                            unoptimized
                            sizes="50vw"
                            priority={pageIndex === 0}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Model number and weight - NO padding, just small margins */}
                    <div className="w-full text-center mt-0 mb-0">
                      {/* Model number - blue and larger */}
                      <p className="text-xl font-black text-blue-700 my-0">
                        B{item.modelNumber}
                      </p>
                      
                      {/* Weight/size badges - no padding */}
                      <div>
                        {item.sizes?.includes("Adult") && item.weightAdult && (
                          <p className="text-xs font-semibold text-gray-800 my-0">
                            Adult - {item.weightAdult}g
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && item.weightKids && (
                          <p className="text-xs font-semibold text-gray-800 my-0">
                            Kids - {item.weightKids}g
                          </p>
                        )}
                        {/* If no weight specified */}
                        {item.sizes?.includes("Adult") && !item.weightAdult && (
                          <p className="text-xs font-semibold text-gray-800 my-0">
                            Adult
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && !item.weightKids && (
                          <p className="text-xs font-semibold text-gray-800 my-0">
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
                      className="border flex items-center justify-center bg-gray-50"
                      style={{ borderColor: '#c7a332' }}
                    >
                      <span className="text-gray-300 text-lg">—</span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Page Footer */}
            <div 
              className="text-center py-2 border-t"
              style={{ 
                backgroundColor: '#c7a332',
                borderColor: '#b3942d'
              }}
            >
              <p className="text-sm font-bold text-black">
                Page {pageIndex + 1}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block max-w-[210mm] mx-auto">
        {pages.map((pageItems, pageIndex) => (
          <div 
            key={`page-desktop-${pageIndex}`}
            className="bg-white mb-4"
            style={{
              width: '210mm',
              minHeight: '297mm',
              aspectRatio: '1 / 1.414',
              margin: '0 auto'
            }}
          >
            {/* Page Header - Desktop */}
            <div 
              className="text-center py-3 px-6 border-b"
              style={{ 
                backgroundColor: '#c7a332',
                borderColor: '#b3942d'
              }}
            >
              <h1 className="text-xl font-bold text-black tracking-wide">
                BLOUDAN JEWELLERY
              </h1>
              <h2 className="text-lg font-semibold text-black">
                BANGLES CATALOGUE
              </h2>
            </div>

            {/* Page Content - Desktop - NO padding */}
            <div className="p-0">
              <div className="grid grid-cols-2 grid-rows-2 h-[calc(297mm-100px)]">
                {pageItems.map((item) => (
                  <div 
                    key={item._id}
                    className="relative border flex flex-col items-center justify-center bg-white"
                    style={{ borderColor: '#c7a332' }}
                  >
                    {/* Image container - Desktop - NO padding */}
                    <div className="relative w-full flex-1 flex items-center justify-center">
                      {item.image ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={urlFor(item.image).width(800).url()}
                            alt={`B${item.modelNumber}`}
                            fill
                            className="object-contain"
                            unoptimized
                            sizes="25vw"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Model number and weight - Desktop */}
                    <div className="w-full text-center">
                      {/* Model number - blue and much larger */}
                      <p className="text-3xl font-black text-blue-700 my-1">
                        B{item.modelNumber}
                      </p>
                      
                      {/* Weight/size badges */}
                      <div>
                        {item.sizes?.includes("Adult") && item.weightAdult && (
                          <p className="text-sm font-bold text-gray-800 my-0">
                            Adult - {item.weightAdult}g
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && item.weightKids && (
                          <p className="text-sm font-bold text-gray-800 my-0">
                            Kids - {item.weightKids}g
                          </p>
                        )}
                        {/* If no weight specified */}
                        {item.sizes?.includes("Adult") && !item.weightAdult && (
                          <p className="text-sm font-bold text-gray-800 my-0">
                            Adult
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && !item.weightKids && (
                          <p className="text-sm font-bold text-gray-800 my-0">
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
                      className="border flex items-center justify-center bg-gray-50"
                      style={{ borderColor: '#c7a332' }}
                    >
                      <span className="text-gray-300 text-2xl">—</span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Page Footer - Desktop */}
            <div 
              className="text-center py-2 border-t"
              style={{ 
                backgroundColor: '#c7a332',
                borderColor: '#b3942d'
              }}
            >
              <p className="text-base font-bold text-black">
                Page {pageIndex + 1}
              </p>
            </div>
          </div>
        ))}
        
        {/* Total pages info */}
        <div className="text-center text-sm text-gray-600 mt-6 mb-8">
          <p className="font-medium">Total {pages.length} pages • Scroll vertically to view all</p>
        </div>
      </div>
    </div>
  );
}
