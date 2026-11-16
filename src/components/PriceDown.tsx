
import Link from "next/link";
import { API_ENDPOINTS } from "@/lib/api";
import { TrendingDown } from "lucide-react";

type Product = {
  id: number;
  nameBn: string;
  image: string;
  today: number;
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

  return res.json();
}

export default async function PriceDown() {
  const products = await getProducts();

  const decreasedProducts = products.filter(
    (product) => product.change.dir === "down"
  );

  return (
    <section className="mx-auto max-w-[1600px] px-4 py-12 md:px-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-xl bg-green-50 p-3 text-green-600">
          <TrendingDown size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            আজ দাম কমেছে
          </h2>
          <p className="text-sm text-gray-500">
            যেসব পণ্যের দাম আজ কমেছে
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {decreasedProducts.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-24 items-center justify-center rounded-xl bg-green-50 text-5xl">
              {product.image}
            </div>

            <h3 className="mt-4 font-bold text-gray-900">
              {product.nameBn}
            </h3>

            <p className="mt-3 text-xl font-bold text-gray-900">
              ৳{product.today}
              <span className="text-sm font-normal text-gray-500">
                {" "}/ {product.unit}
              </span>
            </p>

            <p className="mt-2 text-sm font-semibold text-green-600">
              ▼ {product.change.pct}% দাম কমেছে
            </p>

            <p className="mt-3 text-sm font-semibold text-green-700">
              বিস্তারিত দেখুন →
            </p>
          </Link>
        ))}
      </div>

      {decreasedProducts.length === 0 && (
        <p className="py-8 text-center text-gray-500">
          আজ কোনো পণ্যের দাম কমেনি।
        </p>
      )}
    </section>
  );
}


