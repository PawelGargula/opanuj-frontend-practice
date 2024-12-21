import type { Book } from "../types/book";


export default function BookItem({ book, removeBook }: { book: Book, removeBook: (id: number) => void }) {
  return (
    <li key={book.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">{book.name}</h2>
        <p className="text-gray-600">{book.description}</p>
        <button
          type="button"
          onClick={() => removeBook(book.id)}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Remove
        </button>
    </li>
  )
}
