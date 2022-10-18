import React, { Fragment, useEffect, useState } from 'react'
import 'h8k-components'

import { image1, image2, image3, image4 } from './assets/images'
import { Thumbs, Viewer } from './components'
import { act } from 'react-test-renderer'

const title = 'Catalog Viewer'

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1
    },
    {
      thumb: image2,
      image: image2
    },
    {
      thumb: image3,
      image: image3
    },
    {
      thumb: image4,
      image: image4
    }
  ];


  const [ catalogs ] = useState([...catalogsList])
  const [ activeIndex, setActiveIndex ] = useState(0)
  const [ slideTimer, setSlideTimer ] = useState(null)
  const [ slideDuration ] = useState(3000)
  const [intervalId, setIntervalId] = useState(null);
  const [startSlideShow, setStartSlideShow] = useState(false);

  const activeIndexChange = (np) => {
    np == 'n' && activeIndex == catalogs.length-1 ? setActiveIndex(0): '';
    np == 'p' && activeIndex ==0 ? setActiveIndex(catalogs.length-1): '';
    np == 'n' && activeIndex < catalogs.length-1 && activeIndex != catalogs.length-1 ? setActiveIndex(activeIndex+1) : '';
    np == 'p' && activeIndex <= catalogs.length-1 && activeIndex != 0 ? setActiveIndex(activeIndex-1) : '';
  }

  const handleNav = (np) => {
    //console.log("786 In Handle nav", activeIndex, catalogs.length-1, np);
    activeIndexChange(np);
  }

  console.log("activeIndex Catelogs Length ===>",activeIndex,catalogs.length-1);

  const startSlideChange = () => {
    const intervalIdNew = setInterval(()=>{
      setActiveIndex((stateIndex)=>{
        return stateIndex == catalogs.length-1 ? 0 : stateIndex+1;
      })
    },slideDuration);
    setIntervalId(intervalIdNew);
  }

  const handleSlideShowToggle = (e) => {
    console.log("handleSlideShowToggle ===>",e.target.checked);
    if(e.target.checked==true){
      startSlideChange(intervalId);
    }else{
      clearInterval(intervalId);
    }
  }



  return (
    <Fragment>
      <h8k-navbar header={ title }></h8k-navbar>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={ catalogs[activeIndex].image } />
            <div className='layout-row justify-content-center align-items-center mt-20'>
            <button 
              className="icon-only outlined"
              data-testid="prev-slide-btn"
              onClick={()=> {handleNav('p')}}
            >
              <i className="material-icons">arrow_back</i>
            </button>
              <Thumbs 
                items={ catalogs } 
                currentIndex={ activeIndex }
                setActiveIndex = {setActiveIndex} 
              />
            <button 
              className="icon-only outlined"
              data-testid="next-slide-btn"
              onClick={()=> {handleNav('n')}}
            >
              <i className="material-icons">arrow_forward</i>
            </button>
            </div>
          </div>
        </div>
        <div className='layout-row justify-content-center mt-25'>
          <input 
            type='checkbox'
            data-testid='toggle-slide-show-button'
            onClick={(e)=>{handleSlideShowToggle(e)}}
          /> 
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  )
}

export default App

