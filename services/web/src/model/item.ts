export default interface Item {
  id: string;
  productId: string;
  productName: string;
  authorId: string;
  authorName: string;
  attributeId: string;
  attributeName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
  stockStatus: string;
  isReviewed: boolean;
}

export enum ItemStatus {
  InStock = "InStock",
}
