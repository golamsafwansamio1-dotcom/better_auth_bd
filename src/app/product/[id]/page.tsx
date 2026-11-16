
import Link from "next/link";
import { notFound } from "next/navigation";

import { API_ENDPOINTS } from "@/lib/api";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Home,
} from "lucide-react";

export const instant = false;

type Product = {
  id: number;
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
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
};

async function getProduct(id: string): Promise<Product | null> {
  "use cache";

  const res = await fetch(API_ENDPOINTS.productDetails(id));

  if (!res.ok) {
    return null;
  }

  return res.json();
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("bn-BD").format(price);
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];

  const lowestMarket = markets.reduce(
    (lowest, market) =>
      market.min < lowest.min ? market : lowest,
    markets[0]
  );

  const highestMarket = markets.reduce(
    (highest, market) =>
      market.max > highest.max ? market : highest,
    markets[0]
  );

  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0
        ) / markets.length
      : 0;

  const priceDifference = product.today - product.yesterday;
  const priceIncreased = priceDifference > 0;
  const priceDecreased = priceDifference < 0;

  return (
    <>
     

      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-350 px-4 py-8 md:px-6">

          {/* Breadcrumb */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="flex items-center gap-1 hover:text-green-700">
              <Home size={16} />
              হোম
            </Link>

            <span>/</span>

            <Link
              href={`/category/${product.category}`}
              className="hover:text-green-700"
            >
              {product.categoryNameBn}
            </Link>

            <span>/</span>

            <span className="font-semibold text-green-700">
              {product.nameBn}
            </span>
          </div>

          {/* Main Product Banner */}
          <section className="grid gap-8 overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">

            {/* Product Information */}
            <div className="flex flex-col justify-center">
              <span className="w-fit rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                {product.categoryIcon} প্রতি {product.unit} - {product.categoryNameBn}
              </span>

              <h1 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl">
                {product.nameBn}
              </h1>

              <p className="mt-4 text-gray-500">
                {priceIncreased
                  ? `গতকালের তুলনায় আজ দাম বেড়েছে ${formatPrice(Math.abs(priceDifference))} টাকা।`
                  : priceDecreased
                    ? `গতকালের তুলনায় আজ দাম কমেছে ${formatPrice(Math.abs(priceDifference))} টাকা।`
                    : "গতকালের তুলনায় আজ দাম অপরিবর্তিত রয়েছে।"}
              </p>

              <div
                className={`mt-5 flex items-center gap-2 font-bold ${
                  priceIncreased
                    ? "text-red-600"
                    : priceDecreased
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {priceIncreased ? (
                  <TrendingUp size={22} />
                ) : priceDecreased ? (
                  <TrendingDown size={22} />
                ) : (
                  <Minus size={22} />
                )}

                {priceIncreased
                  ? `দাম বেড়েছে ${formatPrice(product.change.pct)}%`
                  : priceDecreased
                    ? `দাম কমেছে ${formatPrice(product.change.pct)}%`
                    : "দামের কোনো পরিবর্তন নেই"}
              </div>
            </div>

            {/* Today's Price */}
            <div className="flex flex-col items-center justify-center rounded-2xl bg-green-50 p-8 text-center">
              <div className="text-7xl md:text-8xl">
                {product.image}
              </div>

              <p className="mt-5 text-sm font-semibold text-gray-500">
                আজকের বাজারদর
              </p>

              <h2 className="mt-2 text-5xl font-extrabold text-green-700">
                ৳{formatPrice(product.today)}
              </h2>

              <p className="mt-2 text-gray-500">
                প্রতি {product.unit}
              </p>
            </div>
          </section>

          {/* Price Summary */}
          <section className="mt-10">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              সারা দেশের বাজারদরের সারসংক্ষেপ
            </h2>

            <div className="grid gap-4 md:grid-cols-3">

              {/* Lowest Price */}
              <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-green-50 p-3 text-green-600">
                    <TrendingDown size={25} />
                  </div>

                  <p className="font-semibold text-gray-600">
                    সর্বনিম্ন দাম
                  </p>
                </div>

                <h3 className="mt-5 text-3xl font-bold text-green-700">
                  {lowestMarket ? `৳${formatPrice(lowestMarket.min)}` : "তথ্য নেই"}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {lowestMarket?.market || "বাজারের তথ্য পাওয়া যায়নি"}
                </p>
              </div>

              {/* Highest Price */}
              <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-red-50 p-3 text-red-600">
                    <TrendingUp size={25} />
                  </div>

                  <p className="font-semibold text-gray-600">
                    সর্বোচ্চ দাম
                  </p>
                </div>

                <h3 className="mt-5 text-3xl font-bold text-red-600">
                  {highestMarket ? `৳${formatPrice(highestMarket.max)}` : "তথ্য নেই"}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {highestMarket?.market || "বাজারের তথ্য পাওয়া যায়নি"}
                </p>
              </div>

              {/* Average Price */}
              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <MapPin size={25} />
                  </div>

                  <p className="font-semibold text-gray-600">
                    গড় দাম
                  </p>
                </div>

                <h3 className="mt-5 text-3xl font-bold text-blue-700">
                  {markets.length > 0
                    ? `৳${formatPrice(Math.round(averagePrice))}`
                    : "তথ্য নেই"}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  সব বাজারের গড় দাম
                </p>
              </div>

            </div>
          </section>

          {/* Market Wise Price Table */}
          <section className="mt-12 pb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                বাজারভিত্তিক আজকের দাম
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                বিভিন্ন বাজারে এই পণ্যের দামের তুলনা দেখুন।
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full min-w-175 text-left">
                <thead className="bg-green-50">
                  <tr>
                    <th className="p-5 text-sm font-bold text-gray-700">
                      বাজার
                    </th>

                    <th className="p-5 text-sm font-bold text-gray-700">
                      বিভাগ
                    </th>

                    <th className="p-5 text-sm font-bold text-gray-700">
                      সর্বনিম্ন
                    </th>

                    <th className="p-5 text-sm font-bold text-gray-700">
                      সর্বোচ্চ
                    </th>

                    <th className="p-5 text-sm font-bold text-gray-700">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => {
                    const marketAverage = Math.round(
                      (market.min + market.max) / 2
                    );

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className="border-t border-gray-100 transition hover:bg-green-50/50"
                      >
                        <td className="p-5 font-semibold text-gray-800">
                          {market.market}
                        </td>

                        <td className="p-5 text-gray-600">
                          {market.division}
                        </td>

                        <td className="p-5 font-semibold text-green-700">
                          ৳{formatPrice(market.min)}
                        </td>

                        <td className="p-5 font-semibold text-red-600">
                          ৳{formatPrice(market.max)}
                        </td>

                        <td className="p-5 font-semibold text-gray-800">
                          ৳{formatPrice(marketAverage)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {markets.length === 0 && (
                <p className="p-8 text-center text-gray-500">
                  বাজারের কোনো তথ্য পাওয়া যায়নি।
                </p>
              )}
            </div>
          </section>

        </div>
      </main>

      
    </>
  );
}
