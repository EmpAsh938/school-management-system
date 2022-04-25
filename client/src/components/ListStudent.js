import React from 'react'
import { useGlobalContext } from '../context'
import StudentClass from './StudentClass'

const ListStudent = () => {
    const { school } = useGlobalContext()
    
    
  return (
    <div className='liststudent'>
        {school.map((item, id) => {
            return (
                <StudentClass key={id} item={item} />
            )
        })}
    </div>
  )
}

export default ListStudent