/// <reference types="vitest">
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    fileParallelism: false,
    include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
  },
});
