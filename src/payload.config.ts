import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import Users from "./collections/Users";
import Vehicles from "./collections/Vehicles/Vehicles";
import Media from "./collections/Media";
import Refuels from "./collections/Refuels/Refuels";

import "../tailwind.css";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => {
      return {
        ...config,
        module: {
          ...config.module,
          rules: [
            ...config.module.rules,
            {
              test: /\tailwind.css$/i,
              use: ["css-loader", "postcss-loader"],
            },
          ],
        },
      };
    },
  },
  editor: slateEditor({}),
  collections: [Users, Vehicles, Media, Refuels],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
