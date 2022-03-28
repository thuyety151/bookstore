import { Divider, Typography } from "@material-ui/core";
import BreadCrumbs from "components/breadcrumbs/BreadCrumbs";
import "./styles.scss";

const HeaderPage: React.FC = () => {
  return (
    <div className="header-page">
      <Typography className="page-name">Dashboard</Typography>
      <Divider />
      <div className="border-underline"></div>
      <BreadCrumbs />
    </div>
  );
};

export default HeaderPage;
