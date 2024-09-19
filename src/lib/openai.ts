import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

export const isImageChess = async (
  /**
   * Base64 encoded PNG image
   */
  imageBlob: string,
): Promise<string> => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
When I provide you with an image, you will reply with "Yes, this is chess." if, in your opinion, that image is chess.
In any other case you will reply with "No, this isn't chess.".
Never say anything else.
Never include anything additional in your response.
Do not hesitate.
Do not justify.
OK, one exception: if the image is of a chest, say "Actually, this is a chest.".
`,
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              // Strangely named field, but it can be a base64 encoded image
              url: imageBlob,
            },
          },
        ],
      },
    ],
    model: "gpt-4o-mini",
  });

  return completion.choices[0].message.content ?? "No.";
};
