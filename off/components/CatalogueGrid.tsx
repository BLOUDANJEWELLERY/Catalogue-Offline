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
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Zoom hint for mobile */}
      <div className="md:hidden fixed top-4 right-4 bg-[#0b1a3d] text-white text-xs px-3 py-2 rounded-lg shadow-lg z-50">
        Pinch to zoom out
      </div>

      {/* Container for all pages */}
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {pages.map((pageItems, pageIndex) => (
          <div 
            key={`page-${pageIndex}`}
            className="bg-white rounded-xl shadow-lg border border-gray-200 page-break"
            style={{
              minHeight: 'calc(100vh - 2rem)',
              pageBreakInside: 'avoid',
              pageBreakAfter: 'always'
            }}
          >
            {/* Page Header */}
            <div className="border-b border-gray-200 p-4 md:p-6">
              <div className="flex justify-between items-center">
                <h1 className="text-xl md:text-2xl font-bold text-[#0b1a3d]">
                  Bloudan Bangles Catalogue
                </h1>
                <div className="text-sm md:text-base text-gray-600">
                  Page {pageIndex + 1} of {pages.length}
                </div>
              </div>
            </div>

            {/* Page Content - Always 4 items per page */}
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-2 gap-4 md:gap-6 h-full min-h-[60vh]">
                {pageItems.map((item) => (
                  <div 
                    key={item._id} 
                    className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden flex flex-col"
                  >
                    <div className="relative aspect-square bg-[#0b1a3d] flex-1">
                      {item.image && (
                        <Image
                          src={urlFor(item.image).width(600).url()}
                          alt={`B${item.modelNumber}`}
                          fill
                          className="object-cover p-2"
                          unoptimized
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      )}
                    </div>

                    <div className="p-3 md:p-4 text-center border-t border-gray-100">
                      <p className="text-lg md:text-xl font-bold text-[#0b1a3d]">
                        B{item.modelNumber}
                      </p>

                      <div className="flex flex-col md:flex-row justify-center gap-1 md:gap-2 mt-2">
                        {item.sizes?.includes("Adult") && (
                          <span className="bg-[#c7a332] text-[#0b1a3d] px-2 py-1 rounded text-xs font-semibold">
                            Adult {item.weightAdult ? `- ${item.weightAdult}g` : ""}
                          </span>
                        )}
                        {item.sizes?.includes("Kids") && (
                          <span className="bg-[#c7a332] text-[#0b1a3d] px-2 py-1 rounded text-xs font-semibold mt-1 md:mt-0">
                            Kids {item.weightKids ? `- ${item.weightKids}g` : ""}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Fill empty slots if less than 4 items on last page */}
                {pageItems.length < itemsPerPage && 
                  Array.from({ length: itemsPerPage - pageItems.length }).map((_, index) => (
                    <div 
                      key={`empty-${pageIndex}-${index}`} 
                      className="border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center min-h-[200px]"
                    >
                      <span className="text-gray-400">-</span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Page Footer */}
            <div className="border-t border-gray-200 p-4 md:p-6 mt-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                <div className="text-sm text-gray-600">
                  Showing {pageItems.length} items
                </div>
                
                <div className="text-xs md:text-sm text-gray-500 text-center">
                  <p>Bloudan Bangles © {new Date().getFullYear()}</p>
                  <p className="hidden md:block">Quality Handmade Bangles | Page {pageIndex + 1}</p>
                </div>

                <div className="text-sm text-gray-600">
                  Total Items: {items.length}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Print styling hint */}
      <div className="text-center text-sm text-gray-500 mt-8 mb-4">
        <p className="hidden print:block">Printed from Bloudan Bangles Catalogue</p>
        <p className="print:hidden">Scroll vertically to view all pages</p>
      </div>
    </div>
  );
}
