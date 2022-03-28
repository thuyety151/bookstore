import {
  Button,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import "./styles.scss";
import SearchIcon from "@material-ui/icons/Search";

const FilterContainer: React.FC = () => {
  return (
    <div className="filter-container">
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
      <div>
        <Button className="btn-outlined">
          <span className="material-icons-outlined">file_download</span>
          <Typography style={{ paddingLeft: 4 }}>Download</Typography>
        </Button>
        <Button className="btn-fill">
          <Icon>replay</Icon>
        </Button>
      </div>
    </div>
  );
};

export default FilterContainer;
