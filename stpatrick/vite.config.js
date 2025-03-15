import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Set this to "/my-app/" if deploying to a subdirectory
  build: {
    outDir: "dist",
    assetsDir: "assets", // Ensure assets are placed in the "assets" folder
  },
});