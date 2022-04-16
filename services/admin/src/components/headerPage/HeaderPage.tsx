import { Divider, Typography } from "@material-ui/core";
import BreadCrumbs from "components/breadcrumbs/BreadCrumbs";
import "./styles.scss";

const HeaderPage: React.FC<{ title: string }> = (props) => {
  return (
    <div className="header-page mb-sm">
      <Typography className="page-name">{props.title}</Typography>
      <Divider />
      <div className="border-underline mb-sm"></div>
      <BreadCrumbs />
    </div>
  );
};

export default HeaderPage;
