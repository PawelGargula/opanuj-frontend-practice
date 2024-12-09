import { SortOrder } from "../types"

export default function SortBySelector({ 
    sortBy, 
    setSortBy 
} : {   
    sortBy: string,   
    setSortBy: React.Dispatch<React.SetStateAction<SortOrder>>
}) {  
  return (
    <>
        <label>
          Sort by:
          <select 
            className="ml-1 border border-gray-300 rounded"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as SortOrder)}
          >
            <option value={SortOrder.Alphabetical}>Alphabetical</option>
            <option value={SortOrder.Population}>Population</option>
          </select>
        </label>
    </>
  )
}
