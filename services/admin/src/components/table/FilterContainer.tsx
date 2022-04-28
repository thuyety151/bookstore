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

export type FilterType = {
  onAdd?: () => void;
  add?: boolean;
  download?: boolean;
  search?: boolean;
  isUploadFile?: boolean;
};

const FilterContainer: React.FC<FilterType> = (props) => {
  const { add, download, search, isUploadFile } = props as FilterType;
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (isUploadFile && uploadInputRef.current) {
      uploadInputRef?.current?.click();
    }
  };

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
          <Button className="btn-outlined">
            <span className="material-icons-outlined">file_download</span>
            <Typography style={{ paddingLeft: 4 }}>Download</Typography>
          </Button>
        ) : (
          <div></div>
        )}
        {typeof add === "undefined" ? (
          <>
            {isUploadFile && (
              <input ref={uploadInputRef} type="file" accept=".csv" hidden />
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
