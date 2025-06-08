import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "production",
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
});
