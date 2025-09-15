import { createContext, useState, useEffect } from "react";
import linkBackend from "../utilities/linkBackend";

export const AccountContext = createContext()

export const AccountProvider = ({children}) => {
    const [account, setAccount] = useState(false)

    useEffect(() => {
        fetch(`${linkBackend}/conta/checar-login`, {
            method: "get",
            headers: {"Content-Type":"application/json"},
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.auth){
                setAccount(data.user)
            }
        })
    }, [])
    
    return (
        <AccountContext.Provider value={{account, setAccount}}>
            {children}
        </AccountContext.Provider>
    )
}