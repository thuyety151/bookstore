import React from "react";
// import ContainedButtons from './components/ContainedButtons'
import DealItem from "../../components/DealItem";
import FooterComponent from "../../components/footer/FooterComponent";
// import SlideShow from './components/SlideShow';
// import TabBar from './components/TabBar';
const HomePage: React.FunctionComponent<{}> = (props) => {
  return (
    <div className="App">
      {/* <HeaderComponent/>
      <NavBarComponent/> */}
      <h3>Home page</h3>
      {/* <ContainedButtons /> */}
      <DealItem />
      <DealItem />
      <FooterComponent/>
      {/* <TabBar /> */}
      {/* <SlideShow /> */}
      {/* <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch> */}
    </div>
  );
};

export default HomePage;
