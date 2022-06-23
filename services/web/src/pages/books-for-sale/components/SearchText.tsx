import { TextField } from "@material-ui/core";
import { useState } from "react";
import { Category } from "../../../model/category";
import { filterParams } from "../../../redux/actions/books/getAction";
import CategorySelectTreeView from "./CategorySelectTreeView";

interface Props {
  categories: Category[];
  handleCategoryChange: (position: number) => void;
  bookFilterParams: filterParams;
  checkedState: boolean[]
}
export default function SearchText({
  categories,
  handleCategoryChange,
  bookFilterParams,
  checkedState
}: Props) {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  return (
    <div className="search">
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label="Search"
        onChange={inputHandler}
        color='secondary'
      ></TextField>
      <CategorySelectTreeView
        categories={categories}
        bookFilterParams={bookFilterParams}
        handleCategoryChange={handleCategoryChange}
        searchInput={inputText}
        checkedState={checkedState}
      />
    </div>
  );
}
