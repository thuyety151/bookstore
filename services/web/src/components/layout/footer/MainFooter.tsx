import { Divider, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import logo from "../../../assets/images/book-worm.png";
import FooterContactComponent from "./FooterContactInfo";
import footerData from "../../../mocks/footer";
import FooterBottomComponent from "./FooterBottom";
import clsx from "clsx";
import "./styles.scss";

const FooterComponent: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, "footer")}>
      <Divider />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        // spacing={10}
        className={classes.rootContact}
      >
        <Grid container direction="row" justifyContent="center">
          <Grid
            item
            xs={3}
            direction="column"
            spacing={3}
            wrap="nowrap"
            style={{ textAlign: "left" }}
            className="footer__shop-info"
          >
            <img
              src={logo}
              style={{ height: 64, width: "fit-content" }}
              alt="logo"
            />
            <Grid container className="footer__shop-info address">
              <Grid item>
                <span>
                  1418 River Drive, Suite 35 Cottonhall, CA 9622 United States
                </span>
              </Grid>

              <Grid item style={{ display: "grid" }}>
                <span className={classes.info}>sale@bookworm.com</span>
                <span className={classes.info}>+1 246-345-0695</span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7} className="footer__more-info">
            <Grid container>
              {footerData.map((item, index) => {
                return (
                  <FooterContactComponent
                    data={item}
                    key={index}
                    className={`footer__more-info category-${index}`}
                  />
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <FooterBottomComponent />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      fontWeight: 400,
      fontSize: 14,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
    },
    info: {
      padding: theme.spacing(1, 0),
      "&:hover": {
        color: "red",
        cursor: "pointer",
      },
    },
    rootContact: {
      padding: theme.spacing(7, 0),
    },
  })
);
export default FooterComponent;
