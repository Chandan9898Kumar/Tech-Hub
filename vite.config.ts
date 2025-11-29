import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
export default defineConfig(({ mode }) => ({
  base: "/", // This tells Vite where the root of your application is located in the URL structure.

  plugins: [react(), tsconfigPaths()], // This enables React support in your Vite project, allowing you to use React components and JSX.

  //  Sets up how your production build will be previewed
  preview: {
    port: 8080, // The app will run on port 8080
    strictPort: true, // strictPort: true means it won't try other ports if 8080 is taken
  },
  server: {
    port: 3000, // Development server runs on port 3000
    host: "0.0.0.0", // host: "0.0.0.0" makes the server accessible from any IP address
    hmr: true, // hmr: true enables Hot Module Replacement (live updates while coding)
    watch: {
      usePolling: true, // usePolling: true: Actively checks for file changes
      interval: 100, // interval: 100: Checks every 100 milliseconds
    },
    open: true, // Open the browser automatically
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@Components": path.resolve(__dirname, "./src/Components"),
      "@Pages": path.resolve(__dirname, "./src/Pages"),
      "@Router": path.resolve(__dirname, "./src/Router"),
      "@Data": path.resolve(__dirname, "./src/Data"),
      "@Services": path.resolve(__dirname, "./src/Services"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      sonner: path.resolve(__dirname, "node_modules/sonner"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",

    minify: mode === "production" ? "esbuild" : "terser",
    sourcemap: mode !== "production",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
        // Optimize chunk file names
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 2000,

    // Enable CSS code splitting
    cssCodeSplit: true,

    // Optimize CSS
    cssMinify: true,
  },

  optimizeDeps: {
    include: ["react", "react-dom"],
  },

  css: {
    modules: {
      localsConvention: "camelCase",
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
}));
