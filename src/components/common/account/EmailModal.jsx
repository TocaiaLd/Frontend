import { useState } from "react"
import { createPortal } from "react-dom"
import { useNavigate } from "react-router-dom"

function EmailModal({visibility, functionVisibility}){
    
    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()
    
    if(!visibility){
        return null
    }
    
    function handleChange(e){
        const name = e.target.name
        const value = e.target.value
        
        setInputs((prev) => ({...prev, [name]: value}))
    }
    
    function SendCode(e){
        e.preventDefault()
        
        fetch("http://localhost:3000/api/conta/enviar-codigo", {
            method: "get",
            headers: {"Content-Type":"application/json"},
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            if(!data.success){
                return console.log(data.message)
            }
            console.log(data.message)
            navigate(0)
        })
        .catch((error) => console.log(error))
    }

    function SaveChanges(e){
        e.preventDefault()

        fetch("http://localhost:3000/api/conta/novo-email", {
            method: "post",
            headers: {"Content-Type":"application/json"},
            credentials: "include",
            body: JSON.stringify({
                newEmail: inputs.newEmail,
                code: inputs.code
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if(!data.success){
                return console.log(data.message)
            }
            console.log(data.message)
            // navigate(0)
        })
        .catch((error) => console.log(error))
    }


    return createPortal(
        <div className="fixed inset-0 bg-[#000000ad] flex justify-center items-center z-50">

            <form onSubmit={SaveChanges} className="rounded-2xl p-6 bg-gray-800 w-[90%] max-w-[400px] max-h-[90vh] overflow-y-auto relative">
                <label onClick={functionVisibility} htmlFor="edit-email" className="absolute top-3 right-3 cursor-pointer text-xl font-bold">
                    &times;
                </label>

                <h2 className="text-xl font-bold">Alterar Email</h2>

                <p className="mb-1">
                    Clique no botão enviar para receber o código no seu email
                </p>

                <label htmlFor="email">Novo email</label>
                <input 
                onChange={handleChange} 
                id="newEmail" 
                type="email" 
                name="newEmail" 
                placeholder="Novo email" 
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />

                <label htmlFor="code">Código de verificação</label>
                
                <div className="w-full relative flex mb-4 items-center">
                    <input 
                    onChange={handleChange} 
                    id="code" 
                    name="code"
                    type="text" 
                    placeholder="Código" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    
                    <button 
                    type="button" 
                    className="btn-save bg-blue-500 rounded-full px-2 py-1 hover:bg-blue-600 absolute right-1 hover:cursor-pointer" 
                    onClick={SendCode}>Enviar</button>
                </div>

                <div className="flex justify-end space-x-2">

                    <button onClick={functionVisibility} className="btn-cancel cursor-pointer px-4 py-2 rounded bg-red-500 hover:bg-red-700">Cancelar</button>
                    <button className="btn-save bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">Salvar</button>

                </div>
            </form>

        </div>,
        document.body
    )
}

export default EmailModal