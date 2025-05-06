import React from 'react'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Home from '../../components/home'

const HomePage = () => {
  return (
    <>
  
    <Header/>
   <Home/>
   <div className='relative z-20 bg-white text-black w-full '>
<Footer/>
   </div>
 
   </>
  )
}

export default HomePage