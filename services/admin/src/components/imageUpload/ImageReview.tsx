import { Button, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addPhoto } from "redux/actions/media/postAction";
import ImageUploadWidget from "./ImageUploadWidget";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles({
  media: {
    height: 350,
  },
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
  }
});

export default function ImageReview() {
  const classes = useStyles();
  const [files, setFiles] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      files.forEach((file: any) => {
        URL.revokeObjectURL(file.preview);
        console.log("efefe" + file);
      });
    };
  }, [files]);

  function handleImageUpload(file : Blob){
      console.log(file);
      dispatch(addPhoto({
          file: file,
          onSuccess: () => {},
          onFailure: () => {}
      }));
  }

  function handleCancelImage(){
      setFiles([]);
  }
  return (
    <div>
      {files && files.length > 0 ? (
        <>
          <img className={classes.media} src={files[0].preview} alt="Book" />
          <Button size="small" className={classes.remove} onClick={() => handleCancelImage()}>
            <DeleteIcon/>
          </Button>
          <Button size="small" className={classes.update} onClick={() => handleImageUpload(files[0])}>
            <SaveIcon/>
          </Button>
        </>
      ) : (
        <ImageUploadWidget setFiles={setFiles} />
      )}
    </div>
  );
}
