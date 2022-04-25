import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { getRequest } from '../api/fetchRequest'
import { useGlobalContext } from '../context'


const Home = () => {
  const { section, classes, handleSchool} = useGlobalContext()

  const handleRequest = async () => {
    const result = await getRequest('school/section')
    handleSchool(result)
  }
  
  useEffect(() => {
    handleRequest()
    // eslint-disable-next-line
  }, [section, classes])
  return (
    <main className='home'>
      <Navbar />
      <Sidebar />
      <Outlet />
    </main>
  )
}

export default Home