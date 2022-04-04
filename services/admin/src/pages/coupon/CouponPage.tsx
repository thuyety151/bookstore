import { Grid, Typography } from "@material-ui/core";
import HeaderPage from "components/headerPage/HeaderPage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "redux/store";
import AddForm from "./components/AddForm";
import CouponTable from "./components/CouponTable";
import EditForm from "./components/EditForm";

const CouponsPage: React.FC = () => {
  const [modelEdit, setModelEdit] = useState(null);
  const { success } = useSelector((state: RootStore) => state.coupons);
  return (
    <div>
      <HeaderPage title="Coupon" />
      <Typography
        variant="h5"
        style={{ padding: "16px 0px", paddingLeft: "36px" }}
      >
        Coupons
      </Typography>
      <Grid container justifyContent="space-around">
        <Grid item xs={7}>
          <CouponTable setModelEdit={setModelEdit} />
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
