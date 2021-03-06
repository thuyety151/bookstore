import { BookAttribute } from "./attribute";
import { Author } from "./author";
import { Media } from "./media";

export type Book = {
  id: string;
  name: string;
  price: number;
  salePrice: number;
  pictureUrl: string;
  authorId: string;
  authorName: string;
  languageId: string;
  languageName: string;
  attributeId: string;
  attributeName: string;
  stockStatus: string;
  categories: string;
  publishDate: string;
  files: any;
};

export interface BookDetail {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  salePrice: number;
  viewCount: number;
  media: Media[];
  authorId: string;
  authorName: string;
  attributes: BookAttribute[];
  languageId: string;
  language: string;
  dimensions: string;
  publicationDate: Date;
  publisher: string;
  publicationCountry: string;
  stockStatus: string;
  totalStock: number;
  isPublic: boolean;
  updateDate: Date;
  categoryIds: string[];
  files: [];
  author?: Author[];
}
