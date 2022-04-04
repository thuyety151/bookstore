import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

interface Props {
  setFiles: (files: any) => void;
  files: any;
}
export default function ImageUploadWidget({ setFiles, files }: Props) {
  const dzStyles = {
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "5px",
    paddingTop: "30px",
    textAlign: "center" as "center",
    height: 100,
  };

  const dzActive = {
    borderColor: "green",
  };

  const [currentFiles, setCurrentFiles] = useState(files);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles([
        ...currentFiles,
        ...acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
      setCurrentFiles([
        ...currentFiles,
        ...acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [currentFiles, setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon />
      <p>Upload image here</p>
    </div>
  );
}
