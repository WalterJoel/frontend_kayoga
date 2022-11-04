import React,{useState} from 'react';

const Context  = React.createContext({});

//Simplemente paso a los hijos el valor de jwt
export function UserContext({children}) {
    const [jwt, setJWT] = useState(null);
    return <Context.Provider value ={{jwt, setJWT}}>
        {children}
    </Context.Provider>
     
}

export default Context;