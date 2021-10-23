
import BreadcrumbComponent from "../../components/Breadcrumb"
import BookComponent from "../../components/book-detail/Book"
import InformationComponent from "../../components/book-detail/Information"
import { getBook } from "../../redux/actions/book-detail/getAction";
import { useDispatch } from "react-redux";


const BookDetailPage: React.FunctionComponent<{}> = (props) => {
  const dispatch = useDispatch();
  const bookId = "68316EED-A3D1-4AD4-9DCA-08D993DF0839";
  dispatch(getBook(bookId));
  return (
    <div className="App">
      <BreadcrumbComponent />
      <BookComponent />
      <InformationComponent />
    </div>
  );
};
export default BookDetailPage;
