import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

export type DialogProps = {
  modelId: string | null;
  title: string;
  message: string;
  loading: boolean;
  handleClose: () => void;
  onConfirm: () => void;
};

const DialogConfirm: React.FC<DialogProps> = (props) => {
  const { handleClose, onConfirm } = props;
  return (
    <div>
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          {props.loading ? <CircularProgress size="20px" /> : "OK"}
        </Button>
      </DialogActions>
    </div>
  );
};

export default DialogConfirm;
