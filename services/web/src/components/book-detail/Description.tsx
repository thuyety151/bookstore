import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Box,
  createStyles,
  Divider,
  Tab,
  Tabs,
  Theme,
} from "@material-ui/core";
import { RootStore } from "../../redux/store";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 500,
    },
    rootAppBar: {
      flexGrow: 1,
    },
    tab: {
      padding: "50px 250px 20px 250px",
      [theme.breakpoints.down("sm")]: {
        padding: 10,
      },
    },
    text: {
      color: "#000000",
      "&:hover": {
        cursor: "pointer",
      },
    },
    textDes: {
      textAlign: "justify",
    },
  })
);

export default function Types() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const { data } = useSelector((state: RootStore) => state.book);

  return (
    <div className={classes.rootAppBar}>
      <AppBar id="/description" position="static" color="default">
        <Tabs
          centered
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Description" href="/description" />
          <Tab
            label="Product Details"
            href="/detail"
            disabled
            className={classes.text}
          />
          <Tab label="Reviews" href="/review" disabled />
        </Tabs>
        <Divider />
      </AppBar>
      <Box p={3} className={classes.tab}>
        <div
          dangerouslySetInnerHTML={{ __html: data?.description || "<p></p>" }}
        />
      </Box>
    </div>
  );
}
