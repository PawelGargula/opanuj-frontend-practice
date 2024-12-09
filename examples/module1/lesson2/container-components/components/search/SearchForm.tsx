import type { ReactNode } from "react";

function SearchForm({
  children  
}: {
  children: ReactNode
}) {
  return (
    <form className="space-x-4 flex items-end justify-center">
      {children}
    </form>
  );
}

export default SearchForm;
