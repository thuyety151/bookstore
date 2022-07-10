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
  download?: boolean;
  search?: boolean;
  onUploadFile?: (e: any) => void;
};
const FilterContainer: React.FC<FilterType> = (props) => {
  const {
    placeholderSearch,
    onSearch,
    onUploadFile,
    onDownload,
    onReload,
    onAdd,
  } = props as FilterType;
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (typeof onUploadFile !== "undefined" && uploadInputRef.current) {
      uploadInputRef?.current?.click();
    }
  };

  return (
    <div className="filter-container">
      {typeof onSearch !== "undefined" ? (
        <TextField
          variant="outlined"
          placeholder={placeholderSearch || "Search by ..."}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "var(--text-grey)" }} />
              </InputAdornment>
            ),
          }}
          onChange={(value) => onSearch(value.target.value)}
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
        {typeof onAdd !== "undefined" || typeof onUploadFile !== "undefined" ? (
          <>
            {typeof onUploadFile !== "undefined" && (
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
              onClick={
                typeof onUploadFile !== "undefined" ? handleAdd : props.onAdd
              }
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
