import {
  Button,
  Icon,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import "./styles.scss";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useRef } from "react";
import { ChangeEvent } from "ag-grid-community/dist/lib/widgets/agCheckbox";

export type FilterType = {
  placeholderSearch?: string;
  onAdd?: () => void;
  onDownload?: () => void;
  onSearch?: (keywords: string) => void;
  onReload?: () => void;
};
const FilterContainer: React.FC<FilterType> = (props) => {
  const { placeholderSearch, onSearch, onDownload, onReload, onAdd } = props;

  const onChange = (e: any) => {
    if (typeof onSearch !== "undefined" && e.key === "Enter") {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="filter-container">
      <TextField
        variant="outlined"
        placeholder={placeholderSearch || "Search by ..."}
        onChange={onChange}
        onKeyDown={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: "var(--text-grey)" }} />
            </InputAdornment>
          ),
        }}
      />
      <div>
        {typeof onDownload !== "undefined" && (
          <Button className="btn-outlined">
            <span className="material-icons-outlined">file_download</span>
            <Typography style={{ paddingLeft: 4 }}>Download</Typography>
          </Button>
        )}
        {typeof onAdd !== "undefined" && (
          <Button className="btn-fill" onClick={props.onAdd}>
            <Icon>add</Icon>
          </Button>
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
