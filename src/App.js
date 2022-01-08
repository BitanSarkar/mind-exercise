import { useEffect, useState } from 'react';
import './App.css';
import CountDownStart from './components/CountDown';
import Timer from './components/Timer';
import { dateCalc, days, getRandomDate, months} from './utility';
import useWindowDimensions from './WindowDim';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [corrDay, setCorrDay] = useState("");
  const [subDay, setSubDay] = useState("");
  const [time, setTime] = useState(0);
  const [ctrDwn, setctrDwn] = useState(7000);
  const [date, setDate] = useState({day: 0, month: 0, year: 0});

  useEffect(()=>{
    let intervalCD = null;
    if(!isActive) {
      intervalCD = setInterval(()=>{
        setctrDwn(ctrDwn-1000)
      },1000);
    } else {
     clearInterval(intervalCD);
    }
    if(ctrDwn===0){
      clearInterval(intervalCD);
      handleStart();
      setIsPaused(false);
      setDate(getRandomDate());
    }
    return () => {
      clearInterval(intervalCD);
    };
  }, [ctrDwn,isActive]);


  useEffect(()=>{
    let interval = null;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime(time + 10);
      }, 10);
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

  const handleSubmit = (d) => {
    handlePauseResume();
    setCorrDay(dateCalc(date));
    setSubDay(d);
  }
  const [height, width] = useWindowDimensions();
  return (
    <div className="App">
      {height>=width?<h1>Mobile view not supported! Please rotate your phone!</h1>:
      <div className="textBox">
        <div className="OTD" style={{width:Math.floor(width/2)+"px" , height:(height-20)+"px"}}>
          <h1>Find the Day from the Date</h1>
          {(!isActive)?<CountDownStart ctrDwn={ctrDwn}/>:
          <div className="datee">
            <div className="date">
              {date.day}{parseInt(date.day)===1||parseInt(date.day)===21||parseInt(date.day)===31?"st":
                parseInt(date.day)===2||parseInt(date.day)===22?"nd":
                parseInt(date.day)===3||parseInt(date.day)===23?"rd":"th"} {months[parseInt(date.month)-1]}, {date.year}
            </div>
            <Timer time={time} />
            {isPaused?<>
              {corrDay===subDay?<div className="correct">Correct!!<br/>The day is indeed {corrDay}</div>:<div className="wrong">Wrong!!! <br/> The day is {corrDay}, <br/> You selected {subDay}</div>}
              <button onClick={handleReset} className="btn-retry">RETRY</button>
            </>:
            <>
            {days.map( d=> 
              <>
                <div class="btn-group" style={{width:(height>width)?"100%":"80%"}}>
                  <div className="row" style={{width:(height>width)?"100%":"80%"}}>
                    {
                      d.map(D => 
                      <>
                        {D==="Saturday"?<div className="col-3"></div>:null}
                        <div className={"col-6"} style={{width:"50%"}}>
                          <button onClick={()=>handleSubmit(D)} style={{fontSize:(height<500)?"10px":"28px", width:(height<width)?"180px":"210px"}}>{D}</button>
                        </div>
                        {D==="Saturday"?<div className="col-3"></div>:null}
                      </>)
                    }
                  </div>
                </div>
              </>
            )}
            </>}
          </div>}
        </div>
        <div>
          <iframe title="Events on this day" src={"https://www.onthisday.com/events/"+months[date.month===0?10:date.month-1]+"/"+(date.day===0?25:date.day)} style={{width:Math.floor(width/2)+"px", height:((height<500)?2*height:height)-20+"px", borderWidth:"0px", overflow:"hidden"}}></iframe>
        </div>
      </div>}
    </div>
  );
}

export default App;
