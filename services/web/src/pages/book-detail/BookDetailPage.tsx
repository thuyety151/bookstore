import React, { useEffect } from "react";
import BreadcrumbComponent from "../../components/Breadcrumb";
import BookComponent from "../../components/book-detail/Book";
import InformationComponent from "../../components/book-detail/Information";
import { getBook } from "../../redux/actions/book-detail/getAction";
import { useDispatch } from "react-redux";
import { getReviews } from "../../redux/actions/review/reviewAction";
import { getPageCart } from "../../redux/actions/cart/getAction";
import { useParams } from "react-router-dom";

const BookDetailPage: React.FunctionComponent<{}> = (props) => {
  const dispatch = useDispatch();
  const { bookId } = useParams() as any;
  const user = localStorage.getItem("user");

  // const bookId = "367B359F-CDE9-4D15-BC37-08D99961828A";
  useEffect(() => {
    dispatch(getBook(bookId));
    dispatch(getReviews(bookId));
    if (user) {
      dispatch(getPageCart());
    }
  }, [dispatch, bookId, user]);

  return (
    <div className="App">
      <BreadcrumbComponent />
      <BookComponent />
      <InformationComponent />
    </div>
  );
};
export default BookDetailPage;
