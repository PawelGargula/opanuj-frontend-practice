import React from 'react';
import BookItem from './components/book-item';
import Form from './components/form';
import useBooks from './hooks/useBooks';

const App: React.FC = () => {
    const { books, addBook, removeBookById } = useBooks();

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Books</h1>
            <Form 
                addBook={addBook} 
            />
            <ul className="space-y-6">
                {books.map((book) => (
                    <BookItem 
                        key={book.id} 
                        book={book} 
                        removeBook={() => removeBookById(book.id)} 
                    />
                ))}
            </ul>
        </div>
    );
};

export default App;