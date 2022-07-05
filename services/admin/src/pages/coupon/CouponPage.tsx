import { Grid, Theme,
  createStyles,
  makeStyles,
  Tab,
  withStyles,
  Tabs, } from "@material-ui/core";
import HeaderPage from "components/headerPage/HeaderPage";
import FilterContainer from "components/table/FilterContainer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "redux/store";
import AddForm from "./components/AddForm";
import CouponTable from "./components/CouponTable";
import EditForm from "./components/EditForm";

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


const CouponsPage: React.FC = () => {
  const [modelEdit, setModelEdit] = useState(null);
  const { success } = useSelector((state: RootStore) => state.coupons);
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValue(newValue);
  };
  return (
    <div style={{ margin: "0 5rem" }}>
      <HeaderPage title="Coupon" />
      <FilterContainer />
      <Grid container justifyContent="space-between" className="pt-md">
        <Grid item xs={7}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Unexpired" value="unExpired" />
          <AntTab label="Expired" value="expired" />
        </AntTabs>
        <TabPanel value={value} key={`coupon-${value}`}>
          <CouponTable setModelEdit={setModelEdit} status={value} />
        </TabPanel>
        </Grid>
        <Grid item xs={4} key={Number(success)}>
          <AddForm />
        </Grid>
        <Grid item xs={12}>
          <EditForm model={modelEdit} setModel={setModelEdit} />
        </Grid>
      </Grid>
    </div>
  );
};

export default CouponsPage;
