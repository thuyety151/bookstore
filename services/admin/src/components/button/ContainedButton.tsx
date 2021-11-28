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

const ContainedButton: React.FC<CustomButtonProps> = (props) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      size="small"
      color="primary"
      fullWidth
      className={classes.btn}
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

export default ContainedButton;
