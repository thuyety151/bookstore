import { Avatar, Button, Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { userService } from "service/auth.service";

const MenuAccount: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const history = useHistory();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const location = useLocation();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    userService.logout();
    history.push(location.pathname);
  };
  return (
    <>
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Avatar
            // alt="Remy Sharp"
            src="data:image/jpeg;base64,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"
          />
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default MenuAccount;
