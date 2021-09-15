import React from "react";
import DealItem from "../../components/DealItem";
import ListBestSellingComponent from "../../components/item/ListBestSellingComponent";
const HomePage: React.FunctionComponent<{}> = (props) => {
  return (
    <div className="App">
      <h3>Home page</h3>
      <DealItem />
      <ListBestSellingComponent/>
    </div>
  );
};

export default HomePage;
