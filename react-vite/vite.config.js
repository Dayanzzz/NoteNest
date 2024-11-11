import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // Only add eslintPlugin if in development mode
    mode === "development" &&
      eslintPlugin({
        lintOnStart: true,
        failOnError: false, // You can also omit this as it’s already the default in development
      }),
  ].filter(Boolean), // Filter out false values to avoid errors
  server: {
    open: true,
    proxy: {
      "/api": "http://127.0.0.1:8000",
    },
  },
}));


// import { defineConfig } from "vite";
// import eslintPlugin from "vite-plugin-eslint";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig((mode) => ({
//   plugins: [
//     react(),
//     eslintPlugin({
//       lintOnStart: true,
//       failOnError: mode === "production",
//     }),
//   ],
//   server: {
//     open: true,
//     proxy: {
//       "/api": "http://127.0.0.1:8000",
//     },
//   },
// }));
