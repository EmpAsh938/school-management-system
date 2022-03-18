import React from 'react'
import { FaBars } from 'react-icons/fa'
import { BsPersonSquare, BsBellFill } from 'react-icons/bs'
import {useGlobalContext} from '../context'

const Navbar = () => {
  const {toggleSidebar} = useGlobalContext()
  return (
    <nav className='navbar'>
      <div className="navbar__container">
        <div className="navbar__menu">
          <h2>School Management System</h2>
          <button onClick={toggleSidebar}><FaBars/></button>
        </div>
        <div className="navbar__profile">
          <button><BsBellFill /></button>
          <button><BsPersonSquare /></button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar