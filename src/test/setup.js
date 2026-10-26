import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Mock scrollTo in jsdom
if (typeof window !== "undefined") {
  window.scrollTo = vi.fn();
}
if (typeof Element !== "undefined") {
  Element.prototype.scrollTo = vi.fn();
}

afterEach(() => {
  cleanup();
});
