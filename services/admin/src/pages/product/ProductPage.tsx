import {
  Grid,
  Theme,
  createStyles,
  makeStyles,
  Tab,
  withStyles,
  Tabs,
} from "@material-ui/core";
import HeaderPage from "components/headerPage/HeaderPage";
import FilterContainer from "components/table/FilterContainer";
import { generatePath, useHistory } from "react-router-dom";
import { ROUTE_PRODUCT_ADD } from "routers/types";
import ProductTable from "./ProductTable";
import clsx from "clsx";
import React from "react";

interface StyledTabProps {
  label: string;
  value?: string;
}

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#1890ff",
  },
})(Tabs);

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      minWidth: 72,
      marginRight: theme.spacing(4),
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:hover": {
        color: "#40a9ff",
        opacity: 1,
      },
      "&$selected": {
        color: "#1890ff",
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&:focus": {
        color: "#40a9ff",
      },
    },
    selected: {},
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface TabPanelProps {
  children?: React.ReactNode;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`vertical-tabpanel-${value}`}
      aria-labelledby={`vertical-tab-${value}`}
      {...other}
    >
      {children}
    </div>
  );
}

const ProductPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValue(newValue);
  };

  const onAdd = () => {
    history.push(generatePath(ROUTE_PRODUCT_ADD));
  };

  return (
    <div className={classes.root}>
      <HeaderPage title="Products" />
      <FilterContainer onAdd={onAdd} />
      <Grid container className={clsx(classes.actionsContainer, "pb-lg mt-md")}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="All" value="" />
          <AntTab label="In Stock" value="InStock" />
          <AntTab label="Out Of Stock" value="OutOfStock" />
        </AntTabs>
        <TabPanel value={value} key={`product-${value}`}>
          <ProductTable status={value} />
        </TabPanel>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "0 5rem",
    },
    actionsContainer: {},
    title: {
      padding: theme.spacing(2, 0),
    },
  })
);

export default ProductPage;
