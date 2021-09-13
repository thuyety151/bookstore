import {
  createStyles,
  Grid,
  List,
  ListItem,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { IFooterType } from "../../model/footer";

const FooterContactComponent: React.FC<{ data: IFooterType }> = (data) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={10} container direction="column" wrap="nowrap">
          <ListItem className={classes.title}>{data.data.title}</ListItem>
          <List component="nav" aria-label="secondary mailbox folders">
            {data.data.children.map((item: any, index: number) => {
              return (
                <ListItem key={index}>
                  <span className={classes.info}>{item.name}</span>
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: 500,
    },
    info: {
      fontWeight: 400,
      fontSize:14,
      "&:hover": {
        color: "red",
        cursor: "pointer",
      },
    },
  })
);
export default FooterContactComponent;
