import { ImageList, ImageListItem } from "@material-ui/core";
import { useEffect, useState } from "react";
import ImageUploadWidget from "./ImageUploadWidget";
import "./styles.scss";

const ImageUploadContainer: React.FC = () => {
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <>
      {files.length > 0 && (
        <ImageList cols={7} gap={8} className="image-list-review">
          {files.map((file: any, index: number) => (
            <ImageListItem key={`image-${index}-${file.lastModified}`}>
              <img src={`${file.preview}`} alt={`im-${index}`} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      )}
      <div className="py-md">
        <ImageUploadWidget setFiles={setFiles} files={files} />
      </div>
    </>
  );
};

export default ImageUploadContainer;
