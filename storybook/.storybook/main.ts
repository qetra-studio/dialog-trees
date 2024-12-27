import type { StorybookConfig } from "@storybook/react-vite";
import * as path from "node:path";

import { join, dirname } from "path";
import {mergeConfig} from "vite";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  viteFinal: (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          // Resolve monorepo package aliases
          "@tree-tails/core": path.resolve(__dirname, "../../packages/core/dist"),
          "@tree-tails/mui": path.resolve(__dirname, "../../packages/mui/dist"),
        },

      },
    })
  }
};
export default config;
