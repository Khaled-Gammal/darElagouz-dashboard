"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";


export default function UseSearchParamsHook() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const addQueryString = useCallback(
    (name, value) => {
      return router.push(pathname + "?" + createQueryString(name, value));
    },
    [createQueryString, pathname, router],
  );


  return { pathname, searchParams, router, addQueryString };
}