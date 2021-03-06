export interface Book {
    author: string;
    country: string;
    description?: string;
    image?: string;
    language: string;
    title: string;
    published?: number;
    pages?: number;
    price?: number;
    genres?: string[];
}
