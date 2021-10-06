import React from "react";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

const NegativeAlert: React.FC<{ message: string | null }> = ({ message }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert severity="error">{message}</Alert>
    </Snackbar>
  );
};

export default NegativeAlert;
