import { Collapse, Grid, Paper } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

export type Props = {
  title: string;
  children: any;
  isOpen?: boolean;
  setOpen?: () => void;
};
const ProductDataContainer: React.FC<Props> = (props: Props) => {
  const { title, children, isOpen, setOpen } = props;

  return (
    <Collapse
      in={typeof isOpen === "boolean" ? isOpen : true}
      collapsedSize={58}
      key={title.toLowerCase()}
    >
      <Paper className="px-md" variant="outlined">
        <Paper elevation={0} className={"card-title"}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <h3>{title}</h3>
            {typeof isOpen === "boolean" && (
              <span className="cursor-pointer icon" onClick={setOpen}>
                {isOpen ? <RemoveIcon /> : <AddIcon />}
              </span>
            )}
          </Grid>
        </Paper>
        <div className="py-sm"> {children}</div>
      </Paper>
    </Collapse>
  );
};

export default ProductDataContainer;
