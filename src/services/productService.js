const API_URL = "https://dummyjson.com";

export async function getProducts() {
  console.log("API URL:", API_URL);

  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();

  return data.products;
}