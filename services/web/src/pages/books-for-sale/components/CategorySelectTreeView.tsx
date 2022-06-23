import { TreeItem, TreeView } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Category } from "../../../model/category";
import { filterParams } from "../../../redux/actions/books/getAction";

interface Props {
  categories: Category[];
  handleCategoryChange: (position : number) => void;
  bookFilterParams: filterParams;
  searchInput: string;
  checkedState: boolean[];
}
export default function CategorySelectTreeView(props: Props) {
  const classes = useStyles();

  const filteredData = props.categories.filter((el) => {
    //if no input the return the original
    if (props.searchInput === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      const subCategory = el.subCategories.filter((subEl) => {
        return subEl.name.toLowerCase().includes(props.searchInput);
      });

      if (subCategory.length > 0) {
        return true;
      }
      return el.name.toLowerCase().includes(props.searchInput);
    }
  });
  return (
    <>
      <Grid item container direction="column" className={classes.collapse}>
        <span>
          <FormControl component="fieldset">
            <FormGroup>
              {filteredData?.map((category: Category, index: number) => (
                <TreeView
                  className={classes.root}
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  multiSelect
                >
                  <TreeItem
                    nodeId="1"
                    label={
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={props.checkedState[index]}
                            onChange={() => props.handleCategoryChange(index)}
                            name={category.id}
                          />
                        }
                        label={category.name}
                      />
                    }
                  >
                    {category.subCategories?.map((subCategory: Category) => (
                      <TreeItem
                        nodeId="2"
                        label={
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={props.checkedState[index]}
                                onChange={() => {}}
                                name={subCategory.id}
                              />
                            }
                            label={subCategory.name}
                          />
                        }
                      />
                    ))}
                  </TreeItem>
                </TreeView>
              ))}
            </FormGroup>
          </FormControl>
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
