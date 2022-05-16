import { Button, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import ImageUploadWidget from "./ImageUploadWidget";

const useStyles = makeStyles({
  remove: {
    color: "white",
    backgroundColor: "#b32d2e",
    padding: "5px 10px",
    borderRadius: "5px",
    margin: "5px 10px",
  },
  update: {
    color: "white",
    backgroundColor: "#32CD32",
    padding: "5px 30px",
    borderRadius: "5px",
    margin: "5px 10px",
  },
  container: {
    // width: 250,
    display: "grid",
    justifyContent: "center",
  },
  image: {
    // height: "100%",
    // width: "100%",
    justifySelf: "center",
    height: "15rem",
    width: "auto",
  },
});

interface Props {
  uploadImage: (file: Blob) => void;
}
export default function ImageReview({ uploadImage }: Props) {
  const classes = useStyles();
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    return () => {
      files.forEach((file: any) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  function onUpload(file: Blob) {
    uploadImage(file);
  }
  function handleCancelImage() {
    setFiles([]);
  }
  return files && files.length > 0 ? (
    <div className={classes.container}>
      <img className={classes.image} src={files[0].preview} alt="Book" />
      <div>
        <Button
          size="small"
          className={classes.remove}
          onClick={() => handleCancelImage()}
        >
          Change other
        </Button>
        <Button
          size="small"
          className={classes.update}
          onClick={() => onUpload(files[0])}
        >
          Upload
        </Button>
      </div>
    </div>
  ) : (
    <ImageUploadWidget setFiles={setFiles} files={files} />
  );
}
