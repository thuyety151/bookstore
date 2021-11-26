import {
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  media: {
    height: 350,
  },
  remove: {
    color: "white",
    backgroundColor: "#b32d2e",
    padding: "5px 80px",
    borderRadius: "5px",
    margin: "5px 10px"
  }
});
interface Props {
  imageUrl: string;
}
export default function ProductImage({ imageUrl }: Props) {
  const classes = useStyles();

  return (
    <div>
      <img className={classes.media} src={imageUrl} alt="Book" />
      <Button size="small" className={classes.remove}>
        Remove
      </Button>
    </div>
  );
}
