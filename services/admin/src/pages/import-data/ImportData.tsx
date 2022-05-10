import { Grid } from "@material-ui/core";
import HeaderPage from "components/headerPage/HeaderPage";
import FilterContainer from "components/table/FilterContainer";
// import ExportSample from "helper/exportSample";
import ImportDataTable from "./components/ImportDataTable";

const ImportData: React.FC = () => {
  return (
    <div style={{ margin: "0 5rem" }}>
      <HeaderPage title="Import Data" />
      <FilterContainer download={false} isUploadFile={true} />
      <Grid container justifyContent="space-between" className="pt-md">
        <ImportDataTable />
      </Grid>
      {/* <ExportSample /> */}
    </div>
  );
};

export default ImportData;
