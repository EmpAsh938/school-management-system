import React, { useState } from 'react'
import { deleteRequest, getRequest } from '../api/fetchRequest'
import { useGlobalContext } from '../context'

const StudentClass = ({item}) => {
    const [students, setStudents] = useState([])
    const [show, setShow] = useState(false)

    const { setIsEditing, setEditId, stdInfo, setStdInfo, addClassSection, handleError } = useGlobalContext()

    const handleClick = async (cname) => {
        if(students.length === 0) {
            const result = await getRequest(`student/get/${cname}`)
            setStudents([...result])
        }
        setShow(!show)   
    }


    const handleEdit = (sid,sname,classname,section,rollno) => {
        setIsEditing(true)
        setEditId(sid)
        setStdInfo({...stdInfo, name:sname,cname:classname, section, rollno})
    }

    const handleDelete = async (id) => {
        setShow(false)
        const result = await deleteRequest('student/remove', {sid:id})
        if (typeof result == 'object' && result !== null) {
            addClassSection('')
            handleError('Student Removed')
          } else {
            handleError(result)
          }
    }
  return (
      <div className='studentclass'>
            <div className='studentclass__top'>
                <h3>{item.classname}</h3>
                <button onClick={() => handleClick(item.classname)}>{show ? 'Hide' : 'Show'}</button>
            </div>
            {show && <div className='studentclass__bottom'>
                {students.length > 0 ? (<div>
                    
                    {students.map(item => {
                        const { sid, sname, classname, section, rollno } = item
                        return (
                            <div key={sid}>
                                <h4>{sname}</h4>
                                <h4>{classname}</h4>
                                <h4>{section}</h4>
                                <h4>{rollno}</h4>
                                <button onClick={()=>handleEdit(sid,sname,classname,section,rollno)}>Edit</button>
                                <button onClick={() => handleDelete(sid)}>Delete</button>
                            </div>
                        )
                    })}
                </div>) : (<p>No students to display</p>)}
            </div>}
        </div>
  )
}

export default StudentClass