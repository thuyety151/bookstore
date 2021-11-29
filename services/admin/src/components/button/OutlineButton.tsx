import {
  Theme,
  createStyles,
  makeStyles,
  ButtonProps,
  Button,
} from "@material-ui/core";

export type CustomButtonProps = {
  props?: ButtonProps;
  text: string;
};

const OutlineButton: React.FC<CustomButtonProps> = (props) => {
  const classes = useStyles();

  return (
    <Button
      variant="outlined"
      size="small"
      color="primary"
      fullWidth
      className={classes.btn}
      style={{ width: "fit-content" }}
      {...props.props}
    >
      {props.text}
    </Button>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {},
  })
);

export default OutlineButton;
