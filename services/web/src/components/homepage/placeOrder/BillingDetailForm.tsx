import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const BillingDetailForm: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>

        </div>
    )
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        
    }
}))
export default BillingDetailForm;