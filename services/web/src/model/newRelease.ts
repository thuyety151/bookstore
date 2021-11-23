export type NewReleaseType = {
  categoryId: string;
  categoryName: string;
  books: {
    id: string;
    name: string;
    pictureUrl: string;
    attribute: string;
    attributeId: string;
    author: string;
    authorId: string;
    price: string;
    salePrice: string;
    languageId: string;
    language: string;
    totalStock: number;
  }[];
};
