import { Book } from "./book";

export default interface Author {
  id: string;
  name: string;
  imageUrl: string;
  count: number;
  description?: string;
  books: Book[];
}
