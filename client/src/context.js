import { useContext, createContext, useEffect, useState } from 'react'

const AppContext = createContext()

export const LOCAL_STORAGE_KEY = 'sms-user'

const AppProvider = ({children}) => {
    const [isUser, setIsUser] = useState(false)
    const [sidebar, setSidebar] = useState(true)
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [userDetails, setUserDetails] = useState({
        email: '',
        username: ''
    })
  const [stdInfo, setStdInfo] = useState({name:'', cname:'', section:'', rollno:''})
    const [school, setSchool] = useState([])
    const [section, setSection] = useState('')
    const [classes, setClasses] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [editId, setEditId] = useState(0)

    const toggleSidebar = () => setSidebar(!sidebar)
    const handleError = (msg) => {
        setIsError(true)
        setErrorMessage(msg)
    }
    const loginSuccess = (email, username) => {
        setIsUser(true)
        setUserDetails({...userDetails, email, username})
    }

    const handleSchool = (param) => {
        setSchool([...param])
    }

    const addClassSection = (first, second='') => {
            setClasses(first)
            setSection(second)
    }

    const toggleEdit = () => setIsEditing(!isEditing)

    const logout = () => {
        setIsUser(false)
        setUserDetails({email:'', username: ''})
        localStorage.removeItem(LOCAL_STORAGE_KEY)
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            setIsError(false)
            setErrorMessage('')
        }, 2000)
        return () => clearTimeout(timer)
    }, [isError, errorMessage])
    return (
        <AppContext.Provider value={{
            isUser,
            school,
            stdInfo,
            section,
            classes,
            sidebar,
            isError, 
            isEditing,
            errorMessage,
            editId,
            logout,
            setEditId,
            setStdInfo,
            toggleEdit,
            handleError,
            setIsEditing,
            handleSchool,
            loginSuccess,
            toggleSidebar,
            addClassSection
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext)


export default AppProvider