import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/api/productApi";
import PageLayout from "../components/layouts/pageLayout";
import { FaArrowLeft } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);

  if (isLoading) return <p className="text-center mt-10">Loading product...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Error loading product</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <PageLayout title={`Product #${product.id}`}>
      <Link
        to="/products"
        className="flex items-center text-blue-600 mb-4 hover:underline"
      >
        <FaArrowLeft className="mr-2" /> Back to Products
      </Link>

      <div className="bg-white shadow rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-80 object-cover rounded-lg border"
          />

          <div>
            <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
            <p className="text-gray-600 mt-2">{product.description}</p>

            <div className="mt-4 flex items-center gap-6">
              <span className="text-2xl font-bold text-blue-600">
                ${product.price}
              </span>
              <span className="text-yellow-500">⭐ {product.rating}</span>
              <span className="text-sm text-gray-500">
                Discount: {product.discountPercentage}%
              </span>
            </div>

            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p><b>Category:</b> {product.category}</p>
              <p><b>Brand:</b> {product.brand}</p>
              <p><b>SKU:</b> {product.sku}</p>
              <p><b>Stock:</b> {product.stock}</p>
              <p><b>Status:</b> {product.availabilityStatus}</p>
              <p><b>Min Order Qty:</b> {product.minimumOrderQuantity}</p>
            </div>
          </div>
        </div>

        {product.tags?.length > 0 && (
          <div>
            <h2 className="font-semibold text-lg mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="font-semibold text-lg mb-2">Dimensions & Weight</h2>
          <p className="text-sm text-gray-600">
            {product.dimensions.width}cm (W) × {product.dimensions.height}cm (H) ×{" "}
            {product.dimensions.depth}cm (D)
          </p>
          <p className="text-sm text-gray-600">Weight: {product.weight}g</p>
        </div>

        {/* Shipping & Warranty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold text-lg mb-2">Shipping Info</h2>
            <p className="text-sm text-gray-600">{product.shippingInformation}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-2">Warranty</h2>
            <p className="text-sm text-gray-600">{product.warrantyInformation}</p>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">Return Policy</h2>
          <p className="text-sm text-gray-600">{product.returnPolicy}</p>
        </div>

        {product.reviews?.length > 0 && (
          <div>
            <h2 className="font-semibold text-lg mb-2">Reviews</h2>
            <div className="space-y-3">
              {product.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="border p-3 rounded-lg bg-gray-50"
                >
                  <p className="text-yellow-500">⭐ {review.rating}</p>
                  <p className="text-sm text-gray-700">{review.comment}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    – {review.reviewerName} ({review.reviewerEmail})
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="font-semibold text-lg mb-2">Meta Information</h2>
          <p className="text-sm text-gray-600">Created: {new Date(product.meta?.createdAt).toLocaleString()}</p>
          <p className="text-sm text-gray-600">Updated: {new Date(product.meta?.updatedAt).toLocaleString()}</p>
          <p className="text-sm text-gray-600">Barcode: {product.meta?.barcode}</p>
          {product.meta?.qrCode && (
            <img
              src={product.meta.qrCode}
              alt="QR Code"
              className="mt-2 w-24 h-24"
            />
          )}
        </div>

        {product.images?.length > 0 && (
          <div>
            <h2 className="font-semibold text-lg mb-2">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.title}-${idx}`}
                  className="w-full h-32 object-cover rounded-lg border"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ProductDetail;
