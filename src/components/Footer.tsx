
import Link from "next/link";
import {
  ShoppingCart,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">

        {/* Logo and About */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <ShoppingCart size={30} className="text-green-400" />
            <span className="text-2xl font-bold">বাজার দর</span>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-green-100">
            প্রতিদিনের প্রয়োজনীয় পণ্যের বাজারদর জানুন এক জায়গায়।
            সঠিক তথ্যের মাধ্যমে আপনার বাজারকে করুন আরও সহজ।
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-bold">কুইক লিংক</h3>

          <ul className="space-y-3 text-sm text-green-100">
            <li>
              <Link href="/">হোম</Link>
            </li>
            <li>
              <Link href="/#all-products">সব পণ্য</Link>
            </li>
            <li>
              <Link href="/signin">লগইন</Link>
            </li>
            <li>
              <Link href="/signup">রেজিস্ট্রেশন</Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="mb-5 text-lg font-bold">
            পণ্যের ক্যাটাগরি
          </h3>

          <ul className="space-y-3 text-sm text-green-100">
            <li>চাল ও ডাল</li>
            <li>তেল ও মসলা</li>
            <li>শাকসবজি</li>
            <li>মাছ ও মাংস</li>
            <li>ডিম ও দুধ</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-lg font-bold">যোগাযোগ</h3>

          <ul className="space-y-4 text-sm text-green-100">
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-green-400" />
              info@bazardor.com
            </li>

            <li className="flex items-center gap-3">
              <Phone size={18} className="text-green-400" />
              +880 1234-567890
            </li>

            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-green-400" />
              বাংলাদেশ
            </li>
          </ul>

          <div className="mt-6">
            <a
              href="#"
              aria-label="Website"
              className="inline-flex rounded-full bg-green-800 p-3 hover:bg-green-700"
            >
              <Globe size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-green-800 px-6 py-5 text-center text-sm text-green-200">
        © 2026 বাজার দর। সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
}


