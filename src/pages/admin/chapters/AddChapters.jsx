// Hooks
import { useState } from "react"

// Componentes
import TextInput from "../../../components/admin/inputs/TextInput"
import SubmitButton from "../../../components/admin/buttons/SubmitButton"
import FileInput from "../../../components/admin/inputs/FileInput"
import WorksMap from "../../../components/admin/WorksMap"
import ErrorMessage from "../../../components/common/messages/ErrorMessage"

//utilidades
import linkBackend from "../../../utilities/linkBackend"
import { useNavigate } from "react-router-dom"

function AddChapters({}){
    const [messageError, setMessageError] = useState("")
    const [inputs, setInputs] = useState({})

    const [disableTitle, setDisableTitle] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const name = e.target.name

        if(e.target.type === "file"){
            const files = e.target.files

            let value = Array.from(files)
            
            setInputs((values) => ({...values, [name]: value}))

        }
        else if(e.target.type === "checkbox"){

        }
        else{
            const value = e.target.value
            setInputs((values) => ({...values, [name]: value}))
        }

    }

    // Enviar os dados setados e cadastrar obra 
    function SubmitForm(e){
        e.preventDefault()

        if(!inputs.images || !inputs.title || !inputs.work || !inputs.chapterNumber){
            return setMessageError("Preencha todos os dados adequadamente")
        }

        const formData = new FormData()
        
        for (let key in inputs){
    
            if(key === "images"){
                const images = inputs[key]
                images.map((image) => {
                    formData.append("images", image)
                })  
            }else{
                formData.append(`${key}`, inputs[key])
            }

            
        }

        fetch(`${linkBackend}/painel-administrativo/capitulos/adicionar`, {
            method: "post",
            credentials: "include",
            body: formData
        
        }).then((res)=>{
            return res.json()
        })
        .then((data) => {
            if(!data.success){
                return setMessageError(data.message)
            }
            navigate("/painel-administrativo/capitulos", {state: {message: data.message}})
        })
        .catch((error) => {
            console.log(error.message)
        })
    }
    
    return(
        <div className="p-6 mt-10 mb-10">
            <div className="max-w-3xl mx-auto p-6 rounded-2xl shadow-xl relative bg-gray-800">
                {messageError && (<ErrorMessage message={messageError} setMessage={setMessageError}/>)}

                <form onSubmit={SubmitForm}>
                    <h2 className="text-xl font-bold mb-4">Adicionar Novo Capítulo</h2>

                    <label htmlFor="work" className="block font-semibold mb-1">
                        Obra
                    </label>

                    <WorksMap onChange={handleChange}/>

                    <label htmlFor="title" className="block font-semibold mb-1">
                        Título do Capítulo
                    </label>
                    
                    <div className="flex items-center">
                        <TextInput 
                        id="title"
                        name="title"
                        value={disableTitle ? "" : inputs.title} 
                        placeholder={disableTitle ? "Desabilitado" : "digite o título do capítulo"} 
                        onChange={handleChange}
                        disabled={disableTitle}
                        />

                        <div className="flex absolute right-[4%] bg-blue-600 rounded-2xl py-1 px-2">
                            <label htmlFor="no-title" className="text-sm mr-2">Sem Título</label>
                            <input id="no-title" type="checkbox" className="rounded-2xl cursor-pointer accent-blue-300" onClick={() => setDisableTitle(!disableTitle)}/>
                        </div>
                    </div>


                    <label htmlFor="chapterNumber" className="block font-semibold mb-1">
                        Número do Capítulo
                    </label>

                    <input 
                    className="bg-gray-800 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    id="chapterNumber"
                    name="chapterNumber"
                    value={inputs.number} 
                    placeholder="digite o número do capítulo" 
                    onChange={handleChange}
                    type="number"
                    required
                    />
                    
                    <FileInput 
                    id="images" 
                    name="images" 
                    onChange={handleChange} 
                    fileSelect={inputs.images ? true : false}
                    multiple={true}
                    />


                    <SubmitButton/>
                </form>

            </div>
        </div>
        
    )
}

export default AddChapters


    

    
   


