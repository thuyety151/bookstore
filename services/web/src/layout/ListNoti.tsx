import {
  Badge,
  Chip,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Snackbar,
  Typography,
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../redux/actions/noti/getActions";
import { readNotis } from "../redux/actions/noti/postActions";
import { RootStore } from "../redux/store";

import "./styles.scss";

const ListNoti: React.FC = () => {
  const { listNoti, pagination } = useSelector(
    (state: RootStore) => state.notis
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!listNoti.length) {
      dispatch(getAll());
    }
  }, [dispatch, listNoti.length]);

  const readNoti = (item: any) => {
    setOpen(false);
    if (item.isRead) {
      return;
    }
    dispatch(readNotis(item.id, false));
  };

  const readAll = () => {
    dispatch(readNotis("", true));
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }} style={{ alignItems: "center" }}>
      <Badge
        badgeContent={pagination.totalCount}
        color="secondary"
        className="mr-md"
        onClick={handleClick}
      >
        <IconButton size="small" color="secondary" className="icon-noti">
          <img src="img/icons/bell.svg" alt="icon-noti" />
        </IconButton>
      </Badge>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Paper className="list-noti">
          <MenuItem className="mt-sm">
            <Chip label="Read all" onClick={readAll} />
          </MenuItem>
          {listNoti.map((item, index) => (
            <MenuItem
              className="list-noti__item"
              style={{
                background: item.isRead ? "#fff" : "aliceblue",
              }}
              onClick={() => readNoti(item)}
              key={`${item.id} ${index}`}
            >
              <Grid container direction="column">
                <Typography variant="subtitle2" style={{ fontWeight: 600 }}>
                  {item.metadata?.title}
                </Typography>
                <Typography variant="caption">
                  {item.metadata?.body?.contents}
                </Typography>
              </Grid>
            </MenuItem>
          ))}
        </Paper>
      </Snackbar>
    </Stack>
  );
};

export default ListNoti;
