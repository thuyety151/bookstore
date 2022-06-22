import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Author from "../../model/author";
import { getAuthorPagination } from "../../redux/actions/author/getActions";
import { RootStore } from "../../redux/store";
import emptySearchResultImage from "../../assets/images/empty_result.webp";
import { Pagination } from "@material-ui/lab";

const ListAuthorPage: React.FC = () => {
  const classes = useStyles();
  const alphabet = [...Array(26)].map((x, i) => String.fromCharCode(i + 97));
  const dispatch = useDispatch();
  const { listAuthor, pagination } = useSelector(
    (store: RootStore) => store.author
  );
  const [pageIndex, setPageIndex] = useState(1);
  const [predicate, setPredicate] = useState("all");

  const AuthorCard = (author: Author) => (
    <Card className={classes.root}>
      <CardContent className={classes.avatar}>
        <Avatar
          alt="Remy Sharp"
          src={author.imageUrl}
          style={{ height: 180, width: 180 }}
        />
      </CardContent>
      <CardContent style={{ justifyItems: "center", display: "grid" }}>
        <Typography gutterBottom variant="body1" style={{ fontWeight: "bold" }}>
          {author.name}
        </Typography>
        <Typography variant="caption" gutterBottom color="inherit">
          {author.totalBook || 0} Publish Books
        </Typography>
      </CardContent>
    </Card>
  );

  useEffect(() => {
    dispatch(
      getAuthorPagination(predicate, {
        ...pagination,
        pageIndex,
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [predicate, pageIndex]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageIndex(value);
  };

  return (
    <Grid container justifyContent="center" style={{ padding: "24px 0" }}>
      <Grid item xs={8}>
        <Grid container>
          <Button
            variant={predicate === "all" ? "outlined" : undefined}
            onClick={() => setPredicate("all")}
          >
            ALL
          </Button>
          {alphabet.map((x) => (
            <Button
              variant={predicate === x ? "outlined" : undefined}
              key={x}
              onClick={() => setPredicate(x)}
            >
              {x.toUpperCase()}
            </Button>
          ))}
        </Grid>

        <Grid container>
          {listAuthor.length > 0 ? (
            listAuthor.map((author) => AuthorCard(author))
          ) : (
            <img
              src={emptySearchResultImage}
              alt="empty-result"
              className={classes.emptyImg}
            ></img>
          )}
        </Grid>
        <Grid container justifyContent="center" className={classes.pagination}>
          <Pagination
            className={classes.pages}
            count={pagination.totalPage}
            shape="rounded"
            page={pageIndex}
            onChange={handleChangePage}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ListAuthorPage;

const useStyles = makeStyles({
  root: {
    boxShadow: "none",
    padding: "16px",
    justifyItems: "center",
  },
  media: {
    height: 140,
  },
  avatar: {
    alignItems: "center",
  },
  emptyImg: {
    height: 500,
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  pages: {
    "& .Mui-selected": {
      backgroundColor: "#000 !important",
      color: "#fff",
    },
  },
});
