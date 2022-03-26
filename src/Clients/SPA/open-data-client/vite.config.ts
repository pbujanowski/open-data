import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import svgrPlugin from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
    tsconfigPaths(),
  ],
});
