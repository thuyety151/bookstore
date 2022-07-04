import { Grid, Typography } from "@material-ui/core";
import GGMap from "../../components/map/GGMap";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../redux/store";
import { useEffect } from "react";
import { getShopLocation } from "../../redux/actions/shopLocation/getActions";

const Location: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootStore) => state.shopLocation);

  useEffect(() => {
    dispatch(getShopLocation());
  }, [dispatch]);

  return (
    <div style={{ height: "110vh" }}>
      <Grid container justifyContent="center" style={{ padding: "28px" }}>
        <Grid item>
          <LocationOnOutlinedIcon />
        </Grid>
        <Grid item>
          <Typography>{data?.FullAddress}</Typography>
        </Grid>
      </Grid>
      <GGMap lat={data?.Latitude || 0} lng={data?.Longitude || 0} />
    </div>
  );
};

export default Location;
