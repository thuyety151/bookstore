import Attribute from "./attribute";
import Media from "./media";

export interface Detail {
    id: string,
    name: string,
    shortDescription: string,
    description: string,
    price: number,
    salePrice: number,
    stockStatus: number,
    totalStock: number,
    viewCount: number,
    media: Media[],
    authorId: string,
    authorName: string,
    attributes: Attribute [],
    language: string,
    dimensions: string,
    publicationDate: string,
    publisher: string,
    publicationCountry: string
}