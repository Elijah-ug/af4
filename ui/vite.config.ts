import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // dev
  // server: {
  //   proxy: {
  //     "/realcompanion": {
  //       target: "http://api:3000",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  //   host: true,
  //   port: 80,
  // },
});
