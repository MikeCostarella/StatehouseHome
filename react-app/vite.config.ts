import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Deployed to GitHub Pages at https://mikecostarella.github.io/StatehouseHome/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/StatehouseHome/",
  define: {
    // Injected at build/dev-start time; drives the footer build stamp.
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
});
