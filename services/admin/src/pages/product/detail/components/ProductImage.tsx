import { Button, makeStyles } from "@material-ui/core";
import ImageReview from "components/imageUpload/ImageReview";
import { Media } from "model/media";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPhoto, deletePhoto } from "redux/actions/media/postAction";
import { RootStore } from "redux/store";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  remove: {
    color: "white",
    backgroundColor: "#b32d2e",
    padding: "5px 80px",
    borderRadius: "5px",
    margin: "0px 30px"
  },
  container: {
    width: 250,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
interface Props {
  media: Media[];
}
export default function ProductImage({ media }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { data } = useSelector((state: RootStore) => state.media);
  const [addPhotoMode, setAddPhotoMode] = useState(true);
  const [isNewPhoto, setNewPhoto] = useState(false);
  const initMedia: Media = {
    id: "",
    name: "",
    isMain: true,
    isVideo: false,
    url: ""
  };
  const [mediaMain, setMediaMain] = useState(initMedia);

  console.log("media 1:  " + mediaMain.url);
  useEffect(() => {
    setAddPhotoMode((media && media.length > 0) ? false: true);
    if(!isNewPhoto){
      setMediaMain((media && media.length > 0) ? media[0] : initMedia);
    }
    else{
      setMediaMain(data);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[media, data]);

  function handleImageUpload(file: Blob) {
    console.log(file);
    dispatch(
      addPhoto({
        file: file,
        onSuccess: () => {},
        onFailure: () => {},
      })
    );
    setAddPhotoMode(false);
    setNewPhoto(true);
  }

  function handleDeleteImage() {
    dispatch(
      deletePhoto({
        id: data.id,
        onSuccess: () => {},
        onFailure: () => {},
      })
    );
    setAddPhotoMode(true);
  }

  return (
    <>
      {addPhotoMode ? (
        <ImageReview uploadImage={handleImageUpload} />
      ) : (
        <div className={classes.container}>
          <img className={classes.image} src={mediaMain.url} alt="Book" />
          <Button
            size="small"
            className={classes.remove}
            onClick={() => handleDeleteImage()}
          >
           <DeleteIcon/>
          </Button>
        </div>
      )}
    </>
  );
}
