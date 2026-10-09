import { useEffect, useState } from "react";
import { getProducts } from "./services/productService";
import ProductCard from "./ProductCard";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import SortFilter from "./components/SortFilter";
9
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);
  const categories = [...new Set(products.map((product) => product.category))];
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") {
        return a.price - b.price;
      }

      if (sortBy === "price-high") {
        return b.price - a.price;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    });
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-700">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bordr-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
    
    <div>
      <h1 className="text-4xl font-bold tracking-tight text-gray-700 sm:text-4xl">
        Home-Ware
      </h1>

      <p className="mt-1 text-sm text-gray-500 text-3xl">
        Quality products for your home
      </p>
    </div>

    <div className="hidden rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 sm:block">
      🛍️ Shop Now
    </div>

  </div>
        <div className="mt-6">
          <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
            <span className="text-xl">🛒</span>

            <span className="font-semibold text-gray-800">Cart</span>

            <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-blue-600 px-2 text-sm font-bold text-white">
              {cart.length}
            </span>
          </div>
        </div>
        {cart.length > 0 && (
          <div className="mt-4 rounded-lg border bg-white p-4">
            <h2 className="mb-3 text-lg font-bold text-gray-900">Your Cart</h2>

            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 border-b pb-3"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-16 w-16 object-contain"
                  />

                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>

                      <p className="text-sm text-gray-500">${item.price}</p>
                    </div>

                    <button
                      onClick={() =>
                        setCart((currentCart) =>
                          currentCart.filter(
                            (cartItem) => cartItem.id !== item.id,
                          ),
                        )
                      }
                      className="rounded-lg px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <SearchBar search={search} setSearch={setSearch} />
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <SortFilter sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No products found
            </h2>
            <p className="mt-2 text-gray-500">Try a different search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;