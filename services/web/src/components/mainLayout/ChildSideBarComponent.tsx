import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import data from "../../mocks/sidebar";
import { ISideBarChildren } from "../../model/sidebar";

const ChildSideBarComponent: React.FC<{
  idCategory: string;
  closeSideBar: any;
}> = ({ idCategory, closeSideBar }) => {
  const dataRender: any = data.find((item) => item.id === idCategory);

  console.log("dataRender", dataRender, dataRender.children);
  return (
    <div>
      <List style={{ paddingTop: 0 }}>
        {dataRender.children.map((item: ISideBarChildren, index: number) => (
          <ListItem button key={index} onClick={closeSideBar}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
export default ChildSideBarComponent;
