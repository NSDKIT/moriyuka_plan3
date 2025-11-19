// vite.config.ts

import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs"; // fs モジュールは Vite の設定で直接使われていないようですが、import されています。
import path from "node:path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // -----------------------------------------------------------------------
    // ★★★ `react-intersection-observer` の解決エラーに対処するための追加設定 ★★★
    // -----------------------------------------------------------------------
    // この設定は、 Rollup が `react-intersection-observer` を外部モジュールとして
    // 扱おうとして失敗する場合に、明示的に外部化することを指示します。
    // ただし、通常は `pnpm install` で解決されるべき問題です。
    // もし上記の方法で解決しない場合の最終手段として検討してください。
    //
    // rollupOptions: {
    //   external: ['react-intersection-observer'],
    // },
    // -----------------------------------------------------------------------
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"], // `.` で始まるディレクトリへのアクセスを拒否
    },
  },
});
