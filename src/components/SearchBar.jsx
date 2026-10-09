function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search products..."
      className="w-full rounded-lg border border-gray-300 px-4 py-2 mb-8 focus:border-blue-500"
    />
  );
}

export default SearchBar;