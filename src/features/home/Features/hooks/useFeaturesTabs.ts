import { useState, useSyncExternalStore } from "react";
import { DEFAULT_FEATURE_ID } from "../constants";

const subscribe = () => () => {};

export function useFeaturesTabs() {
  const [activeTab, setActiveTab] = useState(DEFAULT_FEATURE_ID);
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return { activeTab, setActiveTab, mounted };
}
