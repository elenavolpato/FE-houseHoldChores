import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { fileURLToPath } from "url"
import { readFileSync } from "fs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"))

export default defineConfig((/* { mode} */) => ({
  plugins: [react()],
  base: /* mode === "production" ? "/FE-houseHoldChores/" : */ "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
}))
