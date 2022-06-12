import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Grid, Paper, Typography } from "@material-ui/core";

export type NotiContent = {
  type: string;
  orderCode: string;
  orderId: string;
  contents: string;
  title: string;
};

export type FloatNotiProps = {
  model: NotiContent | null;
  setModel: (value: any) => void;
};

const FloatNoti: React.FC<FloatNotiProps> = (props) => {
  const [open, setOpen] = React.useState(!!props.model?.type);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    props.setModel(null);
  };

  React.useEffect(() => {
    console.log("asdasdsadsdadhuhu", props);
    setOpen(!!props.model?.type);
  }, [props.model]);

  return (
    <Stack spacing={2} sx={{ width: "100%" }} style={{ alignItems: "center" }}>
      <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Paper>
          <Alert onClose={handleClose} severity="info">
            <AlertTitle>{props.model?.orderId}</AlertTitle>
            {props.model?.orderCode}
          </Alert>
        </Paper>
      </Snackbar>
      <Paper>
        <Alert severity="error">This is an error message!</Alert>
      </Paper>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert>
    </Stack>
  );
};

export default FloatNoti;
