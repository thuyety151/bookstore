import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import "./styles.scss";

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
    <div className="dialog-confirm ">
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="dialog-confirm__title">
          {props.title}
        </DialogTitle>
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
      </Dialog>
    </div>
  );
};

export default DialogConfirm;
