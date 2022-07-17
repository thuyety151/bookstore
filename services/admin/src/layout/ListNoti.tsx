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
import InfiniteScroll from "components/infinityscroll/InfinityScroll";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, useHistory } from "react-router-dom";
import { getAll } from "redux/actions/noti/getActions";
import { readNotis } from "redux/actions/noti/postActions";
import { RootStore } from "redux/store";
import { ROUTE_ORDER_DETAIL } from "routers/types";
import "./styles.scss";

const ListNoti: React.FC = () => {
  const { listNoti, pagination, requesting } = useSelector(
    (state: RootStore) => state.notis
  );
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

  const onLoadMore = () => {
    console.log(
      listNoti.length < pagination.totalCount,
      listNoti.length,
      pagination.totalCount
    );
    dispatch(getAll(pagination.pageIndex + 1));
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
          <InfiniteScroll
            // hasMoreData={listNoti.length < pagination.totalCount}
            isLoading={requesting}
            hasMoreData={true}
            onBottomHit={onLoadMore}
            loadOnMount={true}
          >
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
                    <Typography variant="caption">
                      {item?.metadata?.body?.contents}
                    </Typography>
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
          </InfiniteScroll>
        </Paper>
      </Snackbar>
    </Stack>
  );
};

export default ListNoti;
