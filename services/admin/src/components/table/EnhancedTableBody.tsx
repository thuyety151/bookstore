import { TableBody } from "@material-ui/core";
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
          <div className="px-lg pt-lg">No data</div>
        </TableRow>
      ) : (
        typeof props.children !== "undefined" && props.children
      )}
    </TableBody>
  );
};

export default EnhancedTableBody;
