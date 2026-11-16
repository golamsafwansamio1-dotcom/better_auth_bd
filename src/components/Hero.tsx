
import Link from "next/link";
import { ArrowRight, ShoppingBasket } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-8 md:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-green-900 to-green-600 px-6 py-12 text-white md:px-12 md:py-20">

        <div className="relative z-10 max-w-2xl">
          <span className="mb-5 inline-block rounded-full bg-white/20 px-4 py-2 text-sm">
            🌿 প্রতিদিনের বাজারদর
          </span>

          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            বাজার দর এখন
            <br />
            আপনার হাতের মুঠোয়!
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-green-50 md:text-lg">
            চাল, ডাল, তেল, মাছ, মাংসসহ প্রয়োজনীয় সব পণ্যের
            বর্তমান বাজারদর জানুন এক জায়গায়।
          </p>

          <Link
            href="#all-products"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3 font-bold text-green-800 transition hover:bg-green-100"
          >
            <ShoppingBasket size={21} />
            সব পণ্য দেখুন
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="mt-10 flex justify-center gap-3 text-5xl md:absolute md:bottom-10 md:right-12 md:mt-0 md:gap-5 md:text-7xl">
          <span>🥬</span>
          <span>🐟</span>
          <span>🍚</span>
          <span>🥕</span>
        </div>

      </div>
    </section>
  );
}
