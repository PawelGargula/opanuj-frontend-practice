import { useState } from "react";
import type { Book } from "../types/book";

export default function useBooks() {
    const [books, setBooks] = useState<Book[]>([]);
    
    const addBook = (book: Book) => {
        const errors = [];

        if (!book.id) {
            throw new Error("ID is required");
        }

        if (books.some((b) => b.id === book.id)) {
            throw new Error("ID already exists");
        }

        if (errors.length === 0) {
            setBooks((prevBooks) => [...prevBooks, book]);
        }
    };
    
    const removeBookById = (id: number) => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    };
    
    return { books, addBook, removeBookById };
}