import { GoogleApiWrapper } from "google-maps-react";
import { Grid } from "@material-ui/core";
import Config from "../../config/config";
import GoogleMapReact from "google-map-react";
import "./styles.scss";

export type GoogleMapType = {
  lng: number;
  lat: number;
  google: any;
};

const Marker = (props: any) => (
  <div className="marker">
    <span>We're here</span>
  </div>
);

const GGMap: React.FC<GoogleMapType> = (props) => (
  <Grid container justifyContent="center">
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultZoom={20}
        defaultCenter={{
          lat: props.lat,
          lng: props.lng,
        }}
      >
        <Marker lng={props.lng} lat={props.lat} />
      </GoogleMapReact>
    </div>
  </Grid>
);

// If you want to add a loading container other than the default loading container, simply pass it in the HOC, like so:
export default GoogleApiWrapper({
  apiKey: Config.apiGGMapKey,
})<GoogleMapType>(GGMap);
