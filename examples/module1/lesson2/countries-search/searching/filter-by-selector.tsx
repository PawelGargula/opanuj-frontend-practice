import { FilterType } from "../types"

export default function FilterBySelector({ 
  filterBy, setFilterBy 
} : {
  filterBy: string,
  setFilterBy: (newFilterBy: FilterType) => void
}) {
  return (
    <>
      <label>
        Filter by:
        <select 
          className="ml-1 border border-gray-300 rounded"
          value={filterBy} 
          onChange={(e) => setFilterBy(e.target.value as FilterType)}
        >
            <option value={FilterType.Name.toLowerCase()}>Name</option>
            <option value={FilterType.Currency.toLowerCase()}>Currency</option>
            <option value={FilterType.Language.toLowerCase()}>Language</option>
            <option value={FilterType.Capital.toLowerCase()}>Capital</option>
        </select>
      </label>
    </>
  )
}
