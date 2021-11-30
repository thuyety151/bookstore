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
  changeImage: (image : any) => void;
}
export default function ProductImage({ media, changeImage }: Props) {
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
    dispatch(
      addPhoto({
        file: file,
        onSuccess: () => {
          changeImage(new Array(1).fill(data));
          setAddPhotoMode(false);
          setNewPhoto(true);
        },
        onFailure: () => {},
      })
    );
   
  }

  function handleDeleteImage() {
    dispatch(
      deletePhoto({
        id: data.id,
        onSuccess: () => {
          setAddPhotoMode(true);
        },
        onFailure: () => {},
      })
    );
   
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
