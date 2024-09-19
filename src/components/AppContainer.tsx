import { type Component, createSignal } from "solid-js";
import { actions } from "astro:actions";

import FileUploader from "./FileUploader";
import "./AppContainer.css";

const AppContainer: Component<{}> = () => {
  const [isLoading, setIsLoading] = createSignal<boolean>(false);
  const [error, setError] = createSignal<string | null>(null);
  const [imageUrl, setImageUrl] = createSignal<string | null>(null);
  const [answer, setAnswer] = createSignal<string | null>(null);

  const handleSelectFile = async (file: File) => {
    setImageUrl(URL.createObjectURL(file));

    setIsLoading(true);
    const form = new FormData();
    form.set("file", file);
    const { data, error } = await actions.isImageChess(form);

    if (error) {
      console.error("Error in action", { error });
      setError(error.toString());
      return;
    }

    setIsLoading(false);
    console.debug("Got response from isImageChess", { data });
    setAnswer(data);
  };

  return (
    <div>
      <div class="error">{error() ? `Something went wrong: ${error}` : ""}</div>

      <div class="answer">{isLoading() ? "Pondering..." : answer()}</div>

      <div class="image">{imageUrl() ? <img src={imageUrl()!} /> : null}</div>

      {!isLoading() && <FileUploader onSelectFile={handleSelectFile} />}
    </div>
  );
};

export default AppContainer;
