import { TableBody } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const EnhancedTableBody: React.FC<{
  loading: boolean;
  length: number;
  children?: React.ReactElement;
}> = (props) => {
  const { length, loading } = props;
  return (
    <TableBody>
      {!loading && !length ? (
        <TableRow>
          <TableCell>No data</TableCell>
        </TableRow>
      ) : (
        typeof props.children !== "undefined" && props.children
      )}
    </TableBody>
  );
};

export default EnhancedTableBody;
