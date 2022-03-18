import React from 'react'

const Homebox = ({ Icon, num, title}) => {
  return (
    <div className="dashboard__box">
        <Icon />
        <span>{num}</span>
        <h3>{num === 1 ? title : title === "class" ? "classes" : title+"s"}</h3>
    </div>
  )
}

export default Homebox