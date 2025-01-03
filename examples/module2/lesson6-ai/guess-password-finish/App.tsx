import { useState } from 'react';
import './App.css';
import { GameIntro } from './components/GameIntro';
import { GuessPassword } from './components/GuessPassword';
import { Hints } from './components/Hints';
import PasswordHintImage from './components/PasswordHintImage';
import { levels } from './data/levels';

function App() {
  const [currentLevel, setCurrentLevel] = useState<number>(0);

  if (currentLevel > levels.length - 1) {
    return <div aria-live='polite'>Gratulacje! Ukończyłeś wszystkie poziomy.</div>;
  }

  return (
    <main className="h-screen flex ">
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-128">
          <GameIntro />
          <div className="mb-4" />
          <GuessPassword currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} />
          <div className="mb-12" />
          <Hints currentLevel={currentLevel} />
        </div>
      </div>
      <PasswordHintImage currentLevel={currentLevel} />
    </main>
  );
}

export default App;
