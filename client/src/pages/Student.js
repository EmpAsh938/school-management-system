import React from 'react'
import ListStudent from '../components/ListStudent'
import { useGlobalContext } from '../context'
import { postRequest, putRequest } from '../api/fetchRequest'

const Student = () => {
  const { editId, isEditing, stdInfo, setStdInfo, school, addClassSection, handleError, isError, errorMessage } = useGlobalContext()
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setStdInfo({...stdInfo, [name]:value})
  }
  const handleAdd = async (e) => {
    e.preventDefault()
    const { name, cname, section, rollno } = stdInfo
    if(!name || !cname || !section || !rollno) {
      addClassSection(name)
      handleError('some fields are empty')
    } else if(isEditing) {
      const result = await putRequest('student/update', {sid:editId,sname:name,sclass:cname,ssection:section,rollno})
      if (typeof result == 'object' && result !== null) {
        addClassSection(name)
        handleError('Student Added')
      } else {
        handleError(result)
      }
      setStdInfo({name:'',cname: '', section:'', rollno:''})
    } 
    else {
      // submit
      const result = await postRequest('student/create', {sname:name,sclass:cname,ssection:section,rollno})
      if (typeof result == 'object' && result !== null) {
        addClassSection(name)
        handleError('Student Added')
      } else {
        handleError(result)
      }
      setStdInfo({name:'',cname: '', section:'', rollno:''})
  
    }
  }
  return (
    <section className='student'>
      <h2 className='student__title'>Manage Student</h2>
      <form className='student__form' onSubmit={handleAdd}>
        <h3 className='student__title--secondary'>Add Student</h3>
        {isError && <p>{errorMessage}</p>}
        <div className='student__form--div'>
          <label>Name</label>
          <input type='text' placeholder='name' name='name' 
          value={stdInfo.name}
          onChange={handleChange}/>
        </div>
        <div className='student__form--div'>
          <label>Class</label>
          <input type="text" placeholder='cname' name='cname'
          value={stdInfo.cname}
          onChange={handleChange}/>
        </div>
        <div className='student__form--div'>
          <label>Section</label>
          <input type="text" placeholder='section' name='section'
          value={stdInfo.section}
          onChange={handleChange}/>
        </div>
        <div className='student__form--div'>
          <label>Roll No</label>
          <input type="text" placeholder='rollno' name='rollno'
          value={stdInfo.rollno}
          onChange={handleChange}/>
        </div>
        <button onClick={handleAdd}>Add</button>
      </form>
      <div>
        <h3 className='student__title--secondary'>List of Students(By Class)</h3>
        {school.length === 0 ? (<p>No Students to display.</p>) : (
          <ListStudent />
        )}
      </div>
    </section>
  )
}

export default Student