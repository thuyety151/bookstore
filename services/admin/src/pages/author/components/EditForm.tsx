import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import AddForm from "./AddForm";
import { Grid } from "@material-ui/core";
import { Author } from "model/author";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return (
    <Slide direction="left" ref={ref} {...props} style={{ width: "50%" }} />
  );
});

export type EditAuthorProps = {
  model: Author | null;
  setModel: any;
};
const EditForm: React.FC<EditAuthorProps> = (props) => {
  const classes = useStyles();

  const handleClose = () => {
    props.setModel(null);
  };

  return (
    <div style={{ width: "100%" }}>
      <Dialog
        fullScreen
        open={!!props.model}
        onClose={handleClose}
        TransitionComponent={Transition}
        style={{ display: "flex", justifyContent: "end" }}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              style={{ color: "#000" }}
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit Author
            </Typography>
          </Toolbar>
        </AppBar>
        <Divider />
        <Grid className={classes.form} item xs={6}>
          <AddForm model={props.model} />
        </Grid>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
      backgroundColor: "#fff",
      "& .MuiPaper-elevation4": {
        boxShadow: "none",
      },
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      color: "#000",
    },
    form: {
      padding: theme.spacing(4),
    },
  })
);

export default EditForm;
