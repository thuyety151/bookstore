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
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, useHistory } from "react-router-dom";
import { getAll } from "redux/actions/noti/getActions";
import { readNotis } from "redux/actions/noti/postActions";
import { RootStore } from "redux/store";
import { ROUTE_ORDER_DETAIL } from "routers/types";
import "./styles.scss";
import bell from "assets/icons/bell.svg";

const ListNoti: React.FC = () => {
  const { listNoti, unread } = useSelector((state: RootStore) => state.notis);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const history = useHistory();

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
    if (item?.metadata.body.orderId) {
      history.push(
        generatePath(ROUTE_ORDER_DETAIL, {
          orderId: item?.metadata.body.orderId,
        })
      );
    }
    if (item?.isRead) {
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
        badgeContent={unread > 0 ? unread : null}
        color="secondary"
        className="mr-md"
        onClick={handleClick}
      >
        <IconButton size="small" color="secondary" className="icon-noti">
          <img src={bell} alt="icon-noti" />
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
          <Grid container>
            {listNoti.length > 0 ? (
              listNoti.map((item, index) => (
                <MenuItem
                  className="list-noti__item"
                  style={{
                    background: item?.isRead ? "#fff" : "aliceblue",
                  }}
                  onClick={() => readNoti(item)}
                  key={`${item?.id} ${index}`}
                >
                  <Grid container direction="column">
                    <Typography variant="subtitle2" style={{ fontWeight: 600 }}>
                      {item?.metadata?.title}
                    </Typography>
                    {!item?.isCustom && (
                      <Typography variant="caption">
                        {item?.metadata?.body?.contents}
                      </Typography>
                    )}
                    <Typography variant="caption" style={{ color: "gray" }}>
                      {format(new Date(item?.createdDate), "HH:mm dd/MM/yyyy")}
                    </Typography>
                  </Grid>
                </MenuItem>
              ))
            ) : (
              <Grid style={{ padding: "0 2rem" }}>
                <Typography>Empty</Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Snackbar>
      {/* <Dialog
        fullScreen
        open={!!modelDetail}
        onClose={() => setModelDetail(null)}
        style={{ display: "flex", justifyContent: "end", width: "100%" }}
      >
        <Paper style={{ width: "40vw" }} elevation={0}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                style={{ color: "#000" }}
                onClick={() => setModelDetail(null)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Notification
              </Typography>
            </Toolbar>
          </AppBar>
          <Divider />
          <Grid container className={classes.form}>
            <Grid container justifyContent="space-between">
              <Typography>Title:</Typography>
              <Typography>{modelDetail?.metadata?.title}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography>Subtitle:</Typography>
              <Typography>{modelDetail?.metadata?.body?.subtitle}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography>Users:</Typography>
              <Typography>{modelDetail?.count}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography>Created At:</Typography>
              <Typography>
                {modelDetail?.createdDate &&
                  format(
                    new Date(modelDetail?.createdDate),
                    "HH:mm dd/MM/yyyy"
                  )}
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography>Contents:</Typography>
              <Typography>
                <div
                  dangerouslySetInnerHTML={{
                    __html: modelDetail?.metadata?.body?.contents || "<p></p>",
                  }}
                />
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Dialog> */}
    </Stack>
  );
};

export default ListNoti;