import './App.css'
import { useState, useEffect, useRef } from 'react';
import { Poppable } from './Poppable'
import { ScoreBox } from './ScoreBox';

const SPEED = 500;
const MAX_TICKS = 30;

function App() {  
  const [score, setScore] = useState(0);
  const [numberOfTicks, setNumberOfTicks] = useState(0);
  const [notifyChildren, setNotifyChildren] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const timerRef = useRef(0);

  if (numberOfTicks >= MAX_TICKS && !isGameOver) {
    setIsGameOver(true);
  }

  if (isGameOver) {
    //console.log('game over, clearing timer');
    clearInterval(timerRef.current);
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setNumberOfTicks(prev => prev + 1);
      setNotifyChildren(prev => !prev);
    }, SPEED);

    // cleanup to prevent memory leaks
    return () => {
      // this will run when the component unmounts
      //console.log('Cleaning up timer');
      clearInterval(timerRef?.current);
    }
  }, []);

  const handlePop = () => {
    setScore(prev => prev + 1);
  };

  return (
    <>
      <div>
        <ScoreBox score={score} remainingTime={MAX_TICKS - numberOfTicks} />
        {
          !isGameOver &&
          <Poppable image='./b1.png'
                  canvasWidth={window.innerWidth}
                  canvasHeight={window.innerHeight}
                  onPop={handlePop}
                  shouldUpdatePosition={notifyChildren}
                  />
        }
      </div>
    </>
  );
}

export default App;