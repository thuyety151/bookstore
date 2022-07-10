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
  placeholderSearch?: string;
  onAdd?: () => void;
  onDownload?: () => void;
  onSearch?: (keywords: string) => void;
  onReload?: () => void;
  add?: boolean;
  download?: boolean;
  search?: boolean;
  isUploadFile?: boolean;
  onUploadFile?: (e: any) => void;
};
const FilterContainer: React.FC<FilterType> = (props) => {
  const { add, search, isUploadFile, onUploadFile, onDownload, onReload } =
    props as FilterType;
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
      <div>
        {typeof onDownload !== "undefined" && (
          <Button className="btn-outlined" onClick={onDownload}>
            <span className="material-icons-outlined">file_download</span>
            <Typography style={{ paddingLeft: 4 }}>Download</Typography>
          </Button>
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
        {typeof onReload !== "undefined" && (
          <Button className="btn-fill">
            <Icon>replay</Icon>
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterContainer;
