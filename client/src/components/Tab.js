import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'

const Tab = ({path, title, Icon}) => {
  const {toggleSidebar} = useGlobalContext()

  return (
    <Link to={path} className="tab" onClick={toggleSidebar}>
        <Icon />
        <h3>{title}</h3>
    </Link>
  )
}

export default Tab