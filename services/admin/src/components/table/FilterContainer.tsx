import {
  Button,
  Icon,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import "./styles.scss";
import SearchIcon from "@material-ui/icons/Search";
import { useRef } from "react";
import { getDataExport } from "redux/actions/importData/getAction";
import { useDispatch } from "react-redux";

export type FilterType = {
  onAdd?: () => void;
  add?: boolean;
  download?: boolean;
  search?: boolean;
  isUploadFile?: boolean;
  onUploadFile?: (e: any) => void;
};

const FilterContainer: React.FC<FilterType> = (props) => {
  const { add, download, search, isUploadFile, onUploadFile } =
    props as FilterType;
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  

  const handleAdd = () => {
    if (isUploadFile && uploadInputRef.current) {
      uploadInputRef?.current?.click();
    }
  };

  function handleDownload(){
    dispatch(getDataExport())
  }
 
  return (
    <div className="filter-container">
      {typeof search === "undefined" ? (
        <TextField
          variant="outlined"
          placeholder="Search by ..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "var(--text-grey)" }} />
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <div></div>
      )}
      <div style={{ display: "flex" }}>
        {typeof download === "undefined" ? (
          <Button className="btn-outlined" onClick={handleDownload}>
            <span className="material-icons-outlined">file_download</span>
            <Typography style={{ paddingLeft: 4 }}>Download</Typography>
          </Button>
        ) : (
          <div></div>
        )}
        {typeof add === "undefined" ? (
          <>
            {isUploadFile && (
              <input
                ref={uploadInputRef}
                type="file"
                accept=".xlsx"
                onChange={onUploadFile}
                hidden
              />
            )}

            <Button
              className="btn-fill"
              onClick={isUploadFile ? handleAdd : props.onAdd}
            >
              <Icon>add</Icon>
            </Button>
          </>
        ) : (
          <div></div>
        )}
        <Button className="btn-fill">
          <Icon>replay</Icon>
        </Button>
      </div>
    </div>
  );
};

export default FilterContainer;
