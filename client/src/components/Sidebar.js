import React from 'react'
import { FaHome } from 'react-icons/fa'
import { MdFormatShapes, MdGroups } from 'react-icons/md'
import { SiGoogleclassroom } from 'react-icons/si'
import { IoClose } from 'react-icons/io5'
import Tab from './Tab'
import { useGlobalContext } from '../context'

const Sidebar = () => {
  const {logout, sidebar, toggleSidebar} = useGlobalContext()

  return (
    <aside className={sidebar ? 'sidebar sidebar--active' : 'sidebar'}>
      <div className="sidebar__container">
        <div className="sidebar__wrapper">

        <div className="sidebar__title">
          <h2>School Management System</h2>
          <button onClick={toggleSidebar}><IoClose /></button>
        </div>
        <div className="sidebar__wrapper">
          <Tab path="/" title="dashboard" Icon={FaHome} />
          <Tab path="class" title="manage class" Icon={SiGoogleclassroom} />
          <Tab path="section" title="manage section" Icon={MdFormatShapes} />
          <Tab path="student" title="manage student" Icon={MdGroups} />
          
        </div>
        </div>
        <div className="sidebar__logout">

          <button onClick={logout}>LogOut</button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar