//Componentes
import SuccessMessage from "../../../components/common/messages/SuccessMessage"
import ErrorMessage from "../../../components/common/messages/ErrorMessage"
import WillDelete from "../../../components/admin/WillDelete"
import ListWithSearch from "../../../components/admin/ListWithSearch"

//Layouts
import Loading from "../../../layouts/Loading"

// Hooks
import { useState } from "react"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function HomeWorks(){
    // Visibilidade do formuluário de adição e da confirmação de excluir item
    const [visibilityAlertOptions, setVisibilityAlertOptions] = useState(false)
    const [idToDelete, setIdToDelete] = useState("")

    const [messageSuccess, setMessageSuccess] = useState("")
    const [messageError, setMessageError] = useState("")

    const location = useLocation()
    const {message} = location.state || {}

    useEffect(() => {
        if(message){
            setMessageSuccess(message)
        }
    }, [message])

    // Visibilidade da confirmação de excluir o item
    function ShowConfirmationToDelete(){
        setVisibilityAlertOptions(!visibilityAlertOptions)
    }

    return(
        <div className="p-6 mt-10 mb-10">

            {messageSuccess && (
                <SuccessMessage message={messageSuccess} setMessage={setMessageSuccess}/>
            )}

            {messageError && (
                <ErrorMessage message={messageError} setMessage={setMessageError}/>
            )}
            
            <ListWithSearch 
            title="Obras" 
            dataToSearch="obras" 
            ShowConfirmationToDelete={ShowConfirmationToDelete}
            setIdToDelete={setIdToDelete}
            wasChanged={messageSuccess}
            />

            <WillDelete
            dataTypeToDelete="obras"
            idToDelete={idToDelete} 
            isOpen={visibilityAlertOptions}
            onClose={() => setVisibilityAlertOptions(false)}
            setMessageSuccess={setMessageSuccess}
            setMessageError={setMessageError}
            />
        </div>
    )
}

export default HomeWorks


    

    
   


