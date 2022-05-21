import Media from "./media"

export interface Review {
    id: string,
    title: string,
    content: string,
    rate: number | null,
    createDate: string | null, 
    bookId: string,
    media?:Media[]
}

export interface CreateReview {
    id: string,
    title: string,
    content: string,
    rate: number | null,
    bookId: string,
    files?:File[]
}