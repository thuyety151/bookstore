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

const ContainedButton: React.FC<{ text: string } & ButtonProps> = (props) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      size="small"
      color="primary"
      fullWidth
      className={classes.btn}
      {...props}
      disableElevation
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
