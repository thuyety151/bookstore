import { Button, Icon, Menu, MenuItem, Typography } from "@material-ui/core";
import { useState } from "react";
import "./styles.scss";

const ActionMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const recordButtonPosition = (event: any) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };
  return (
    <div className="action-menu">
      <Button className="btn-outlined" onClick={recordButtonPosition}>
        <Typography className="px-md">Action</Typography>
        <Icon>keyboard_arrow_down</Icon>
        <div></div>
      </Button>
      <Menu
        elevation={2}
        open={menuOpen}
        keepMounted
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        style={{ marginTop: 56 }}
      >
        <MenuItem>
          <Icon className="mr-md">edit</Icon>
          <Typography>Profile</Typography>
        </MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ActionMenu;
