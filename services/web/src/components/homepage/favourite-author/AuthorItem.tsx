import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Author from "../../../model/author";
import React from "react";
import { generatePath, useHistory } from "react-router-dom";
import { ROUTE_AUTHOR_DETAIL } from "../../../routers/types";

const useStyles = makeStyles({
  root: {
    maxWidth: 160,
    boxShadow: "none",
    cursor: "pointer",
  },
  media: {
    height: 140,
  },
  avatar: {
    alignItems: "center",
  },
});

interface Props {
  author: Author;
}

export default function MediaCard({ author }: Props) {
  const classes = useStyles();
  const history = useHistory();
  const viewDetail = () => {
    history.push(generatePath(ROUTE_AUTHOR_DETAIL, { id: author.id }));
  };

  return (
    <Card className={classes.root} onClick={viewDetail}>
      <CardContent className={classes.avatar}>
        <Avatar
          alt="Remy Sharp"
          src={author.imageUrl}
          style={{ height: "120px", width: "120px" }}
        />
      </CardContent>
      <CardContent>
        <Typography gutterBottom variant="body1" style={{ fontWeight: "bold" }}>
          {author.name}
        </Typography>
        <Typography variant="caption" gutterBottom color="inherit">
          {/* {author.totalBook} Publish Books */}
        </Typography>
      </CardContent>
    </Card>
  );
}
