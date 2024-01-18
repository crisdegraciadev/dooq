"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data, isSuccess, error, isError } = trpc.authCallback.useQuery(
    undefined,
    { retry: true, retryDelay: 500 }
  );

  useEffect(() => {
    if (isSuccess && data.success) {
      router.push(`/${origin ?? "dashboard"}`);
    }
  }, [isSuccess, data, router, origin]);

  useEffect(() => {
    if (isError && error.data?.code === "UNAUTHORIZED") {
      router.push(`/${origin ?? "dashboard"}`);
    }
  }, [isError, error, router, origin]);

  return (
    <div className="w-full mt-24 glex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text" />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;
