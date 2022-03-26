import { Typography } from "@material-ui/core";
import "./styles.scss"

export type BreadCrumbsType = {
  label: string;
  path: string;
    current: boolean;
    icon: string;
}

export const sampleData: BreadCrumbsType[] = [
  {
    label: "Coupon",
    path: "./",
    current: false,
    icon: "img/icons/icon-home.png",
  },
];

const BreadCrumbs: React.FC = () => {
    return (
      <div className="bread-crumbs">
        <div className="bread-crumbs__contents">
          {sampleData.map((item,index) => (
            <>
              {item.icon && <img src={item.icon} alt="bread-crumbs-icon" />}
                  <Typography> {item.label}</Typography>
                  {index >0 && index === sampleData.length - 1 &&
                  <Typography>/</Typography>}
            </>
          ))}
        </div>
      </div>
    );
}

export default BreadCrumbs;