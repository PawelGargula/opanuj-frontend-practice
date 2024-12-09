export default function Pager({
    pageNumber,
    setPageNumber,
    itemsCount,
    pageSize
}: {
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    itemsCount: number;
    pageSize: number;
}) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white py-4 shadow-lg">
            <div className="flex justify-center items-center space-x-4">
                <button 
                type="button" 
                onClick={() => setPageNumber(prev => prev - 1)} 
                disabled={pageNumber === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                Previous
                </button>
                <span className="text-lg font-semibold">Page {pageNumber} of {Math.ceil(itemsCount / pageSize)}</span>
                <button 
                    disabled={pageNumber * pageSize >= itemsCount}
                    type="button" 
                    onClick={() => setPageNumber(prev => prev + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                Next
                </button>
            </div>
        </div>
    )
}
