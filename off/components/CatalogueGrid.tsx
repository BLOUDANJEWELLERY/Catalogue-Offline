import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import { useState, useEffect } from "react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);
  
  // Auto-reset to page 1 when items change
  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentPage < totalPages) {
        setCurrentPage(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  return (
    <div className="min-h-screen bg-[#fdf8f3] p-4 md:p-6 relative">
      {/* Header - Fixed for all pages */}
      <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm border-b border-gray-200 py-3 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-[#0b1a3d]">
            Bloudan Bangles Catalogue
          </h1>
          <div className="text-sm md:text-base text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </header>

      {/* Main Content Area with Fixed Pages */}
      <main className="pt-16 pb-24"> {/* Padding for fixed header/footer */}
        {/* Page Container */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:p-6 min-h-[70vh]">
            {/* Page Content - 2x2 Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 h-full">
              {currentItems.map((item) => (
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
              
              {/* Fill empty slots if less than 4 items */}
              {Array.from({ length: itemsPerPage - currentItems.length }).map((_, index) => (
                <div 
                  key={`empty-${index}`} 
                  className="border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center min-h-[200px]"
                >
                  <span className="text-gray-400">No item</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Fixed for all pages */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white z-50 shadow-sm border-t border-gray-200 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            {/* Page Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#0b1a3d] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0b1a3d]/90 transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600 mx-2">
                {startIndex + 1}-{Math.min(startIndex + itemsPerPage, items.length)} of {items.length} items
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#0b1a3d] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0b1a3d]/90 transition-colors"
              >
                Next
              </button>
            </div>

            {/* Page Indicator */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    currentPage === index + 1
                      ? 'bg-[#c7a332] text-[#0b1a3d] font-bold'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {/* Footer Text */}
            <div className="text-xs md:text-sm text-gray-500 text-center md:text-right">
              <p>Bloudan Bangles © {new Date().getFullYear()}</p>
              <p className="hidden md:block">Quality Handmade Bangles</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Zoom Hint */}
      <div className="md:hidden fixed bottom-24 right-4 bg-[#0b1a3d] text-white text-xs px-3 py-2 rounded-lg shadow-lg animate-pulse">
        Pinch to zoom if needed
      </div>
    </div>
  );
}
