import React from "react";
// import ContainedButtons from './components/ContainedButtons'
import DealItem from "../../components/DealItem";
import ListBestSellingComponent from "../../components/item/ListBestSellingComponent";
// import SlideShow from './components/SlideShow';
// import TabBar from './components/TabBar';
const HomePage: React.FunctionComponent<{}> = (props) => {
  return (
    <div className="App">
      <h3>Home page</h3>
      {/* <ContainedButtons /> */}
      <DealItem />
      {/* <BestSellerComponent/> */}
      <ListBestSellingComponent/>
      {/* <TabBar /> */}
      {/* <SlideShow /> */}
    </div>
  );
};

export default HomePage;
