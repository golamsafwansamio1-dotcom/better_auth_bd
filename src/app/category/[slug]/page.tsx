
import Link from "next/link";
import { notFound } from "next/navigation";

import { API_ENDPOINTS } from "@/lib/api";

export const instant = false;

type Product = {
  id: number;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

async function getCategoryProducts(slug: string): Promise<Product[]> {
  "use cache";

  const res = await fetch(API_ENDPOINTS.categoryProducts(slug));

  if (!res.ok) {
    throw new Error("Category products fetch failed");
  }

  return res.json();
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const products = await getCategoryProducts(slug);

  if (products.length === 0) {
    notFound();
  }

  const categoryName = products[0].categoryNameBn;
  const categoryIcon = products[0].categoryIcon;

  return (
    <>
      

      <main className="mx-auto min-h-screen max-w-[1600px] px-4 py-10 md:px-6">
        <div className="mb-8">
          <Link href="/" className="text-sm text-green-700">
            হোম
          </Link>

          <span className="mx-2 text-gray-400">/</span>

          <span className="font-semibold text-gray-800">
            {categoryName}
          </span>
        </div>

        <div className="mb-8 rounded-2xl bg-green-50 p-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {categoryIcon} {categoryName}
          </h1>

          <p className="mt-2 text-gray-600">
            এই ক্যাটাগরির সব পণ্যের বর্তমান বাজারদর দেখুন।
          </p>

          <p className="mt-3 text-sm font-semibold text-green-700">
            মোট পণ্য: {products.length}টি
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-28 items-center justify-center rounded-xl bg-green-50 text-6xl">
                {product.image}
              </div>

              <h2 className="mt-4 font-bold text-gray-900">
                {product.nameBn}
              </h2>

              <p className="mt-3 text-xl font-bold text-green-700">
                ৳{product.today}
                <span className="text-sm font-normal text-gray-500">
                  {" "}/ {product.unit}
                </span>
              </p>

              <p className={`mt-2 text-sm font-semibold ${
                product.change.dir === "up"
                  ? "text-red-600"
                  : product.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-500"
              }`}>
                {product.change.dir === "up"
                  ? `▲ ${product.change.pct}% দাম বেড়েছে`
                  : product.change.dir === "down"
                    ? `▼ ${product.change.pct}% দাম কমেছে`
                    : "● দাম অপরিবর্তিত"}
              </p>

              <p className="mt-3 text-sm font-semibold text-green-700">
                বিস্তারিত দেখুন →
              </p>
            </Link>
          ))}
        </div>
      </main>

      
    </>
  );
}

