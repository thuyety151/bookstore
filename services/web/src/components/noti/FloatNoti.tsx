import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Paper } from "@material-ui/core";

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
    setOpen(!!props.model?.type);
  }, [props.model]);

  return (
    <Stack spacing={2} sx={{ width: "100%" }} style={{ alignItems: "center" }}>
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
    </Stack>
  );
};

export default FloatNoti;
