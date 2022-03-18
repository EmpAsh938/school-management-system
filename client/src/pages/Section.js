import React, { useState } from 'react'
import { useGlobalContext } from '../context'
import { deleteRequest, postRequest } from '../api/fetchRequest'

const Section = () => {
  const [input, setInput] = useState({
    classname:'',
    sections: '',
  })
  const [actionId, setActionId] = useState('a')
  const { isEditing, toggleEdit, isError, errorMessage, handleError, school, addClassSection } = useGlobalContext()

  const handleClick = async(e) => {
    e.preventDefault()
    const {classname, sections} = input 
    if (!classname || !sections) {
      handleError('Fields cannot be empty')
    } else {
      const result = await postRequest('school/section',{classname, sections})
      if (typeof result == 'object' && result !== null){
        addClassSection(classname, sections)
        handleError('added')
      } else {
        handleError(result)
      }
      setInput({classname:'', sections: ''})
    }
  }
  
  const handleDelete = async(name, id) => {
    const result = await deleteRequest('school/section', {classname: name, section: id})
    if (typeof result == 'object' && result !== null) {
      addClassSection(name)
      handleError('Removed section')
    } else {
      handleError(result)
    }

  }

  const handleEdit = (name, val) => {
    setInput({...input, classname: name,sections: val})
    if (!isEditing){
      toggleEdit()
    }
  }

  return (
    <div className="section">
      <h3>Manage Section</h3>
      <div className="section__container class__container">
        <form className="section__form">
          <h4>Add Section</h4>
          {isError && (<p>{errorMessage}</p>)}
          <input type="text" name="section" value={input.sections} onChange={e=>setInput({...input, sections:e.target.value})}/>
          <select onChange={e=>setInput({...input, classname:e.target.value})}>
            <option>choose class</option>
            {school.length > 0 && (school.map((item, id) => {
              return (<option key={id} value={item.classname}>class {item.classname}</option>)}))}
          </select>
          <button onClick={handleClick}>{isEditing ? 'Edit' : 'Add'}</button>
        </form>
        <div className="section__view class__view">
          <h4>List</h4>
          {school.length > 0 ? (school.map((item, id) => {
            const {classname, section} = item
            return (
              <div key={id+1} className="section__view--box class__view--box">
                <span>{id + 1}</span>
                <p>{classname}</p>
                <select onChange={e=>setActionId(e.target.value)}>{section.split('').map((item, id) => {
                  return (
                    <option key={id} value={item}>section {item}</option>
                  )})}
                </select>
                <div className="class__action">
                  <button onClick={() => handleEdit(classname, actionId)}>edit</button>
                  <button onClick={() => handleDelete(classname, actionId)}>delete</button>
                </div>
              </div>
            )})) : (<p>fetching results</p>)}
        </div>
      </div>
    </div>
  )
}

export default Section