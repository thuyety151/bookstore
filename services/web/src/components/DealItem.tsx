import Typography from "@material-ui/core/Typography";
import book from "../assets/images/luat-tam-thuc.jpeg";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Slider from "./Slider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 600,
      textAlign: "left",
    },
    image: {
      width: 250,
      height: 250,
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
  })
);
export default function ComplexGrid() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={book} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="caption"
                  color="error"
                  component="p"
                >
                  KINDLE EDITION
                </Typography>
                <Typography gutterBottom variant="h5">
                  Dark in Death: An Eva Dallas Novel (In Death. Book 46)
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Nora Roberts
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  $99.00
                </Typography>
              </Grid>
              <Grid
                item
                xs
                container
                direction="row"
                justifyContent="space-between"
                spacing={2}
              >
                <Typography gutterBottom variant="subtitle2">
                  Already Sold: 11
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  Available: 3
                </Typography>
                <Slider />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

// export default function MediaCard() {
//   const classes = useStyles();

//   return (
//     <Card className={classes.root}>
//       <CardActionArea className={classes.content}>
//         <CardMedia
//           className={classes.media}
//           image={book}
//           title="Contemplative Reptile"
//         />
//         <CardContent>
//         <Typography gutterBottom variant="subtitle2" color="error" component="p">
//           KINDLE EDITION
//           </Typography>
//           <Typography gutterBottom variant="inherit" component="h2" >
//           Dark in Death: An Eva Dallas Novel (In Death. Book 46)
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//             Nora Roberts
//           </Typography>
//           <Typography gutterBottom variant="inherit" component="h2" >
//             $99.00
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }
