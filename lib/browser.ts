import { useSyncExternalStore } from "react";

const noSubscription = () => () => {};

export function useBrowserValue<T>(read: () => T, serverValue: T): T {
  return useSyncExternalStore(noSubscription, read, () => serverValue);
}
