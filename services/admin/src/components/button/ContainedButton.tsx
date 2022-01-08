import {
  Theme,
  createStyles,
  makeStyles,
  ButtonProps,
  Button,
  CircularProgress,
} from "@material-ui/core";

export type CustomButtonProps = {
  props?: ButtonProps;
  text: string;
  loading?: boolean;
};

const ContainedButton: React.FC<
  { text: string; loading?: boolean } & ButtonProps
> = (props) => {
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
      {props.loading ? <CircularProgress size="20px" /> : props.text}
    </Button>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {},
  })
);

export default ContainedButton;
