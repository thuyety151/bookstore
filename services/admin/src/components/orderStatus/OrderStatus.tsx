import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import ContainedButton from "../button/ContainedButton";
import clsx from "clsx";

export enum OrderStatusEnum {
  ReadyToPick = "Ready to pick",
  Delivered = "Delivered",
  Cancel = "Cancel",
}

export const orderStatusOptions = ["Ready to pick", "Cancel"];
// export const orderStatusOptions = [
//   // {
//   //   id: "delivered",
//   //   value: "Delivered",
//   // },
//   {
//     id: "ready-to-pick",
//     value: "Ready to pick",
//   },
//   {
//     id: "cancel",
//     value: "Cancel",
//   },
//   // {
//   //   id: "undefined",
//   //   value: "--",
//   // },
// ];

const OrderStatus: React.FC<{ status: string }> = ({ status }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div
        className={clsx(
          status === OrderStatusEnum[OrderStatusEnum.Cancel]
            ? "cancel"
            : "ready-to-pick"
        )}
      >
        <ContainedButton
          text={orderStatusOptions.find((x) => x === status) || "--"}
          disabled={status === OrderStatusEnum.ReadyToPick}
          style={{ borderRadius: "16px", padding: "0 10px" }}
        />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "fit-content",
      "& .cancel ": {
        "& .MuiButton-containedPrimary": {
          backgroundColor: "#faded7 ",
          color: "#e13610",
        },
      },
      "& .ready-to-pick": {
        "& .MuiButton-containedPrimary": {
          backgroundColor: "#e2edfe",
          color: "#639dfa",
        },
      },
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
  })
);
export default OrderStatus;
