function SortFilter({ sortBy, setSortBy }) {
  return (
    <div className="mb-6">
      <label
        htmlFor="sort"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Sort by
      </label>

      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      >
        <option value="default">Default</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Highest Rating</option>
      </select>
    </div>
  );
}

export default SortFilter;