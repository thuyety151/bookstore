/** @format */

import { List, ListItem, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
// import data from "../../../mocks/sidebar";
// import { SideBarItem } from "../../../model/category";
// import { ISideBarChildren } from "../../../model/sidebar";
// import { getSub } from "../../../redux/actions/category/getAction";
import { RootStore } from "../../../redux/store";

const ChildSideBarComponent: React.FC<{
  idCategory: string;
  closeSideBar: any;
}> = ({ idCategory, closeSideBar }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const data = useSelector((state: RootStore) => state.category.data);
  console.log(idCategory)
  // const [loading, setLoading] = useState(true);

  // const { dataa, onSuccess }: any = dispatch(
  //   getSub({
  //     idCategory,
  //     onSuccess: (response: any) => {
  //       console.log("onSuccess", response);
  //     },
  //   })
  // );

  // console.log("dataa", dataa, onSuccess);
  // useEffect(() => {
  //   console.log("effect");
  // }, [dataa]);

  return (
    <div>
      <List style={{ paddingTop: 0 }}>
        {data?.subCategories?.map((item: any, index: number) => (
          <ListItem
            button
            key={index}
            onClick={closeSideBar}
            className={classes.item}
          >
            <span>{item.name}</span>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
const useStyles = makeStyles((theme: Theme) => ({
  item: {
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
}));

export default ChildSideBarComponent;
