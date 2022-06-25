import { Grid, makeStyles, Theme } from "@material-ui/core";
import CheckboxTree from "react-checkbox-tree";
import { useState } from "react";
import "../styles.scss";

interface Props {
  categories: any[];
  handleCategoryChange: (checked: string[]) => void;
  checked: string[]
  // bookFilterParams: filterParams;
  // searchInput: string;
  // checkedState: boolean[];
}

export default function CategorySelectTreeView(props: Props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState([] as string[]);

  function onExpand(expanded: string[]) {
    setExpanded(expanded);
  }

  
  return (
    <>
      <Grid item container direction="column" className={classes.collapse}>
        <span>
          <div className="filter-container">
            <CheckboxTree
              checked={props.checked}
              expanded={expanded}
              iconsClass="fa5"
              nodes={props.categories}
              onCheck={(checked) => {props.handleCategoryChange(checked)}}
              onExpand={onExpand}
              checkModel ="all"
            />
          </div>
        </span>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 400,
  },
  collapse: {
    marginTop: "15px",
  },
}));
