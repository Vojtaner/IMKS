import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginEslint } from "@rsbuild/plugin-eslint";

export default defineConfig({
  plugins: [
    pluginReact({
      reactRefreshOptions: {
        exclude: [/[\\/]node_modules[\\/]/],
      },
      fastRefresh: true,
      enableProfiler: process.env.REACT_PROFILER === "true",
      swcReactOptions: { refresh: true },
    }),
    pluginEslint(),
  ],

  html: {
    template: "./index.html",
  },
  source: {
    entry: {
      index: "./src/main.ts",
    },
  },
});
