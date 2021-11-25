import { LinearProgress } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { createStyles, makeStyles } from "@material-ui/styles";

export interface Data {
  id: string;
  code: string;
  date: string;
  status: string;
  total: string;
}

type OrderTableType = "asc" | "desc";

export interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  width?: string;
}

export interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected?: number;
  onRequestSort?: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order?: OrderTableType;
  orderBy?: string;
  rowCount?: number;
  headerCells: HeadCell[];
  loading?: boolean;
}
const EnhancedTableHead: React.FC<EnhancedTableProps> = (props) => {
  const { classes, order, orderBy, loading } = props;
  return (
    <TableHead>
      <TableRow>
        {props.headerCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
            className="primary"
            width={headCell.width}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              //   onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
      {loading && (
        <TableRow>
          <TableCell colSpan={props.headerCells.length} style={{ padding: 0 }}>
            <LinearProgress />
          </TableCell>
        </TableRow>
      )}
    </TableHead>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);
export default EnhancedTableHead;
