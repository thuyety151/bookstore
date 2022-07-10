import { Grid } from "@material-ui/core";
import HeaderPage from "components/headerPage/HeaderPage";
import FilterContainer from "components/table/FilterContainer";
import { useSnackbar } from "notistack";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { importFromFile } from "redux/actions/product/postAction";
import ImportDataTable from "./components/ImportDataTable";
import { getDataExport } from "redux/actions/importData/getAction";

const ImportData: React.FC = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }
    dispatch(
      importFromFile({
        file: e.target.files[0],
        onSuccess: () => {
          enqueueSnackbar("Import data successfully", {
            variant: "success",
          });
        },
        onFailure: (error: any) => {
          enqueueSnackbar(error, { variant: "error" });
        },
      })
    );
  };

  const onDownload = () => {
    dispatch(getDataExport());
  };

  return (
    <div style={{ margin: "0 5rem" }}>
      <HeaderPage title="Import Data" />
      <FilterContainer
        isUploadFile={true}
        onUploadFile={handleUpload}
        onDownload={onDownload}
      />
      <Grid container justifyContent="space-between" className="pt-md">
        <ImportDataTable />
      </Grid>
    </div>
  );
};

export default ImportData;
