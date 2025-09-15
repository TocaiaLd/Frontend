//hooks 
import { useState, useEffect } from "react"

//utilidades
import linkBackend from "../../../utilities/linkBackend"

function FollowWork({id, setMessageError}){
    const [isFollowed, setIsFollowed] = useState(false)
    
    useEffect(() => {
        fetch(`${linkBackend}/obra/checar-seguimento/${id}`, {
            method: "get",
            headers: {"Content-Type":"application/json"},
            credentials: "include"
        })
        .then((res) => res.json())
        .then((data) => {
            setIsFollowed(data.follow)
        })
    }, [])
    
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
            setIsFollowed(data.follow)
        })
        .catch((error) => {
            setMessageError(error.message)
        })
    }
    
    if(isFollowed){
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


