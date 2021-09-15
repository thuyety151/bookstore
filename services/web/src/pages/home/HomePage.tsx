import React from "react";
import DealItem from "../../components/DealItem";
import ListBestSellingComponent from "../../components/item/ListBestSellingComponent";
import Categories from "../../components/homepage/CategoriesBanner";
// import SlideShow from './components/SlideShow';
// import TabBar from './components/TabBar';
const HomePage: React.FunctionComponent<{}> = (props) => {
  return (
    <div className="App">
      <h3>Home page</h3>
      <DealItem />
      <ListBestSellingComponent/>
      <Categories />
      {/* <TabBar /> */}
      {/* <SlideShow /> */}
    </div>
  );
};

export default HomePage;
