"use client";

import { useState, useEffect } from "react";
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const [preloadedImages, setPreloadedImages] = useState<{[key: string]: HTMLImageElement}>({});

  // Preload all images on component mount
  useEffect(() => {
    const preloadImages = async () => {
      const preloaded: {[key: string]: HTMLImageElement} = {};
      
      items.forEach(item => {
        if (item.image) {
          const imageUrl = urlFor(item.image).width(1200).url();
          const img = new Image();
          img.src = imageUrl;
          preloaded[imageUrl] = img;
        }
      });
      
      setPreloadedImages(preloaded);
    };
    
    preloadImages();
  }, [items]);

  const handleImageClick = (item: CatalogueItem) => {
    if (item.image) {
      const imageUrl = urlFor(item.image).width(1200).url();
      
      // If image is already preloaded, show it immediately
      if (preloadedImages[imageUrl]) {
        setSelectedImage(imageUrl);
        setSelectedModel(item.modelNumber);
      } else {
        // Fallback: load and cache
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          setSelectedImage(imageUrl);
          setSelectedModel(item.modelNumber);
          setPreloadedImages(prev => ({...prev, [imageUrl]: img}));
        };
      }
    }
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
    setSelectedModel(null);
  };

  // Handle ESC key to close image
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        handleCloseImage();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [selectedImage]);

  // Items per page
  const itemsPerPage = 4;
  const pages = [];
  
  for (let i = 0; i < items.length; i += itemsPerPage) {
    pages.push(items.slice(i, i + itemsPerPage));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-0">
      {/* Instant Image Popup */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={handleCloseImage}
        >
          {/* Transparent overlay */}
          <div className="absolute inset-0 bg-black/80 transition-opacity duration-300 ease-out" />
          
          {/* Image with rounded golden border */}
          <div 
            className="relative z-10 max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden border-[3px] border-[#c7a332] shadow-2xl">
              {/* Display preloaded image */}
              <img
                src={selectedImage}
                alt={`Bangle Model B${selectedModel}`}
                className="block w-full h-auto max-h-[85vh] object-contain"
                style={{
                  maxWidth: 'min(900px, 90vw)',
                  maxHeight: 'min(900px, 85vh)'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Responsive Grid Container */}
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4">
        {pages.map((pageItems, pageIndex) => (
          <div
            key={`page-${pageIndex}`}
            className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 md:mb-8"
          >
            {/* Page Header */}
            <div className="text-center py-3 md:py-4 px-4 border-b-2 border-[#c7a332] bg-[#c7a332]">
              <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-black">
                BLOUDAN JEWELLERY
              </h1>
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-black font-medium mt-0.5 md:mt-1">
                BANGLES CATALOGUE
              </h2>
            </div>

            {/* Responsive Grid */}
            <div className="p-2 sm:p-3 md:p-4">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                {pageItems.map((item) => (
                  <div
                    key={item._id}
                    className="relative border-2 border-[#c7a332] rounded-xl bg-white flex flex-col items-center p-2 sm:p-3 md:p-4 group cursor-pointer hover:shadow-xl transition-all duration-300"
                    onClick={() => handleImageClick(item)}
                  >
                    {/* Image Container - Responsive */}
                    <div className="relative w-full aspect-square max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px] mx-auto mb-2 sm:mb-3 md:mb-4">
                      {item.image ? (
                        <>
                          <Image
                            src={urlFor(item.image).width(600).url()}
                            alt={`Bangle Model B${item.modelNumber}`}
                            fill
                            className="object-contain rounded-lg"
                            unoptimized
                            sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 20vw"
                          />
                        </>
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-sm sm:text-base">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Model Number */}
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b1a3d] mb-1 sm:mb-2">
                      B{item.modelNumber}
                    </p>

                    {/* Weight Tags */}
                    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                      {item.sizes?.includes("Adult") && item.weightAdult && (
                        <span className="text-xs sm:text-sm font-medium text-gray-800 bg-gray-100 rounded-full px-2.5 sm:px-3 py-1">
                          {item.weightAdult}g
                        </span>
                      )}
                      {item.sizes?.includes("Kids") && item.weightKids && (
                        <span className="text-xs sm:text-sm font-medium text-gray-800 bg-gray-100 rounded-full px-2.5 sm:px-3 py-1">
                          K-{item.weightKids}g
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {/* Empty slots for incomplete pages */}
                {pageItems.length < 4 &&
                  Array.from({ length: 4 - pageItems.length }).map((_, index) => (
                    <div
                      key={`empty-${pageIndex}-${index}`}
                      className="border-2 border-dashed border-[#c7a332] rounded-xl bg-gray-50 flex flex-col items-center justify-center p-4 min-h-[200px] sm:min-h-[220px] md:min-h-[240px]"
                    >
                      <span className="text-gray-300 text-xl sm:text-2xl">—</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Page Footer */}
            <div className="text-center py-2 sm:py-3 border-t-2 border-[#c7a332] bg-[#c7a332]">
              <p className="text-sm sm:text-base md:text-lg font-medium text-black">
                Page {pageIndex + 1} of {pages.length}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
