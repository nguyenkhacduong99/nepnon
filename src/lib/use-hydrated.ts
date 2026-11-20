"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** true sau khi client đã hydrate — tránh nháy "giỏ trống" trước khi đọc localStorage */
export function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}
