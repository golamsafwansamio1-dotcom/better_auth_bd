
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Home,
  LogIn,
  UserPlus,
  Menu,
  X,
  UserRound,
  LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const categories = [
  { name: "চাল", emoji: "🍚", slug: "chal" },
  { name: "ডাল", emoji: "🥣", slug: "dal" },
  { name: "তেল", emoji: "🫗", slug: "tel" },
  { name: "সবজি", emoji: "🥬", slug: "sobji" },
  { name: "মাছ", emoji: "🐟", slug: "mach" },
  { name: "মাংস", emoji: "🥩", slug: "mangsho" },
  { name: "ডিম-দুধ", emoji: "🥚", slug: "dim-dui" },
  { name: "মসলা", emoji: "🌶️", slug: "mosla" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await authClient.signOut();
      closeMenu();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const accountButtons = (
    <>
      {session ? (
        <>
          <Link
            href="/profile"
            onClick={closeMenu}
            className="flex items-center gap-2 rounded-xl border border-green-700 px-4 py-3 text-green-700 hover:bg-green-50"
          >
            <UserRound size={20} />
            প্রোফাইল
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-red-600 px-4 py-3 text-white hover:bg-red-700 disabled:opacity-50"
          >
            <LogOut size={20} />
            {isLoggingOut ? "লগআউট হচ্ছে..." : "লগআউট"}
          </button>
        </>
      ) : (
        <>
          <Link
            href="/signin"
            onClick={closeMenu}
            className="flex items-center gap-2 rounded-xl border border-green-700 px-4 py-3 text-green-700 hover:bg-green-50"
          >
            <LogIn size={20} />
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            onClick={closeMenu}
            className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-green-700 px-4 py-3 text-white hover:bg-green-800"
          >
            <UserPlus size={20} />
            সাইন আপ
          </Link>
        </>
      )}
    </>
  );

  return (
    <header className="w-full border-b border-green-100 bg-white">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-5 px-6 py-5 lg:flex-nowrap">
        <Link href="/" className="flex shrink-0 items-center gap-4">
          <ShoppingCart className="h-14 w-14 text-green-700" />

          <div>
            <h1 className="text-4xl font-bold text-green-800">
              বাজার দর
            </h1>
            <p className="text-sm text-gray-600">
              প্রয়োজনীয় পণ্যের দাম এক নজরে
            </p>
          </div>
        </Link>

        <nav className="hidden flex-wrap items-center justify-center gap-3 md:flex">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-white"
          >
            <Home size={20} />
            হোম
          </Link>

          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="whitespace-nowrap px-2 py-3 text-lg text-gray-800 hover:text-green-700"
            >
              {category.emoji} {category.name}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          {!isPending && accountButtons}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-xl border border-green-200 bg-green-50 p-3 text-green-700 transition hover:bg-green-100 md:hidden"
          aria-label={isMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-green-100 bg-white px-4 py-5 shadow-lg md:hidden">
          <p className="mb-3 text-sm font-bold text-gray-500">
            ক্যাটাগরি নির্বাচন করুন
          </p>

          <nav className="grid grid-cols-2 gap-3">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-2 rounded-xl bg-green-700 px-4 py-3 font-semibold text-white"
            >
              <Home size={19} />
              হোম
            </Link>

            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                onClick={closeMenu}
                className="flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3 font-medium text-gray-800 transition hover:bg-green-100"
              >
                <span>{category.emoji}</span>
                {category.name}
              </Link>
            ))}
          </nav>

          <div className="my-5 border-t border-gray-100" />

          <p className="mb-3 text-sm font-bold text-gray-500">
            আপনার অ্যাকাউন্ট
          </p>

          <div className="grid grid-cols-2 gap-3">
            {!isPending && accountButtons}
          </div>
        </div>
      )}
    </header>
  );
}




