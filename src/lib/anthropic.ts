import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export const isImageChess = async (
  /**
   * Data URL encoded PNG image (e.g. data:image/png;base64,...)
   */
  imageBlob: string,
): Promise<string> => {
  // Extract base64 and media type from data URL
  const [header, base64] = imageBlob.split(",");
  const mediaType = header.split(";")[0].split(":")[1];

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: `
When I provide you with an image, you will reply with "Yes, this is chess." if, in your opinion, that image is chess.
In any other case you will reply with "No, this isn't chess.".
Never say anything else.
Never include anything additional in your response.
Do not hesitate.
Do not justify.
OK, one exception: if the image is of a chest, say "Actually, this is a chest.".
`,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mediaType as any,
              data: base64,
            },
          },
        ],
      },
    ],
  });

  const content = message.content[0];
  if (content.type === "text") {
    return content.text;
  }

  return "No.";
};
