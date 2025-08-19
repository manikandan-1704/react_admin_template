import React from "react";
import PageLayout from "../components/layouts/pageLayout";
import { useGetProductsQuery } from "../redux/api/productApi";

const Products = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Failed to load products</div>;

  return (
    <PageLayout title="Products">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.products?.map((product) => (
          <div
  key={product.id}
  className="bg-gray-100 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-400 transition p-4 flex flex-col"
>

            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover rounded-lg"
            />

            <div className="mt-4 flex-1">
              <h3 className="font-semibold text-gray-800 text-lg truncate">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-blue-600 font-bold">${product.price}</span>
              <span className="text-yellow-500 text-sm">
                ⭐ {product.rating}
              </span>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Products;
