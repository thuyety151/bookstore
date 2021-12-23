import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Order } from "../../../model/order";
import { getAllOrder } from "../../../redux/actions/order/getActions";
import { RootStore } from "../../../redux/store";
import OrderCard from "./OrderCard";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const DeliveryStatus = ["Ready To Pick", "Cancel"];
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

const OrderDashboard: React.FC = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const { requesting, listOrder } = useSelector(
    (state: RootStore) => state.order
  );
  const [loadingCancel, setloadingCancel] = useState(false);

  useEffect(() => {
    dispatch(getAllOrder(DeliveryStatus[value]));
  }, [dispatch, value]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper square elevation={0}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          {DeliveryStatus.map((item) => (
            <Tab key={`tab-${item}`} label={item} />
          ))}
        </Tabs>
        <Divider />
        <Grid container justifyContent="center" alignItems="center">
          {requesting && <CircularProgress disableShrink />}
        </Grid>

        {DeliveryStatus.map((item, index) => (
          <TabPanel key={`tab-panel-${item}`} value={value} index={index}>
            {listOrder.length || requesting ? (
              listOrder.map((order: Order, index) => (
                <div key={`order-render-card-${index}`}>
                  <OrderCard
                    order={order}
                    loadingCancel={loadingCancel}
                    setloadingCancel={setloadingCancel}
                  />
                </div>
              ))
            ) : (
              <Grid container>
                <Typography>No Data</Typography>
              </Grid>
            )}
          </TabPanel>
        ))}
      </Paper>
    </div>
  );
};

export default OrderDashboard;
