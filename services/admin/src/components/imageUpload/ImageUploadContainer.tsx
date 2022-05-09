import { Icon, ImageList, ImageListItem } from "@material-ui/core";
import { Media } from "model/media";
import ImageUploadWidget from "./ImageUploadWidget";
import "./styles.scss";

export type Props = {
  files: File[] & Media[];
  setFiles: (files: any) => void;
  onRemoveFile: (file: any) => void;
};
const ImageUploadContainer: React.FC<Props> = (props: Props) => {
  const { files, setFiles, onRemoveFile } = props;

  return (
    <>
      {files.length > 0 && (
        <ImageList cols={7} gap={8} className="image-list-review">
          {files.map((file: any, index: number) => (
            <ImageListItem key={`image-${index}-${file.lastModified}`}>
              <img
                src={`${file.preview || file.url}`}
                alt={`im-${index}`}
                loading="lazy"
              />
              <div className="uploader-overlay">
                <Icon className="btn-remove" onClick={() => onRemoveFile(file)}>
                  cancel
                </Icon>
              </div>
            </ImageListItem>
          ))}
        </ImageList>
      )}
      <div className="py-md">
        <ImageUploadWidget setFiles={(val) => setFiles(val)} files={files} />
      </div>
    </>
  );
};

export default ImageUploadContainer;
