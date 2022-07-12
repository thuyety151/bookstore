import { Avatar, Grid, SvgIcon, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import BookItem from "../../components/homepage/feature-books/BookItem";
import { getAuthorById } from "../../redux/actions/author/getActions";
import { RootStore } from "../../redux/store";
import "./styles.scss";
import { ReactComponent as Icon } from "../../assets/images/themifyIcon/angle-right.svg";
import { ROUTE_BOOKS_FOR_SALE } from "../../routers/types";

const AuthorDetail: React.FC = () => {
  const history = useHistory();
  const { detail } = useSelector((store: RootStore) => store.author);
  const dispatch = useDispatch();
  const { id } = useParams() as any;
  useEffect(() => {
    dispatch(getAuthorById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="author-detail">
      <Grid container className="author-detail__header" justifyContent="center">
        <Grid item xs={2}>
          <Avatar
            alt="Remy Sharp"
            src={detail?.imageUrl}
            style={{ height: 180, width: 180 }}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h4">{detail?.name}</Typography>
          <p>{detail?.description}</p>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        style={{ padding: "2rem 8rem" }}
      >
        <Typography variant="h5">Author's Books</Typography>
        <Grid
          item
          className="view-all"
          onClick={() =>
            history.push({
              pathname: ROUTE_BOOKS_FOR_SALE,
              state: {
                authorId: detail?.id,
              },
            })
          }
        >
          <Typography variant="subtitle1" gutterBottom>
            View All
          </Typography>
          <SvgIcon component={Icon} className="icon" />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        className="author-detail__contents"
      >
        {detail?.books?.map((book) => (
          <Grid item xs={2}>
            <BookItem item={book} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AuthorDetail;
