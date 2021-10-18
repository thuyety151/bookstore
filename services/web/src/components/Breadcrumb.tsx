import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function Breadcrumb() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick}>
          Home
        </Link>
        <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
          Shop
        </Link>
        <Typography color="textPrimary">Shop Single</Typography>
      </Breadcrumbs>
    </div>
  );
}
