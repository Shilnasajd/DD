import React from 'react'
import AboutUs from '../home/AboutUs'
import GetInTouch from '../home/GetinTouch'
import Hero from './Hero'
import Items from './Items'
import Reserve from './Reserve'

const RentalsComponent = () => {
  return (
    <>
    {/* <div className="relative z-20 bg-white text-black w-full p-10" >
    <CameraRentals/>
    </div> */}
  
    <div className="relative z-20 bg-white text-black w-full pt-1 pb-4">
    <Hero/>
    </div>
    <div className="relative z-20 bg-white text-black w-full pt-1">
    <Items/>
    </div>
    {/* <div className="relative z-20 bg-white text-black w-full pt-1">
    <Reserve/>
    </div> */}

      </>
  )
}

export default RentalsComponent