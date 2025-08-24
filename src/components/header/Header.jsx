import React from 'react'
import Nav from './nav'
import Logo from './Logo'   

function Header() {
  return (
    <>
     {/* <div className=' sticky top-0 z-[1]mx-auto flex w-full max-w-7xl flex-wrap  items-center justify-between border-b border-gray-100 bg-background p-[2em ]0 font-sans font-bold uppercase text-text-primary backdrop-blur-[100px ] dark:border-orange-400 dark:bg-d-background dark:text-d-text-primary bg-gray-800'>  */}
      <div className='  sticky top-0 z-[1]  flex  items-center justify-between    gap-4  border-b border-orange-400  font-sans font-bold uppercase text-text-primary backdrop-blur-[100px ] dark:border-orange-400 dark:bg-d-background dark:text-d-text-primary bg-gray-800'> 
      
       <Logo /> 

       <Nav />
      
    </div>
    </>
  )
}

export default Header