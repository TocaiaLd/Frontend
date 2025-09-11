// Hooks
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// Componentes
import OptionCard from "../../components/admin/OptionCard"

//Layouts
import Loading from "../../layouts/Loading"

//Utilidadades
import linkBackend from "../../utilities/linkBackend"

function PanelAdmin(){
    const [loading, setLoading] = useState(false)
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

    return(
        <>
            {/* Titulo */}
            <h1 className="text-3xl font-bold mb-8 mt-8 text-center">Painel Administrativo</h1>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto">
                {/* Tags */}
                <OptionCard 
                tittle="Tags" 
                description="Criar, alterar e excluir Tags" 
                link="/painel-administrativo/tags"
                />

                {/* Obras */}
                <OptionCard 
                tittle="Obras" 
                description="Criar, alterar e excluir Obras" 
                link="/painel-administrativo/obras"
                />

                {/* Obras */}
                <OptionCard 
                tittle="Capítulos" 
                description="Criar, alterar e excluir Capítulos" 
                link="/painel-administrativo/capitulos"
                />

            </div>   
        </>
    )
}

export default PanelAdmin
