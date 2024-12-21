import { useRef, useState } from 'react'
import type { Book } from '../types/book'

export default function Form({ addBook }: { 
    addBook: (book: Book) => void 
}) {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [errors, setErrors] = useState<string[]>([]);
    
    return (
        <form className="mb-8 space-y-4" onSubmit={e => {
            e.preventDefault();
            const id = Date.now();
            const name = nameRef.current?.value || '';
            const description = descriptionRef.current?.value || '';

            const newErrors = [];
            
            if (name === "") {
                newErrors.push("Name is required");
            }
    
            if (description === "") {
                newErrors.push("Description is required");
            }

            setErrors(newErrors);

            if (newErrors.length === 0) {
                const book = { id, name, description };
                addBook(book);
                if (nameRef.current) nameRef.current.value = '';
                if (descriptionRef.current) descriptionRef.current.value = '';
            }
        }}>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    ref={nameRef}
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    ref={descriptionRef}
                    id="description"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Add Book
                </button>
            </div>
            {errors.length > 0 && (
                <div className="mt-4">
                    {errors.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                            {error}
                        </p>
                    ))}
                </div>
            )}
        </form>
    )
}
