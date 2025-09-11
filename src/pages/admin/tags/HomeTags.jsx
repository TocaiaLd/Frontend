//Componentes
import ErrorMessage from "../../../components/common/messages/ErrorMessage"
import SuccessMessage from "../../../components/common/messages/SuccessMessage"
import WillDelete from "../../../components/admin/WillDelete"
import ListWithSearch from "../../../components/admin/ListWithSearch"

//utilidades
import linkBackend from "../../../utilities/linkBackend"

//Layouts
import Loading from "../../../layouts/Loading"

// Hooks
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"

function TagsAdmin(){
        // Visibilidade do formuluário de adição e da confirmação de excluir item
    const [visibilityAlertOptions, setVisibilityAlertOptions] = useState(false)
    const [idToDelete, setIdToDelete] = useState("")
    
    // const [tagsFromDB, setTagsFromDB] = useState([])
    // const [tagsVisibility, setTagsVisibility] = useState(false)
    const [messageSuccess, setMessageSuccess] = useState("")
    const [messageError, setMessageError] = useState("")

    // Html de carregando página
    const [loading, setLoading] = useState(true)
    
    // Redirecionamento de páginas
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

    // Visibilidade da confirmação de excluir o item
    function ShowConfirmationToDelete(){
        setVisibilityAlertOptions(!visibilityAlertOptions)
    }

    if(loading){
        return <Loading/>
    }

    return(
        <div className="p-6 mt-10 mb-10">

            {messageSuccess && (
                <SuccessMessage message={messageSuccess}/>
            )}

            {messageError && (
                <ErrorMessage message={messageError}/>
            )}
            
            <ListWithSearch 
            title="Tags" 
            dataToSearch="tags" 
            ShowConfirmationToDelete={ShowConfirmationToDelete}
            setIdToDelete={setIdToDelete}
            wasChanged={messageSuccess}
            />

            <WillDelete
            dataTypeToDelete="tags"
            idToDelete={idToDelete} 
            isOpen={visibilityAlertOptions}
            onClose={() => setVisibilityAlertOptions(false)}
            setMessageSuccess={setMessageSuccess}
            setMessageError={setMessageError}
            />
        </div>
    )
}

export default TagsAdmin


    

    
   


