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
  loading?: any;
};

const ContainedButton: React.FC<
  { text: string; loading?: any } & ButtonProps
> = (props) => {
  const classes = useStyles();
  // to remove loading out of props. loading create warning cause it is valid HTML attribute
  const { loading, ...btnProps } = props;

  return (
    <Button
      variant="contained"
      size="small"
      color="primary"
      fullWidth
      className={classes.btn}
      {...btnProps}
      disableElevation
    >
      {Boolean(props.loading) && typeof props.loading !== "undefined" ? (
        <CircularProgress size="20px" />
      ) : (
        props.text
      )}
    </Button>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {},
  })
);

export default ContainedButton;
