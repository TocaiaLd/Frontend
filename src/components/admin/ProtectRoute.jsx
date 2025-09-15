//Hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Componentes e layouts
import Loading from "../../layouts/Loading"

// utiliades
import linkBackend from "../../utilities/linkBackend"

function ProtectRoute({children=null}){
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${linkBackend}/painel-administrativo/checar-administrador`, {
            method: "get",
            headers: {"Content-Type":"application/json"},
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.auth == false){
                return navigate(
                    "/login",
                    {state: {message: "Essa página requer login para ser acessada."}}
                )
            }
            
            if(!data.isAdmin){
                return navigate(
                    "/página-de-erro",
                    {state: {message: "Acesso negado. Você não tem acesso a essa rota."}}
                )
            }

            setLoading(false)

        }).catch((error) => {
            navigate(
                "/pagina-de-erro",
                {state: {message: error.message}}
            )
        })

    }, [])

    if(loading){
        return <Loading/>
    }

    return children

}

export default ProtectRoute