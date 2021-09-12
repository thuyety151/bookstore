import { List, ListItem, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import data from "../../mocks/sidebar";
import { ISideBarChildren } from "../../model/sidebar";

const ChildSideBarComponent: React.FC<{
  idCategory: string;
  closeSideBar: any;
}> = ({ idCategory, closeSideBar }) => {
  const dataRender: any = data.find((item) => item.id === idCategory);
  const classes = useStyles();
  return (
    <div>
      <List style={{ paddingTop: 0 }}>
        {dataRender.children.map((item: ISideBarChildren, index: number) => (
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
