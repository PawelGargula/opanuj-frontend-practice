import type { ReactNode } from 'react';

function CharacterList({ children }: {children: ReactNode }) {
  return (
    <ol className="grid grid-cols-1 gap-4 list-none md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}      
    </ol>
  );
}

export default CharacterList;
