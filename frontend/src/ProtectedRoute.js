import { Navigate } from "react-router-dom"

const ProtectedRoute = ({isAuthentication,children}) =>{
    if(!isAuthentication){
        return <Navigate to="/login" replace />
    }
    return children
}
export default ProtectedRoute;