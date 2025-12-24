// src/singletonHook.ts
import React, { useEffect } from "react";
import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";
import { createRoot, type Root } from "react-dom/client";

type Options = {
  mountId?: string; // optional id for the hidden mount node
};

/**
 * Creates a singleton hook backed by Zustand.
 * - initValue: initial value returned before the hook body computes anything
 * - useHookBody: a hook that computes the shared value (runs once globally)
 * - options: optional mount config
 *
 * Returns a hook that reads the shared value.
 */
export function singletonHook<T>(
  initValue: T,
  useHookBody: () => T,
  options: Options = {},
): () => T {
  // Shared store (per singletonHook call)
  type Slice = { value: T };
  const store = createStore<Slice>(() => ({ value: initValue }));

  // Hidden runner lifetime management
  let consumers = 0;
  let root: Root | null = null;
  let host: HTMLElement | null = null;

  // Hidden component that runs the provided hook body and pushes updates to the store
  function HiddenRunner() {
    const val = useHookBody();
    useEffect(() => {
      store.setState({ value: val });
    }, [val]);
    return null;
  }

  function mountRunner() {
    if (root) return;
    host = document.createElement("div");
    host.style.display = "none";
    if (options.mountId) host.id = options.mountId;
    document.body.appendChild(host);
    root = createRoot(host);
    root.render(React.createElement(HiddenRunner));
  }

  function unmountRunner() {
    if (!root || !host) return;
    root.unmount();
    host.remove();
    root = null;
    host = null;
  }

  // The hook exposed to consumers
  function useSingleton(): T {
    const value = useStore(store, (s) => s.value);

    useEffect(() => {
      consumers += 1;
      // Safe for SSR: only runs on the client
      if (consumers === 1) mountRunner();

      return () => {
        consumers -= 1;
        if (consumers === 0) unmountRunner();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return value;
  }

  return useSingleton;
}
