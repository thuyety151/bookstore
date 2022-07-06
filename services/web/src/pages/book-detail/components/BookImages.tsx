import { Grid, ImageListItem, Typography } from "@material-ui/core";
import Media from "../../../model/media";
import "./styles.scss";
import "viewerjs/dist/viewer.css";
import Viewer from "viewerjs";
import { useState } from "react";

const BookImages: React.FC<{ images: Media[] }> = (props) => {
  const [selected, setSelected] = useState(0);

  const onChange = (index: number) => {
    setSelected(index);
  };

  const onViewDetail = () => {
    const gallery = new Viewer(
      document.getElementById("image") || new HTMLElement(),
      {
        inline: false,
        toolbar: false,
        transition: false,
        viewed() {
          gallery.zoom(0.5).zoomTo(0.5);
        },
        hide() {
          gallery.destroy();
        },
        shown() {
          gallery.view(selected);
        },
      }
    );
    gallery.show();
  };

  return (
    <Grid direction="column" className="book-images-container">
      <div id="image" hidden>
        {props.images.map((media, index) => (
          <div key={index}>
            <img src={media.url} alt={`none-${index}`} />
          </div>
        ))}
      </div>
      <Grid item id="viewer" onClick={onViewDetail}>
        <ImageListItem>
          <img src={props.images[selected].url} alt="selected" />
        </ImageListItem>
      </Grid>
      {props.images.length > 0 && (
        <Grid item className="others">
          {props.images.map((img: Media, index) => (
            <img
              id={`img-${index}`}
              onClick={() => onChange(index)}
              className={index === selected ? "selected" : ""}
              key={`child-img-${index}`}
              src={img.url}
              alt={`book-media-${index}`}
            />
          ))}
          {props.images.length > 4 && (
            <div className="more" id="view-all" onClick={onViewDetail}>
              <img src={props.images[4].url} alt="last" />
              {props.images.length > 5 && (
                <div className="overlay">
                  <Typography>See all {props.images.length} images</Typography>
                </div>
              )}
            </div>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default BookImages;
