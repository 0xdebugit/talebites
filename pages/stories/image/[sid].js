import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
// import styles from '../styles/Home.module.css'

// import NavBar from '../../components/navbar';
import Progress from '../../../components/Progress';
import { playButton, pauseButton, backwardButton, forwardButton, homeButton, sendButton } from '../../../components/Icons';
import { supabase } from "../../../client";
import { useState, useRef, useEffect } from 'react';


function Home(props) {

  const childFunc = useRef(null);
  const childFuncprev = useRef(null);
  const childFuncnext = useRef(null);

  const router = useRouter();
//   const { sid } = router.query;

  const [darkToggle, setDarkToggle] = useState(false);

  const [isplaying, setIsplaying] = useState(true);
  const playing = useRef(true);

  const maxtime = useRef(0);
  const [pageno, setpageno] = useState(0);

  const aniFrame = useRef(null);

  const startfrompast = useRef(false);

  const minusone = useRef(false);
  const plusone = useRef(false);

  const currentPage = useRef(0);
  const delayTime = useRef(4000);


  useEffect(() => {
    maxtime.current = props.data.length * delayTime.current;
    setTimeout(() => {
        console.log('INIT!!');
        aniToggle();
    }, 200);
  }, []);

  const aniToggle = () => {
      

      if(playing.current){
          playing.current = false;
          setIsplaying(false);
          startfrompast.current = false;
      }else{
        playing.current = true;
        setIsplaying(true);
        startfrompast.current = true;
        aniFrame.current = window.requestAnimationFrame(aniPlay);
      }

      childFunc.current();
    }   
    
  const aniprev = () => {

    let computePrevPage = currentPage.current - 1;

    if(computePrevPage >=0){
        childFuncprev.current();

        minusone.current = true;
        playing.current = true;
        setIsplaying(true);
        currentPage.current = currentPage.current - 1;
        setpageno((prev) => prev - 1);
  
        
        cancelAnimationFrame(aniFrame.current);
        aniFrame.current = window.requestAnimationFrame(aniPlay);
    }

  }

  const aninext = () => {

    let totalPages = props.data.length - 1;
    let computeNextPage = currentPage.current + 1;
    
    if(computeNextPage <= totalPages){
        childFuncnext.current();

        plusone.current = true;
        playing.current = true;
        setIsplaying(true);

        currentPage.current = currentPage.current + 1;
        setpageno((prev) => prev + 1);
        
        cancelAnimationFrame(aniFrame.current);
        aniFrame.current = window.requestAnimationFrame(aniPlay);    
    }
 
  }    



  var start;
  const oldstart = useRef(0);
  const minitimer = useRef(0);

  const aniPlay = (ts) => {

    //start when page loads
      if(start === undefined){
          console.log('NEW START', start);
          start = ts
      }
      
    //continue from saved timestamp
      if(startfrompast.current){
          console.log('OLD START');
          start = ts - oldstart.current
          startfrompast.current = false;
      }        

    //changed the elapsed time
      if(minusone.current){
          console.log('MIUS ONE TRIGGERED')
          start = ts - (currentPage.current * delayTime.current);
          minitimer.current = currentPage.current * delayTime.current;
          minusone.current = false;
      }

      if(plusone.current){
        console.log('PLUSSSS ONE TRIGGERED')
        start = ts - (currentPage.current * delayTime.current);
        minitimer.current = currentPage.current * delayTime.current;
          plusone.current = false;
      }        
      
      const elapsed = ts - start;

      if(playing.current && elapsed <= maxtime.current) {
          oldstart.current = elapsed;  
          // compute & check if elapsed is the multiple of delaytime & multiple shouldn't be old mulitple then increment page if it satisfies
          if( (Math.floor(elapsed / delayTime.current) * delayTime.current) % delayTime.current == 0 && (minitimer.current != (Math.floor(elapsed / delayTime.current) * delayTime.current)) ) {
              minitimer.current = (Math.floor(elapsed / delayTime.current) * delayTime.current);
              
              currentPage.current +=1;
              setpageno((prev) => prev + 1);

          }
          aniFrame.current = window.requestAnimationFrame(aniPlay);        
      }
      
  }

  const ComputePlayerStatus = () => {
    let readingProgress = (pageno / (props.data.length - 1) )*100
    // if(readingProgress > 99){
    //     console.log(1);
    //     return <FontAwesomeIcon icon={faRotateRight} />
    // }else 
    
    if(isplaying){
        return pauseButton
    }else{
        return playButton
    }
  }

  const navigateTo = (e, path) => {
      e.preventDefault()

      if (path === "/") {
        if(playing.current){
          aniToggle();
          console.log("I clicked on the xxsxsx Page");
        }        
        
        // then you can: 
        router.push(path)
      }
      if (path === "/posts") {
      console.log("I clicked on the Posts Page");
      // then you can: 
      // router.push(path)
      }
  };  

  async function testWebShare() {

    let sharableLink = router.pathname;
    console.log(sharableLink);
    const shareData = {
      title: 'Read this Story',
      text: 'zoom',
      url: sharableLink
    }

    // Test compatibility
    if (navigator.share === undefined) {
      alert('Unsupported share feature');
      return;
    }
  
    // Share content
    try {
      await navigator.share(shareData);
    } catch (error) {
      alert(`Error sharing: ${error}`);
    }
  }   

  return(
    <div className={`${darkToggle && 'dark'} justify-center flex min-h-screen`}>
      <div className='w-screen max-w-screen-md story-board relative flex flex-col justify-between md:shadow-2xl md:shadow-sky-800/50 dark:bg-gray-900'>

        <nav className="px-2 sm:px-4 py-2.5 dark:bg-gray-900 w-full z-20 border-b border-gray-400 flex justify-between items-center">
          <div className="container font-poppins text-md font-normal truncate w-10/12 dark:text-white">
            {props.data[0]['content']}
          </div>

          <div>
            <label className="inline-flex relative items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" onClick={() => setDarkToggle(!darkToggle)} />
              <div className="border border-sky-300 shadow-2xl w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              {/* <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span> */}
            </label>            
          </div>
        </nav>

        {
          props.data.map((item, index) => {
            const enablePicture = <Image
                className='rounded-lg'
                alt='Mountains'
                src={`https://cpuwgwurtsngqmtgsmmc.supabase.co/storage/v1/object/public/story-covers/${item.story_id}/page_${index}.png`}
                width={'300'}
                height={'300'}
                priority={true}
                // layout={'fill'}
            />              
            return(
            <div key={index} className={`story-page-2 font-poppins grid grid-cols-1 gap-6 min-h-max leading-relaxed text-justify text-2xl p-7 ${index == pageno ? '' : 'hidden'}`}>  
              <div className='story-title flex justify-center'>
                {enablePicture}
              </div>            
              <div>
                <div className={index == 0 ? 'story-title text-center font-kleeone text-4xl font-semibold dark:text-white' : 'text-xl md:text-2xl font-kleeone dark:text-white'}>
                  {index == 0 ? props.data[index]['content'] : props.data[index]['content']}
                </div>            
              </div>       
            </div> 
            );           
          })
        }

        <div>
        {/* {currentProgress} */}
        <Progress childFunc={childFunc} childFuncprev={childFuncprev} childFuncnext={childFuncnext} totalpages={props.data.length} />

        <div className="px-2 sm:px-4 py-2.5 w-full z-20 top-0 left-0">
          <div className="container flex flex-wrap justify-between items-center mx-auto font-poppins">
            <div className='transition ease-in-out hover:scale-110 flex text-slate-500 items-center text-3xl dark:text-white' onClick={(e) => navigateTo(e, '/') }>
              <button>{homeButton}</button>
            </div>

            <div className='flex justify-between w-2/5 text-3xl items-center w-3/5'>
              <button className='transition ease-in-out hover:scale-110 px-4 py-2 rounded-full text-sky-800 items-center dark:text-sky-600'  onClick={(e) => aniprev()}>
                {backwardButton}
              </button>
              <button className='transition ease-in-out hover:scale-105 bg-sky-800 px-6 py-4 rounded-full text-white items-center shadow-lg shadow-blue-500/50 dark:bg-sky-600' onClick={(e) => aniToggle()}>
                <ComputePlayerStatus />
              </button>
              <button className='transition ease-in-out hover:scale-110 px-4 py-2 rounded-full text-sky-800 items-center dark:text-sky-600' onClick={(e) => aninext()}>
                {forwardButton}
              </button>                            
            </div>
            
            <div className='transition ease-in-out hover:scale-110 flex text-slate-500 items-center text-3xl dark:text-white' onClick={(e) => testWebShare()}>
              <button>
                {sendButton}
              </button>
            </div>                        
          </div>         
        </div>
        </div>

      </div>
    </div>
  )
}

export async function getServerSideProps(context) {

    const { sid } = context.query;

    const { data, error, status } = await supabase
    .from('story-data')
    .select()
    .eq('story_id', sid);

  return { props: { data } }
}

export default Home;