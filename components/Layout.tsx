import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { isMenuOpen, menuNavState } from '../atom/menuNav';
import Backdrop from './Backdrop';
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }:{ children: React.ReactNode}) => {
    const [openMenuNav,setMenuNav] = useRecoilState(menuNavState);



  return (
    <>
        {openMenuNav ? (
        <Backdrop>
        <Sidebar />

        </Backdrop>
        ) : null}
        <Header />
        {children}
    </>
  )
}

export default Layout