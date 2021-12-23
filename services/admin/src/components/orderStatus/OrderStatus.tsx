import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import ContainedButton from "../button/ContainedButton";
import clsx from "clsx";

export enum OrderStatusEnum {
  ReadyToPick = "Ready to pick",
  Delivered = "Delivered",
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
          status === OrderStatusEnum.Delivered ? "delivered" : "ready-to-pick"
        )}
      >
        <ContainedButton
          text={orderStatusOptions.find((x) => x === status) || "--"}
          props={{
            disabled: status === OrderStatusEnum.ReadyToPick,
          }}
        />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "fit-content",
      "& .delivered ": {
        "& .MuiButton-containedPrimary": {
          backgroundColor: "#c9d7e1",
          color: "#4b5f6e",
        },
      },
      "& .ready-to-pick": {
        "& .MuiButton-containedPrimary": {
          backgroundColor: "#e5e5e5",
          color: "#8b8b8b",
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
