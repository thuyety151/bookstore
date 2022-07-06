import { Grid } from "@material-ui/core";
import HeaderPage from "components/headerPage/HeaderPage";
import FilterContainer from "components/table/FilterContainer";
import { AntTab, AntTabs, TabPanel } from "pages/order/OrderPage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "redux/store";
import AddForm from "./components/AddForm";
import CouponTable from "./components/CouponTable";
import EditForm from "./components/EditForm";

const CouponsPage: React.FC = () => {
  const [modelEdit, setModelEdit] = useState(null);
  const [keywords, setKeywords] = useState<string>("");
  const { success } = useSelector((state: RootStore) => state.coupons);
  const [value, setValue] = useState("");

  const onSearch = (keywords: string) => {
    setKeywords(keywords);
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValue(newValue);
  };

  return (
    <div style={{ margin: "0 5rem" }}>
      <HeaderPage title="Coupon" />
      <FilterContainer placeholderSearch="Search by code" onSearch={onSearch} />
      <Grid container justifyContent="space-between" className="pt-md">
        <Grid item xs={7}>
          <AntTabs
            value={value}
            onChange={handleChange}
            aria-label="ant example"
          >
            <AntTab label="All" value="" />
            <AntTab label="Available" value="unExpired" />
            <AntTab label="Expired" value="expired" />
          </AntTabs>
          <TabPanel value={value} key={`order-${value}`}>
            <CouponTable
              setModelEdit={setModelEdit}
              keywords={keywords}
              status={value}
            />
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
