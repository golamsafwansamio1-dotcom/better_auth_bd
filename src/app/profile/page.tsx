
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserRound, Mail, ShieldCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-green-700">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <main className="min-h-[70vh] bg-green-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <UserRound size={40} className="text-green-700" />
            </div>

            <h1 className="mt-4 text-3xl font-bold text-gray-800">
              আমার প্রোফাইল
            </h1>

            <p className="mt-2 text-gray-500">
              আপনার অ্যাকাউন্টের তথ্য
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-4 rounded-xl bg-green-50 p-5">
              <UserRound className="text-green-700" size={25} />
              <div>
                <p className="text-sm text-gray-500">নাম</p>
                <p className="font-semibold text-gray-800">
                  {session.user.name || "নাম দেওয়া নেই"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-green-50 p-5">
              <Mail className="text-green-700" size={25} />
              <div>
                <p className="text-sm text-gray-500">ইমেইল</p>
                <p className="break-all font-semibold text-gray-800">
                  {session.user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-green-50 p-5">
              <ShieldCheck className="text-green-700" size={25} />
              <div>
                <p className="text-sm text-gray-500">অ্যাকাউন্ট স্ট্যাটাস</p>
                <p className="font-semibold text-green-700">
                  Active
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push("/")}
            className="mt-8 w-full rounded-xl bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            হোম পেজে ফিরে যাও
          </button>
        </div>
      </div>
    </main>
  );
}
