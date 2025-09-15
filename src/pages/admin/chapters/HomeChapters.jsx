//hooks
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"

//componentes
import ErrorMessage from "../../../components/common/messages/ErrorMessage"
import SuccessMessage from "../../../components/common/messages/SuccessMessage"
import ListWithSearch from "../../../components/admin/ListWithSearch"
import WorksMap from "../../../components/admin/WorksMap"
import WillDelete from "../../../components/admin/WillDelete"

function HomeChapters({}){
    const [messageSuccess, setMessageSuccess] = useState("")
    const [messageError, setMessageError] = useState("")
    
    const [chooseWork, setChoosedWork] = useState("")

    const [isOpen, setIsOpen] = useState(false)

    const [idToDelete, setIdToDelete] = useState("")

    const location = useLocation()
    const {message} = location.state || {}

    useEffect(() => {
        if(message){
            setMessageSuccess(message)
        }
    }, [message])

    const ChooseWork = (e) => {
        const value = e.target.value
        setChoosedWork(value)
    }

    function ShowConfirmationToDelete(){
        setIsOpen(!isOpen)
    }

    return(
        
        <div className="p-6 mt-10 mb-10">
            {messageSuccess && (<SuccessMessage message={messageSuccess} setMessage={setMessageSuccess}/>)}
            {messageError && (<ErrorMessage message={messageError} setMessage={setMessageError}/>)}
            
            <ListWithSearch 
            title="Capítulos" 
            dataToSearch="capitulos"
            ShowConfirmationToDelete={ShowConfirmationToDelete} 
            setIdToDelete={setIdToDelete}
            wasChanged={messageSuccess}
            choosedWork={chooseWork}
            >
                <label htmlFor="work" className="block font-semibold mb-1">
                    Obra
                </label>

                <WorksMap onChange={ChooseWork}/>

            </ListWithSearch>

            <WillDelete
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            dataTypeToDelete="capitulos"
            idToDelete={idToDelete}
            setMessageError={setMessageError} 
            setMessageSuccess={setMessageSuccess}
            />

        </div>
    )
}

export default HomeChapters


    

    
   


