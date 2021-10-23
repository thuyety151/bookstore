import React from "react";
import BreadcrumbComponent from "../../components/Breadcrumb"
import BookComponent from "../../components/book-detail/Book"
import InformationComponent from "../../components/book-detail/Information"

const BookDetailPage: React.FunctionComponent<{}> = (props) => {
  
  return (
    <div className="App">
      <BreadcrumbComponent />
      <BookComponent />
      <InformationComponent />
    </div>
  );
};
export default BookDetailPage;
