import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import { useMediaQuery } from "react-responsive";

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
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Split items into pages of 4
  const itemsPerPage = 4;
  const pages = [];
  
  for (let i = 0; i < items.length; i += itemsPerPage) {
    pages.push(items.slice(i, i + itemsPerPage));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-2 md:p-4">
      {/* Zoom hint for mobile */}
      {isMobile && (
        <div className="fixed top-2 right-2 bg-[#0b1a3d] text-white text-xs px-3 py-1.5 rounded-lg shadow-lg z-50 animate-pulse">
          Pinch to zoom out
        </div>
      )}

      {/* Container for all pages - scaled for mobile */}
      <div 
        className={`max-w-[210mm] mx-auto space-y-4 md:space-y-6 ${isMobile ? 'scale-90 origin-top' : ''}`}
        style={isMobile ? { minWidth: '100vw' } : {}}
      >
        {pages.map((pageItems, pageIndex) => (
          <div 
            key={`page-${pageIndex}`}
            className="bg-white shadow-lg border border-gray-300 rounded-sm"
            style={{
              width: '210mm',
              minHeight: '297mm',
              aspectRatio: '1 / 1.414',
              margin: isMobile ? '0 auto' : '0 auto 0.5rem auto',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Page Header */}
            <div 
              className="absolute top-0 left-0 right-0 text-center py-2 px-4 border-b border-gray-300"
              style={{ height: '50px' }}
            >
              <h1 className="text-lg font-bold text-black tracking-wide">
                BLOUDAN JEWELLERY
              </h1>
              <h2 className="text-sm font-medium text-black">
                BANGLES CATALOGUE
              </h2>
            </div>

            {/* Page Content - 2x2 Grid */}
            <div 
              className="absolute inset-0"
              style={{
                top: '50px',
                bottom: '40px',
                padding: '20px'
              }}
            >
              <div className="grid grid-cols-2 grid-rows-2 h-full w-full gap-4">
                {pageItems.map((item, itemIndex) => (
                  <div 
                    key={item._id}
                    className="relative border border-gray-200 rounded-sm overflow-hidden flex flex-col items-center justify-center"
                  >
                    {/* Image container */}
                    <div className="relative w-full flex-1 flex items-center justify-center p-2">
                      {item.image ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={urlFor(item.image).width(800).url()}
                            alt={`B${item.modelNumber}`}
                            fill
                            className="object-contain p-1"
                            unoptimized
                            sizes="50vw"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Model number and weight */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white/90 border-t border-gray-200 py-1 px-2">
                      <div className="flex flex-col items-center">
                        <p className="text-sm font-bold text-black">
                          B{item.modelNumber}
                        </p>
                        {item.sizes?.includes("Adult") && item.weightAdult && (
                          <p className="text-xs text-black">
                            Adult - {item.weightAdult}g
                          </p>
                        )}
                        {item.sizes?.includes("Kids") && item.weightKids && (
                          <p className="text-xs text-black">
                            Kids - {item.weightKids}g
                          </p>
                        )}
                        {/* If no weight specified but has sizes */}
                        {item.sizes?.includes("Adult") && !item.weightAdult && (
                          <p className="text-xs text-black">Adult</p>
                        )}
                        {item.sizes?.includes("Kids") && !item.weightKids && (
                          <p className="text-xs text-black">Kids</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Fill empty slots on last page */}
                {pageItems.length < 4 && 
                  Array.from({ length: 4 - pageItems.length }).map((_, index) => (
                    <div 
                      key={`empty-${pageIndex}-${index}`} 
                      className="border border-dashed border-gray-300 rounded-sm flex items-center justify-center"
                    >
                      <span className="text-gray-300">—</span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Page Footer */}
            <div 
              className="absolute bottom-0 left-0 right-0 text-center py-1 border-t border-gray-300"
              style={{ height: '40px' }}
            >
              <p className="text-sm text-black mt-1">
                Page {pageIndex + 1}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Print message */}
      <div className="text-center text-xs text-gray-500 mt-4 mb-4 print:hidden">
        <p>Scroll vertically to view all pages • Designed for A4 printing</p>
      </div>
    </div>
  );
}
