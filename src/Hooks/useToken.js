import React, {useState} from 'react'

//Hook personalizado creado por Joel para replicar a cada usuario que un usuario se ha logueado satisfactoriamente 

const useToken = () => {
    const getToken =() =>{
        const tokenString = localStorage.getItem('token')
        const userToken   = JSON.parse(tokenString)
        return userToken?.token
    } 

    const [token, setToken] = useState(getToken())
    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken))
        setToken(userToken.token)
      }
      return {
        setToken: saveToken,
        token
      }
    }

export default useToken