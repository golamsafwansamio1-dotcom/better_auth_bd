
export const API_BASE_URL =
  "https://openapi.programming-hero.com/api/bazardor";

export const API_ENDPOINTS = {
  products: `${API_BASE_URL}/products`,

  categories: `${API_BASE_URL}/categories`,

  productDetails: (id: string | number) =>
    `${API_BASE_URL}/products/${id}`,

  categoryProducts: (slug: string) =>
    `${API_BASE_URL}/products?category=${slug}`,

  categoryDetails: (slug: string) =>
    `${API_BASE_URL}/categories/${slug}`,
};
