//hooks 
import { useState, useEffect, useContext } from "react"
import { AccountContext } from "../../../context/AccountContext"

//utilidades
import linkBackend from "../../../utilities/linkBackend"

function FollowWork({id, setMessageError}){
    
    const {account, setAccount} = useContext(AccountContext)
    
    function FollowWork(e){
        e.preventDefault()

        fetch(`${linkBackend}/obra/seguir-obra/${id}`, {
            method: "post",
            headers: {"Content-Type":"application/json"},
            credentials: "include"
        })
        .then((res) => res.json())
        .then((data) => {
            if(!data.success){
                return setMessageError(data.message)
            }
            setAccount((account) => ({...account, followedWorks: [...account.followedWorks, id] }))
        })
        .catch((error) => {
            setMessageError(error.message)
        })
    }

    if(account.followedWorks.includes(id)){
        return(
            <button onClick={FollowWork} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl shadow transition hover:cursor-pointer">
                Parar de Seguir
            </button>
        )
    }

    return(
        <button onClick={FollowWork} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow transition hover:cursor-pointer">
            Seguir Obra
        </button>
    )
}

export default FollowWork


