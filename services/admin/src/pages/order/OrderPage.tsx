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
import OrderTable from "./OrderTable";
import clsx from "clsx";
import React from "react";

interface StyledTabProps {
  label: string;
  value?: string;
}

export const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#1890ff",
  },
})(Tabs);

export const AntTab = withStyles((theme: Theme) =>
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

export function TabPanel(props: TabPanelProps) {
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

const OrderPage: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [keywords, setKeywords] = React.useState("");
  const onSearch = (e: string) => setKeywords(e);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <HeaderPage title="Orders" />
      <FilterContainer
        onSearch={onSearch}
        placeholderSearch="Search by order code"
      />
      <Grid container className={clsx(classes.actionsContainer, "pt-md")}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="All" value="" />
          <AntTab label="Ready To Pick" value="Ready To Pick" />
          <AntTab label="Cancel" value="Cancel" />
        </AntTabs>
        <TabPanel value={value} key={`order-${value}`}>
          <OrderTable status={value} keywords={keywords} />
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
    actionsContainer: {
      display: "grid",
    },
    title: {
      padding: theme.spacing(2, 0),
    },
  })
);

export default OrderPage;
