import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    port: 3001,
  },
  server: {
    host: true,
    port: 3000,
  },
  build: {
    outDir: "dist", // Đảm bảo build ra thư mục dist
    assetsDir: "assets", // Thư mục chứa các tài nguyên
  },
});