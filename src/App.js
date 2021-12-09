import { useEffect, useState } from 'react';
import './App.css';
import { months, randomInRange } from './utility';

function App() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  useEffect(()=>{
    let interval = null;
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime(time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  },[isActive,time,isPaused]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };
  
  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };
  return (
    <div className="App">
      <div className="textBox">
        {isActive}
        <div>
          <iframe src={"https://www.onthisday.com/events/"+months[randomInRange(0,11)]+"/"+randomInRange(1,25)}></iframe>
        </div>
      </div>
    </div>
  );
}

export default App;
