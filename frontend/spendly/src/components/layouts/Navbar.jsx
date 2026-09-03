import React, { useState } from 'react'
import {HiOutlineMenu, HiOutlineX} from 'react-icons/hi'
import SideMenu from './SideMenu'

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false)
  return (
    <div className="flex gap-5 bg-background01 border-b border-borders backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button className='text-text block lg:hidden' onClick={()=>{setOpenSideMenu(!openSideMenu)}}>
        {openSideMenu ? (
          <HiOutlineX className="text-2xl"/>
        ):(
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-text text-lg font-medium">Spendly</h2>

      {openSideMenu && (
        <div className="fixed top-15.25 -ml-4 bg-background01">
            <SideMenu activeMenu={activeMenu}/>
        </div>
      )}
    </div>
  )
}

export default Navbar