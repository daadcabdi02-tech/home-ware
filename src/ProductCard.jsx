import { useState } from "react";

function ProductCard({ product, onAddToCart }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-48 w-full bg-gray-50 object-contain p-4"
      />

      <div className="p-4">
        <p className="mb-1 text-sm text-gray-500">
          {product.category}
        </p>

        <h2 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
          {product.title}
        </h2>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">
            ${product.price}
          </span>

          <span className="text-sm text-gray-500">
            ⭐ {product.rating}
          </span>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          {showDetails ? "Hide Details" : "View Details"}
        </button>
        <button
          onClick={() => onAddToCart(product)}
          className="mt-2 w-full rounded-lg border border-blue-600 px-4 py-2 font-medium text-blue-600 transition hover:bg-blue-50"
        >
           Add to Cart
        </button>

        {showDetails && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <p className="text-sm leading-6 text-gray-600">
              {product.description}
            </p>

            <p className="mt-2 text-sm font-medium text-gray-700">
              Stock: {product.stock}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;