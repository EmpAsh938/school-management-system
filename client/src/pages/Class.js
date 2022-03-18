import React, { useState } from 'react'
import { useGlobalContext } from '../context'
import { deleteRequest, postRequest, putRequest } from '../api/fetchRequest'

const Class = () => {
  const [input, setInput] = useState('')
  const [oldname, setOldname] = useState('')
  const { isError, isEditing, toggleEdit, addClassSection, errorMessage, school, handleError } = useGlobalContext()
  
  const handleAdd = async(e) => {
    e.preventDefault()
    if (!input) {
      handleError('Field cannot be empty')
    } else if (isEditing){
      const result = await putRequest('school/class', {oldclassname:oldname, newclassname:input})
      if (typeof result === 'object' && result !== null){
        addClassSection(input)
        handleError('edit successful')
      } else {
        handleError('edit failed')
      }
      toggleEdit()
    } else {
      const result = await postRequest('school/class', {classname:input})
      if (typeof result === 'object' && result !== null) {
        addClassSection(input)
        handleError('class added')
      } else {
        handleError(result)
      }

    }
    setInput('')
  }

  const handleDelete = async(value) => {
    const result = await deleteRequest('school/class', {classname: value})
    if (typeof result == 'object' && result !== null) {
      handleError(value+" deleted with its all sections.")
      addClassSection(value)
    } else {
      handleError('Deletion failed')
    }
  }

  const handleEdit = async(name) => {
    setOldname(name)
    setInput(name)
    if (!isEditing){
      toggleEdit()
      
    }
  }

  return (
    <div className='class'>
      <h3>Manage Class</h3>
      <div className='class__container'>
        <form className='class__form'>
          <h4>Add Class</h4>
          {isError && <p>{errorMessage}</p>}
          <input type='text' name='classname' value={input} onChange={e=>setInput(e.target.value)}/>
          <button onClick={handleAdd}>{isEditing ? 'Edit': 'Add'}</button>
        </form>
        <div className='class__view'>
          <h4>List</h4>
          <div className="class__view--box">
            <span>S.no</span>
            <p>Classes</p>
            <p>Actions</p>
          </div>
          {school.length > 0 ? (school.map((item, id) => { 
          return (
          <div key={id} className='class__view--box'>
            <span>{id+1}</span>
            <p>{item.classname}</p>
            <div className='class__action'>
              <button onClick={() => handleEdit(item.classname)}>edit</button>
              <button onClick={() => handleDelete(item.classname)}>delete</button>
            </div>
          </div>)})
          ) : (<p>items fetching</p>)}

        </div>
      </div>
    </div>
  )
}

export default Class