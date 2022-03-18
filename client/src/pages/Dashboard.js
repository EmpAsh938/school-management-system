import React, { useEffect, useState } from 'react'
import { MdFormatShapes } from 'react-icons/md'
import { SiGoogleclassroom } from 'react-icons/si'
import Homebox from '../components/Homebox'
import { useGlobalContext } from '../context'

const Dashboard = () => {
  const {school} = useGlobalContext()
  const [count, setCount] = useState({classes: 0, sections: 0})
  
  useEffect(() => {
    let flag = school.reduce((prev, next) => {
      if (next.section){
        prev += next.section.split('').length
      }
      return prev
    }, 0)
    setCount({...count, classes:school.length, sections:flag})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [school])
  return (
    <div className="dashboard">
      <Homebox Icon={SiGoogleclassroom} num={count.classes} title="class"/>
      <Homebox Icon={MdFormatShapes} num={count.sections} title="section"/>
    </div>
  )
}

export default Dashboard