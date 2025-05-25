import React from "react";

export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm h-[520px] flex flex-col animate-pulse">
    <div className="h-[280px] bg-gray-200 dark:bg-gray-700" />
    <div className="flex flex-col flex-grow p-4 space-y-3">
      <div className="w-4/5 h-5 bg-gray-200 rounded dark:bg-gray-700" />
      <div className="w-3/5 h-5 bg-gray-200 rounded dark:bg-gray-700" />
      <div className="w-16 h-6 mt-2 bg-gray-200 rounded dark:bg-gray-700" />
      <div className="w-24 h-10 mt-1 bg-gray-200 rounded dark:bg-gray-700" />
      <div className="w-32 h-4 mt-1 bg-gray-200 rounded dark:bg-gray-700" />
      <div className="w-full h-12 mt-auto bg-gray-200 dark:bg-gray-700 rounded-xl" />
    </div>
  </div>
);


export const FiltersSkeleton: React.FC = () => (
  <div className="p-4 space-y-6 bg-white rounded-lg shadow-sm dark:bg-gray-800 animate-pulse">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="h-10 bg-gray-200 rounded-md dark:bg-gray-700" />
    ))}
  </div>
);


export const PageContentSkeleton: React.FC = () => (
  <>
    <div className="p-6 mb-6 bg-white rounded-lg shadow-sm dark:bg-gray-800 animate-pulse">
      <div className="w-1/3 h-8 mb-2 bg-gray-200 rounded dark:bg-gray-700" />
      <div className="w-1/4 h-4 bg-gray-200 rounded dark:bg-gray-700" />
    </div>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <div className="lg:col-span-1">
        <FiltersSkeleton />
      </div>
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  </>
);
