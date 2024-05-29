import React from 'react';
import { NavLink } from 'react-router-dom';



const Navbar = () => {
  return (
      <nav className='bg-red-700/100 border-b border-red-600'>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
              <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
                  <a className='flex flex-shrink-0 items-center mr-4' to='/'>
                      
                             
                             <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                                Spam Detector
                             </span>
                  </a>
                  <div className='md:ml-auto'>
                             <div className='flex space-x-2 p-3'>
                                 <NavLink to='/' className={({isActive}) => isActive?'bg-gray-800 text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2':'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'}>
                                     Home
                                 </NavLink>
                                 <NavLink to='/dashboard' className={({isActive}) => isActive?'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2':'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'}>
                                     Dashboard
                                 </NavLink>
                                 
                             </div>
                         </div>
              </div>
              
          </div>
          
    </nav>
  )
}

export default Navbar
