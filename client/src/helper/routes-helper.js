import { Navigate } from 'react-router-dom'


export const ProtectedRoute = ({children, isUser}) => {
    if (isUser){
        return children
    }
    return <Navigate to='/login' replace />
}
export const PublicRoute = ({children, isUser}) => {

    if (isUser){
        return <Navigate to='/' replace/>
    }
    return children
}