// Hooks
import { useState} from "react"
import { createPortal } from "react-dom"

//utilidades
import linkBackend from "../../utilities/linkBackend"

//componentes
import CancelDeleteButton from "./buttons/CancelDeleteButton"
import ConfirmDeleteButton from "./buttons/ConfirmDeleteButton"

function WillDelete({isOpen, onClose, dataTypeToDelete, idToDelete, setMessageError, setMessageSuccess}) {
  
  if(!isOpen) return null

  function DeleteOne(){
    fetch(`${linkBackend}/painel-administrativo/${dataTypeToDelete}/excluir/${idToDelete}`, {
        method: "delete",
        credentials: "include",
        headers: {"Content-Type":"application/json"},
    })
    .then((res) => res.json())
    .then((data) => {
      if(!data.success){
        setMessageError(data.message)
        return onClose()
      }
      setMessageSuccess(data.message)
      onClose()

    })
    .catch((error) => {
      onClose()
      console.log(error)
    })
  }
  
  return createPortal(
    <div className="fixed inset-0 bg-[#000000ad] flex justify-center items-center z-50">
      
      <div className="bg-gray-800 p-6 rounded shadow-lg max-w-sm text-center">
        
        <p className="mb-4">Tem certeza que deseja excluir?</p>

        <div className="flex justify-center gap-4">
          
          <ConfirmDeleteButton onClick={DeleteOne}/>

          <CancelDeleteButton onClick={onClose}/>

        </div>

      </div>

    </div>,
    document.body
  )
}

export default WillDelete