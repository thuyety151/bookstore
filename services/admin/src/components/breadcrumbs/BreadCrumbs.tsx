import { Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import Route from "model/route";
import { routes } from "routers/routes";
import logo from "../../assets/icons/icon-home.png";

export type BreadCrumbsType = {
  label: string;
  path: string;
  current: boolean;
  icon: string;
};

export const sampleData: BreadCrumbsType[] = [
  {
    label: "Coupon",
    path: "./",
    current: false,
    icon: "img/icons/icon-home.png",
  },
];

const BreadCrumbs: React.FC = () => {
  const history = useHistory();
  const currentRoute = routes.find(
    (r: Route) => r.path === history.location.pathname
  );

  const onNavigate = (route: string) => {
    history.push(route);
  };

  return (
    <div className="bread-crumbs">
      <div className="bread-crumbs__contents">
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item style={{ display: "flex", alignItems: "flex-end" }}>
            <img src={logo} alt="icon" />
            {currentRoute?.parents?.map((r: string, index) => (
              <Typography
                key={`item-breadcrumb-${index}`}
                onClick={() => onNavigate(r)}
                className="cursor-pointer"
              >
                {routes.find((route) => route.path === r)?.name || "--"} /{" "}
              </Typography>
            ))}
            <Typography> {currentRoute?.name}</Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default BreadCrumbs;
