import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { Grid } from "@material-ui/core";
import Config from "../../config/config";

export type GoogleMapType = {
  lng: number;
  lat: number;
  google: any;
};

const GGMap: React.FC<GoogleMapType> = (props) => (
  <Grid container justifyContent="center">
    <Map
      google={window.google}
      zoom={20}
      style={{
        width: "100%",
      }}
      initialCenter={{ lat: props.lat, lng: props.lng }}
    >
      <Marker position={{ lat: props.lat, lng: props.lng }} />
    </Map>
  </Grid>
);

// If you want to add a loading container other than the default loading container, simply pass it in the HOC, like so:
export default GoogleApiWrapper({
  apiKey: Config.apiGGMapKey,
})<GoogleMapType>(GGMap);
