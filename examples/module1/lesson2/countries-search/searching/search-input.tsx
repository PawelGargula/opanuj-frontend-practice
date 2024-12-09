export default function SearchInput({
    filterBy, 
    searchText, 
    setSearchText
} : {
    filterBy: string,
    searchText: string,
    setSearchText: (searchText: string) => void
}
) {
  return (
    <>
        <input 
            className="w-full p-2 border border-gray-300 rounded"
            type="text" 
            placeholder={`Search by country's ${filterBy}...`}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
        />
    </>
  )
}
