// I'm not sure if I've misconfigured something, but my eslint-plugin-astro setup
// isn't magically aware that this file exclusively runs on the server.
/* eslint-env node */
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

import { isImageChess } from "../lib/openai";

export const server = {
  isImageChess: defineAction({
    accept: "form",
    input: z.object({
      file: z.instanceof(File),
    }),
    handler: async ({ file }) => {
      const imageBlob = `data:image/png;base64,${Buffer.from(
        await file.arrayBuffer(),
      ).toString("base64")}`;
      return await isImageChess(imageBlob);
    },
  }),
};
