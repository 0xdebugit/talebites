// import NavBar from '../../components/navbar';
import { useState, useRef, useEffect } from 'react';

export default function Progress({childFunc, childFuncprev, childFuncnext, totalpages}) {

    // const [maxtime, setMaxtime] = useState(0);
    const maxtime = useRef(0);

    const [currentProgress, setCurrentProgress] = useState(0);


    const playing = useRef(true);

    const aniFrame = useRef(null);

    const startfrompast = useRef(false);

    const minusone = useRef(false);
    const plusone = useRef(false);

    const currentPage = useRef(0);
    const delayTime = useRef(4000);

    function alertUser() {
        alert('You clicked!')
    }    

    useEffect(() => {
        childFunc.current = aniToggle;
        childFuncprev.current = aniprev;
        childFuncnext.current = aninext;
        maxtime.current = totalpages * delayTime.current;
    }, []);

    const aniToggle = () => {
        if(playing.current){
            playing.current = false;
            startfrompast.current = false;
        }else{
          playing.current = true;
          startfrompast.current = true;
          aniFrame.current = window.requestAnimationFrame(aniPlay);
        }
      }   
      
    const aniprev = () => {
        minusone.current = true;
        playing.current = true;
        currentPage.current = currentPage.current - 1;

        
        cancelAnimationFrame(aniFrame.current);
        aniFrame.current = window.requestAnimationFrame(aniPlay);

    }

    const aninext = () => {
        plusone.current = true;
        playing.current = true;
        currentPage.current = currentPage.current + 1;

        cancelAnimationFrame(aniFrame.current);
        aniFrame.current = window.requestAnimationFrame(aniPlay);     
    }    
  


    var start;
    const oldstart = useRef(0);
    const minitimer = useRef(0);

    const aniPlay = (ts) => {
        if(start === undefined){
            start = ts
        }
        
        if(startfrompast.current){
            start = ts - oldstart.current
            startfrompast.current = false;
        }        

        if(minusone.current){
            start = ts - (currentPage.current * delayTime.current);
            minitimer.current = currentPage.current * delayTime.current;
            minusone.current = false;
        }

        if(plusone.current){
            start = ts - (currentPage.current * delayTime.current);
            minitimer.current = currentPage.current * delayTime.current;
            plusone.current = false;
        }        
        
        const elapsed = ts - start;


        // console.log(elapsed, minitimer.current != (Math.floor(elapsed / delayTime.current) * delayTime.current), minitimer.current);


        if(playing.current && elapsed <= maxtime.current) {
            oldstart.current = elapsed;  
            setCurrentProgress(elapsed);

            if( (Math.floor(elapsed / delayTime.current) * delayTime.current) % delayTime.current == 0 && (minitimer.current != (Math.floor(elapsed / delayTime.current) * delayTime.current)) ) {
                minitimer.current = (Math.floor(elapsed / delayTime.current) * delayTime.current);                
                currentPage.current +=1;
            }
            aniFrame.current = window.requestAnimationFrame(aniPlay);        
        }
        
    }

  return(
    <div className='flex h-1 w-full relative items-center bg-slate-300 justify-start'>
        <div className='rounded-lg h-1 bg-sky-800 dark:bg-sky-600' style={{width: `${(currentProgress / (maxtime.current) )*100}%`}}>
            {/* {currentProgress} */}
        </div>
    </div>
  )
}