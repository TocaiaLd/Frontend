//Hooks
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

// Componentes e layouts
import Loading from "../../layouts/Loading"
import ErrorMessage from "../../components/common/messages/ErrorMessage"
import WorkCardInfo from "../../components/common/WorkCardInfo"
import ListOfChapters from "../../components/common/ListOfChapters"

function Work(){
    const {slug} = useParams()
    const navigate = useNavigate()

    const [work, setWork] = useState({})
    const [loading, setLoading] = useState(true)

    const [messageError, setMessageError] = useState("")
    
    useEffect(() => {
        fetch(`http://localhost:3000/api/obra/${slug}`, {
            method: "get",
            headers: {"Content-Type":"application/json"},
            credentials: "include"
        })
        .then((res) => res.json())
        .then((data) => {
            if(!data.success){
                return navigate(
                    "/pagina-de-erro",
                    {state: {message: error.message}}
                )
            }
            
            setLoading(false)
            setWork(data.work)
            
        })
        .catch((error) => {
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
        
        <main className="max-w-6xl mx-auto px-4 py-8 mb-10">
            
            {messageError && (
                <ErrorMessage message={messageError}/>
            )}

            {/* <!-- Topo: Capa e Infos --> */}
            <WorkCardInfo work={work} setMessageError={setMessageError}/>
            
            {/* <!-- Lista de Capítulos --> */}
            <ListOfChapters chapters={work.chapters}/>

        </main>
        
        
    )
}

export default Work

