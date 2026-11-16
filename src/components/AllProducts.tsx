
import { API_ENDPOINTS } from "@/lib/api";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

async function getProducts(): Promise<Product[]> {
  "use cache";

  const res = await fetch(API_ENDPOINTS.products);

  if (!res.ok) {
    throw new Error("Products fetch failed");
  }

  const products: Product[] = await res.json();

  return products;
}

export default async function AllProducts() {
  const products = await getProducts();

  return (
    <section
      id="all-products"
      className="mx-auto max-w-[1600px] px-4 py-12 md:px-6"
    >
      {/* Section Heading */}
      <div className="mb-8">
        <p className="mb-2 font-semibold text-green-700">
          বাজারের সব পণ্য
        </p>

        <h2 className="text-3xl font-bold text-gray-900">
          সব পণ্য
        </h2>

        <p className="mt-2 text-gray-500">
          প্রতিদিনের প্রয়োজনীয় পণ্যের বর্তমান বাজারদর দেখুন।
        </p>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Product Image */}
            <div className="flex h-32 items-center justify-center rounded-xl bg-green-50 text-6xl">
              {product.image}
            </div>

            {/* Category */}
            <p className="mt-4 text-sm font-medium text-green-700">
              {product.categoryIcon} {product.categoryNameBn}
            </p>

            {/* Product Name */}
            <h3 className="mt-2 min-h-12 font-bold text-gray-900">
              {product.nameBn}
            </h3>

            {/* Price */}
            <div className="mt-3">
              <span className="text-2xl font-bold text-green-700">
                ৳{product.today}
              </span>

              <span className="ml-1 text-sm text-gray-500">
                / {product.unit}
              </span>
            </div>

            {/* Price Change */}
            <div className="mt-3">
              {product.change.dir === "up" && (
                <span className="inline-block rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
                  ▲ দাম বেড়েছে {product.change.pct}%
                </span>
              )}

              {product.change.dir === "down" && (
                <span className="inline-block rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
                  ▼ দাম কমেছে {product.change.pct}%
                </span>
              )}

              {product.change.dir === "flat" && (
                <span className="inline-block rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-600">
                  ● দাম অপরিবর্তিত
                </span>
              )}
            </div>

            {/* Yesterday Price */}
            <p className="mt-3 border-t border-gray-100 pt-3 text-sm text-gray-500">
              গতকালের দাম: ৳{product.yesterday}
            </p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="rounded-2xl bg-gray-50 py-16 text-center">
          <p className="text-xl font-bold text-gray-700">
            কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </section>
  );
}
