import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookItem from "../../components/homepage/feature-books/BookItem";
import { getWishlist } from "../../redux/actions/wishlist/getAction";
import { ACTION_NAMES } from "../../redux/constants/wishlist/actionTypes";
import { RootStore } from "../../redux/store";

const WishlistPage: React.FC = () => {
  const { data } = useSelector((state: RootStore) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  return (
    <div>
      {data.map((item, index) => (
        <div className="featured-book-item" key={index}>
          <BookItem item={item as any} />
        </div>
      ))}
    </div>
  );
};

export default WishlistPage;
