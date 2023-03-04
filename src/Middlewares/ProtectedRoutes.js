
import { useNavigate } from 'react-router-dom';


export const ProtectedRoute = (user,children) => {

    let navigateToAparadorPage = useNavigate();

    if(!user){
        return navigateToAparadorPage('/LoginPage');

    }
    return children;

}