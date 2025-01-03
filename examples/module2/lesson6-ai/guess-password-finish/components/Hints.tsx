import { useState, useEffect } from 'react';
import { getLevel } from '../data/levels';

export const Hints = ({ currentLevel }: { currentLevel: number }) => {
  const level = getLevel(currentLevel);
  const hints = level.hints;

  const [currentHintIndex, setCurrentHintIndex] = useState(-1);

  // Reset hints when level changes
  useEffect(() => {
    setCurrentHintIndex(-1);
  }, [currentLevel]);

  const showNextHint = () => {
    setCurrentHintIndex((prevHintIndex) =>
      prevHintIndex === -1 ? 0 : (prevHintIndex + 1) % hints.length
    );
  };

  return (
    <div>
      Masz problem ze zgadnięciem hasła? Skorzystaj z podpowiedzi.
      <div aria-labelledby='show-next-hint' aria-live='polite' className="text-green-500 mt-1 h-6" data-testid="hint-text">
        {currentHintIndex !== -1 ? `${hints[currentHintIndex]}` : ''}
      </div>
      <button
        id='show-next-</div>hint'
        onClick={showNextHint}
        className="mt-2 bg-violet-600 text-white p-2 rounded hover:bg-violet-700"
      >
        Pokaż podpowiedź
      </button>
    </div>
  );
};
