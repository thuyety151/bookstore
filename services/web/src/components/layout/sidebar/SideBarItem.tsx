import { List, ListItem, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generatePath, useHistory } from "react-router-dom";
import { SidebarCategoryResponse } from "../../../model/category";
import { getSub } from "../../../redux/actions/category/getAction";
import { RootStore } from "../../../redux/store";
import { ROUTE_BOOKS_FOR_SALE } from "../../../routers/types";

const ChildSideBarComponent: React.FC<{
  idCategory: string;
  handleChildNavigate: any;
}> = ({ idCategory, handleChildNavigate }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const data: SidebarCategoryResponse | null = useSelector(
    (state: RootStore) => state.category.data.sub
  );

  useEffect(() => {
    dispatch(
      getSub({
        idCategory,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCategory]);

  const handleClickItem = (item: SidebarCategoryResponse) => {
    if (item.subTotal > 0) {
      dispatch(
        getSub({
          idCategory: item.id,
        })
      );
    } else {
      if (window.location.pathname.includes("books-for-sale")) {
        window.location.reload();
      }
      handleChildNavigate();
      history.push({
        pathname: generatePath(ROUTE_BOOKS_FOR_SALE, {
          predicate: "popular",
        }),
        state: {
          categoryId: item.id,
        },
      });
    }
  };
  return (
    <div>
      <List style={{ paddingTop: 0 }}>
        {data
          ? data.subCategories?.map((item: any, index: number) => (
              <ListItem
                button
                key={index}
                onClick={() => handleClickItem(item)}
                // onClick={closeSideBar}
                className={classes.item}
              >
                <span>{item.name}</span>
              </ListItem>
            ))
          : null}
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
