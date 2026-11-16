
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  // These pages are available without login
  const publicPages = ["/", "/signin", "/signup"];

  const isPublicPage = publicPages.includes(pathname);

  useEffect(() => {
    if (!isPending && !session && !isPublicPage) {
      router.replace("/signin");
    }
  }, [isPending, session, isPublicPage, router]);

  if (!isPending && !session && !isPublicPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-green-50">
        <p className="text-lg font-semibold text-green-700">
          Sign In পেজে পাঠানো হচ্ছে...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
