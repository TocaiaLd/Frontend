//componentes
import TextInput from "../../../components/admin/inputs/TextInput"
import SubmitButton from "../../../components/admin/buttons/SubmitButton"
import ErrorMessage from "../../../components/common/messages/ErrorMessage"
import Loading from "../../../layouts/Loading"
import FileInput from "../../../components/admin/inputs/FileInput"
import TagsForWorks from "../../../components/admin/TagsForWorks"

// Hooks
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

//utilidades
import linkBackend from "../../../utilities/linkBackend"

function AddWorks(){
    
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

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
    
    const [messageError, setMessageError] = useState("")
    const [inputs, setInputs] = useState({})

    const handleChange = (e) => {
        const name = e.target.name

        if(e.target.type === "file"){
            const files = e.target.files

            let value
            if(files.length <= 1){
                value = files[0]
            }
            else{
                value = Array.from(files)
            }
            setInputs((values) => ({...values, [name]: value}))

        }
        else if(e.target.type === "checkbox"){
            const tagId = e.target.value
            
            setInputs(values => {
            const tags = values.tags || []
            
            if(tags.includes(tagId)){
                return{
                    ...values,
                    tags: tags.filter(id => id !== tagId)
                }
            }
            else{
                return{
                    ...values,
                    tags: [...tags, tagId]
                }
            }
            
        })
        }
        else{
            const value = e.target.value
            setInputs((values) => ({...values, [name]: value}))
        }
    }


    // Enviar os dados setados e cadastrar obra 
    function SubmitForm(e){
        e.preventDefault()

        if(!inputs.image || !inputs.title || !inputs.synopsis || !inputs.author || !inputs.artist || !inputs.tags){
            return setMessageError("Preencha todos os dados adequadamente")
        }

        const formData = new FormData()
        
        for (let key in inputs){
    
            if(key === "tags"){
                const tags = inputs[key]
                tags.map((tag) => {
                    formData.append("tags", tag)
                })  
            }else{
                formData.append(`${key}`, inputs[key])
            }

            
        }

        fetch(`${linkBackend}/painel-administrativo/obras/criar`, {
            method: "post",
            credentials: "include",
            body: formData
        
        }).then((res)=>{
            return res.json()
        
        })
        .then((data) => {
            console.log(data.message)
            // setFormVisibility(false)
            // setMessageSuccess(data.message)
            // setTimeout(() => {
            //     setMessageSuccess("")
            // }, 3000)
            
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    if(loading){
        return <Loading/>
    }

    return(
        <div className="p-6 mt-10 mb-10">
            <div className="max-w-3xl mx-auto p-6 rounded-2xl shadow-xl relative bg-gray-800">
                {/* Messagem para quando ocorrer um erro */}
                {messageError && (<ErrorMessage message={messageError}/>)}
                
                <form className="space-y-4" onSubmit={SubmitForm}> 
                                        
                    <div className="">

                        <label htmlFor="title" className="block font-semibold mb-1">
                            Título
                        </label>
                        <TextInput id="title" placeholder="Nome da obra" onChange={handleChange} name="title" value={inputs.title}/>

                    </div>

                    <div className="">
                        <label htmlFor="sinopse" className="block font-semibold mb-1">
                            Sinopse
                        </label>
                        <textarea
                        name="synopsis"
                        id="synopsis"
                        value={inputs.synopsis} 
                        onChange={handleChange} 
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600`" 
                        placeholder="Sinopse da obra"
                        rows={5}
                        >
                        </textarea>
                    </div>
                    
                    <div className="">
                        <label htmlFor="author" className="block font-semibold mb-1">
                            Autor
                        </label>
                        <TextInput id="author" placeholder="Nome do autor" onChange={handleChange} name="author" value={inputs.author}/>
                    </div>

                    <div className="">
                        <label htmlFor="artist" className="block font-semibold mb-1">
                            Artista
                        </label>
                        <TextInput id="artist" placeholder="Nome do artista" onChange={handleChange} name="artist" value={inputs.artist}/>
                    </div>

                    <TagsForWorks handleChange={handleChange}/>

                    <FileInput id="image" name="image" onChange={handleChange} fileSelect={inputs.image ? true : false}/>
                
                    <SubmitButton/>
                </form>

            </div>


        </div>
    )
}

export default AddWorks