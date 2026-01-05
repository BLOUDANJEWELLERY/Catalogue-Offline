"use client";

import { useState } from "react";
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
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  const itemsPerPage = 4;
  const pages = [];
  
  for (let i = 0; i < items.length; i += itemsPerPage) {
    pages.push(items.slice(i, i + itemsPerPage));
  }

  const handleImageClick = (item: CatalogueItem) => {
    if (item.image) {
      const imageUrl = urlFor(item.image).width(1200).url();
      setSelectedImage(imageUrl);
      setSelectedTitle(`B${item.modelNumber}`);
    }
  };

  const handleCloseImage = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null);
      setSelectedTitle("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-0">
      {/* Simple Image Popup */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={handleCloseImage}
        >
          <div className="relative max-w-full max-h-full">
            <div className="relative">
              <Image
                src={selectedImage}
                alt={selectedTitle}
                width={800}
                height={800}
                className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg"
                unoptimized
                priority
                onClick={(e) => e.stopPropagation()}
              />
              
              <div className="absolute -top-12 left-0 right-0 text-center">
                <p className="text-white text-xl font-bold bg-black/50 px-4 py-2 rounded-lg inline-block">
                  {selectedTitle}
                </p>
              </div>
              
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setSelectedTitle("");
                }}
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold hover:text-gray-300 transition-colors bg-black/50 px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Grid Container */}
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-4">
        {/* Mobile & Tablet View (1 column) */}
        <div className="block md:hidden">
          {pages.map((pageItems, pageIndex) => (
            <div 
              key={`page-mobile-${pageIndex}`}
              className="bg-white rounded-xl shadow-md mb-6 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#c7a332] py-3 px-4 border-b border-[#b5922a]">
                <h1 className="text-lg font-bold text-black text-center">
                  BLOUDAN JEWELLERY
                </h1>
                <h2 className="text-sm text-black font-medium text-center mt-1">
                  BANGLES CATALOGUE
                </h2>
              </div>

              {/* Grid - 1 column on mobile */}
              <div className="p-4">
                <div className="space-y-4">
                  {pageItems.map((item) => (
                    <div 
                      key={item._id}
                      className="border-2 border-[#c7a332] rounded-xl bg-white p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
                    >
                      {/* Image Container */}
                      <div 
                        className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 cursor-pointer"
                        onClick={() => handleImageClick(item)}
                      >
                        {item.image ? (
                          <>
                            <Image
                              src={urlFor(item.image).width(600).url()}
                              alt={`B${item.modelNumber}`}
                              fill
                              className="object-contain rounded-lg hover:scale-105 transition-transform duration-300"
                              unoptimized
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 40vw"
                            />
                            <div className="absolute inset-0 bg-black/0 hover:bg-black/5 rounded-lg transition-colors" />
                          </>
                        ) : (
                          <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400">No Image</span>
                          </div>
                        )}
                      </div>

                      {/* Model Number */}
                      <p className="text-2xl sm:text-3xl font-bold text-[#0b1a3d] mt-4">
                        B{item.modelNumber}
                      </p>

                      {/* Weights */}
                      <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {item.sizes?.includes("Adult") && item.weightAdult && (
                          <span className="text-sm font-medium text-gray-800 bg-gray-100 rounded-full px-3 py-1">
                            {item.weightAdult}g
                          </span>
                        )}
                        {item.sizes?.includes("Kids") && item.weightKids && (
                          <span className="text-sm font-medium text-gray-800 bg-gray-100 rounded-full px-3 py-1">
                            K-{item.weightKids}g
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Empty placeholders */}
                  {pageItems.length < 4 && 
                    Array.from({ length: 4 - pageItems.length }).map((_, index) => (
                      <div 
                        key={`empty-mobile-${pageIndex}-${index}`}
                        className="border-2 border-dashed border-[#c7a332] rounded-xl bg-gray-50 p-4 flex items-center justify-center h-48 sm:h-56 md:h-64"
                      >
                        <span className="text-gray-300 text-xl">—</span>
                      </div>
                    ))
                  }
                </div>
              </div>

              {/* Footer */}
              <div className="bg-[#c7a332] py-2 px-4 border-t border-[#b5922a]">
                <p className="text-sm font-medium text-black text-center">
                  Page {pageIndex + 1}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View (2 columns) */}
        <div className="hidden md:block">
          {pages.map((pageItems, pageIndex) => (
            <div
              key={`page-desktop-${pageIndex}`}
              className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#c7a332] py-4 px-6 border-b border-[#b5922a]">
                <h1 className="text-xl font-bold text-black text-center">
                  BLOUDAN JEWELLERY
                </h1>
                <h2 className="text-base text-black font-medium text-center mt-1">
                  BANGLES CATALOGUE
                </h2>
              </div>

              {/* Grid - 2 columns on desktop */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {pageItems.map((item) => (
                    <div
                      key={item._id}
                      className="border-2 border-[#c7a332] rounded-xl bg-white p-6 flex flex-col items-center hover:shadow-xl transition-all duration-300"
                    >
                      {/* Image Container */}
                      <div 
                        className="relative w-64 h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 cursor-pointer"
                        onClick={() => handleImageClick(item)}
                      >
                        {item.image ? (
                          <>
                            <Image
                              src={urlFor(item.image).width(800).url()}
                              alt={`B${item.modelNumber}`}
                              fill
                              className="object-contain rounded-lg hover:scale-110 transition-transform duration-300"
                              unoptimized
                              sizes="(max-width: 1024px) 40vw, (max-width: 1280px) 30vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-black/0 hover:bg-black/5 rounded-lg transition-colors" />
                          </>
                        ) : (
                          <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400">No Image</span>
                          </div>
                        )}
                      </div>

                      {/* Model Number */}
                      <p className="text-3xl lg:text-4xl font-bold text-[#0b1a3d] mt-6">
                        B{item.modelNumber}
                      </p>

                      {/* Weights */}
                      <div className="flex flex-wrap justify-center gap-3 mt-3">
                        {item.sizes?.includes("Adult") && item.weightAdult && (
                          <span className="text-base font-medium text-gray-800 bg-gray-100 rounded-full px-4 py-1.5">
                            {item.weightAdult}g
                          </span>
                        )}
                        {item.sizes?.includes("Kids") && item.weightKids && (
                          <span className="text-base font-medium text-gray-800 bg-gray-100 rounded-full px-4 py-1.5">
                            K-{item.weightKids}g
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Empty placeholders */}
                  {pageItems.length < 4 &&
                    Array.from({ length: 4 - pageItems.length }).map((_, index) => (
                      <div
                        key={`empty-desktop-${pageIndex}-${index}`}
                        className="border-2 border-dashed border-[#c7a332] rounded-xl bg-gray-50 flex items-center justify-center min-h-[400px] lg:min-h-[450px] xl:min-h-[500px]"
                      >
                        <span className="text-gray-300 text-2xl">—</span>
                      </div>
                    ))
                  }
                </div>
              </div>

              {/* Footer */}
              <div className="bg-[#c7a332] py-3 px-6 border-t border-[#b5922a]">
                <p className="text-base font-medium text-black text-center">
                  Page {pageIndex + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
