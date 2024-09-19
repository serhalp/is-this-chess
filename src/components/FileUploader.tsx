import { type Component, createSignal } from "solid-js";
import {
  createDropzone,
  fileUploader,
  type UploadFile,
} from "@solid-primitives/upload";

import "./FileUploader.css";

fileUploader;

const validateUploadFiles = (uploadFiles: UploadFile[]): File | null => {
  // TODO(serhalp) Actually show this error to the user
  if (uploadFiles.length !== 1)
    throw new Error("Please upload exactly one file");
  const [uploadFile] = uploadFiles;
  return uploadFile.file;
};

interface DropzoneProps {
  onSelectFile: (file: File) => Promise<unknown>;
}
const Dropzone: Component<DropzoneProps> = ({
  onSelectFile,
}: DropzoneProps) => {
  const { setRef } = createDropzone({
    onDrop: async (uploadFiles) => {
      const file = validateUploadFiles(uploadFiles);
      if (file == null) return;
      await onSelectFile(file);
    },
  });

  return (
    <div ref={setRef} class="dropzone">
      Drop an image here or upload one below
    </div>
  );
};

interface FilePickerProps {
  onSelectFile: (file: File) => Promise<unknown>;
}
const FilePicker: Component<FilePickerProps> = ({
  onSelectFile,
}: FilePickerProps) => {
  const [setFiles] = createSignal<UploadFile[]>([]);

  return (
    <div class="file-picker">
      <input
        type="file"
        accept="image/*"
        use:fileUploader={{
          userCallback: async (uploadFiles) => {
            const file = validateUploadFiles(uploadFiles);
            if (file == null) return;
            await onSelectFile(file);
          },
          setFiles,
        }}
      />
    </div>
  );
};

interface Props {
  onSelectFile: (file: File) => Promise<unknown>;
}
const FileUploader: Component<Props> = ({ onSelectFile }) => {
  return (
    <div>
      <Dropzone onSelectFile={onSelectFile} />
      <FilePicker onSelectFile={onSelectFile} />
    </div>
  );
};

export default FileUploader;
