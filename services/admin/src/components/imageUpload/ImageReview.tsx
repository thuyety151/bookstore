import { Button, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addPhoto } from "redux/actions/media/postAction";
import ImageUploadWidget from "./ImageUploadWidget";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles({
  remove: {
    color: "white",
    backgroundColor: "#b32d2e",
    padding: "5px 40px",
    borderRadius: "5px",
    margin: "5px 10px",
  },
  update: {
    color: "white",
    backgroundColor: "#32CD32",
    padding: "5px 40px",
    borderRadius: "5px",
    margin: "5px 10px",
  },
  container: {
    width: 250,
  },
  image: {
    height: '100%',
    width: '100%'
  }
});

interface Props {
  uploadImage: (file :Blob) =>void;
}
export default function ImageReview({uploadImage} : Props) {
  const classes = useStyles();
  const [files, setFiles] = useState<any>([]);
  
  useEffect(() => {
    return () => {
      files.forEach((file: any) => {
        URL.revokeObjectURL(file.preview);
        console.log("efefe" + file);
      });
    };
  }, [files]);

  function onUpload(file: Blob){
    uploadImage(file)
  }
  function handleCancelImage(){
      setFiles([]);
  }
  return (
    <div className ={classes.container}>
      {files && files.length > 0 ? (
        <>
          <img className={classes.image} src={files[0].preview} alt="Book" />
          <Button size="small" className={classes.remove} onClick={() => handleCancelImage()}>
            <DeleteIcon/>
          </Button>
          <Button size="small" className={classes.update} onClick={() => onUpload(files[0])}>
            <CloudUploadIcon/>
          </Button>
        </>
      ) : (
        <ImageUploadWidget setFiles={setFiles} />
      )}
    </div>
  );
}
