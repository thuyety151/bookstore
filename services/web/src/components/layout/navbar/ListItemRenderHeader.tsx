import React from "react";
import { HeaderTypes } from "../../../model/navbar";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";
import { Box, Collapse, List, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ROUTE_HOME } from "../../../routers/types";

const headerItems: HeaderTypes[] = [
  {
    name: "Home",
    isShow: false,
    path: ROUTE_HOME,
  },
  {
    name: "Categories",
    isShow: false,
    path: "/category",
    child: [
      { id: "1", name: "Category 1", path: "" }, // can remove path if child.path = {parent.path}+id
      { id: "2", name: "Category 2", path: "" },
    ],
  },
  {
    name: "Shop",
    isShow: false,
    path: "/shop",
    child: [
      { id: "1", name: "Shop 1", path: "" },
      { id: "2", name: "Shop 2", path: "" },
    ],
  },
  {
    name: "Blogs",
    isShow: false,
    path: "/blogs",
    child: [
      { id: "1", name: "Blog 1", path: "" },
      { id: "2", name: "Blog 2", path: "" },
    ],
  },
  {
    name: "Others",
    isShow: false,
    path: "/others",
    child: [
      { id: "1", name: "Other 1", path: "" },
      { id: "2", name: "Other 2", path: "" },
    ],
  },
];
const ListItemRender: React.FC = () => {
  const classes = useStyles();
  // to re-render
  const [render, setRender] = React.useState(false);
  const history = useHistory();
  const handleMouseOver = (index: number): void => {
    headerItems.forEach((item, id) => {
      if (id !== index) {
        item.isShow = false;
      } else {
        item.isShow = true;
      }
    });
    setRender(!render);
  };
  const handleMouseOut = (): void => {
    headerItems.forEach((item) => {
      item.isShow = false;
    });
    setRender(!render);
  };
  const headers: any = headerItems.map((item, index) => {
    return (
      <div key={index}>
        {typeof item.child === "undefined" ? (
          <div>
            <ListItem
              button
              onMouseOver={() => handleMouseOver(index)}
              onMouseOut={() => handleMouseOut()}
              className={classes.headerItem}
              onClick={() => {
                history.push(`${item.path}`);
              }}
            >
              <span>{item.name}</span>
            </ListItem>
          </div>
        ) : (
          <div>
            <div>
              <ListItem
                button
                onMouseOver={() => handleMouseOver(index)}
                onMouseOut={() => handleMouseOut()}
                className={classes.headerItem}
              >
                <span>{item.name}</span>
                {item.isShow ? (
                  <ExpandLess className={classes.iconExpand} />
                ) : (
                  <ExpandMore className={classes.iconExpand} />
                )}
              </ListItem>
            </div>
            <div
              onMouseOver={() => handleMouseOver(index)}
              onMouseOut={() => handleMouseOut()}
            >
              <Collapse
                in={item.isShow}
                timeout={300}
                className={classes.headerExpandContainer}
              >
                <Box border={1}>
                  <List component="div" disablePadding>
                    {item.child.map((child) => {
                      return (
                        <ListItem
                          button
                          className={classes.item}
                          key={child.name}
                          onClick={() => {
                            history.push(`${item.path}/${child.id}`); // child's path
                          }}
                        >
                          {child.name}
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              </Collapse>
            </div>
          </div>
        )}
      </div>
    );
  });
  return headers;
};

export default ListItemRender;
const useStyles = makeStyles((theme: Theme) => ({
  headerExpandContainer: {
    position: "absolute",
    top: "4rem",
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: "4px",
    display: "content",
    width: "10rem",
  },
  headerItem: {
    color: "black",
    fontSize: 17,
    // fontWeight: 500,
    "&:hover": {
      color: "red",
    },
  },
  item: {
    color: "black",
    padding: theme.spacing(2, 4),
  },
  iconExpand: {
    fontSize: "1rem",
    padding: theme.spacing(0, 1), // = 8 * 2
  },
}));
