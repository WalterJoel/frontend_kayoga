import { useCallback, useContext } from 'react';
import Context from '../Contexts/UserContext';

 
export default function useUser(){
    const {jwt,setJwt}  = useContext(Context);
    
    const login  = useCallback(()=>{
        setJwt('Test')
    },[setJwt]);
    console.log(jwt)
    return {
        isLoggedIn:Boolean(jwt),
        login
    }
}