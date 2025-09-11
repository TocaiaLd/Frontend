//componentes
import TextInput from "../../../components/admin/inputs/TextInput"
import SubmitButton from "../../../components/admin/buttons/SubmitButton"
import ErrorMessage from "../../../components/common/messages/ErrorMessage"

// Hooks
import { useState } from "react"
import { useNavigate } from "react-router-dom"

//utilidades
import linkBackend from "../../../utilities/linkBackend"

function AddWorks(){
    const [messageError, setMessageError] = useState(null)
    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setInputs((values) => ({...values, [name]: value}))
    }

    // Setando a imagem para busca no backend
    function SetImage(e){
        e.preventDefault()

        if(e.target.files && e.target.files[0]){
            setFile(e.target.files[0])
        }
    }
    
    // Enviar os dados setados e cadastrar obra 
    function SubmitForm(e){
        e.preventDefault()
        
        if(!file || !title || !sinopse || !author || !artist || !tags){
            return setMessageError("Preencha todos os dados adequadamente")
        }

        const formData = new FormData()
        formData.append("file", file)
        formData.append("title", title)
        formData.append("slug", slug)
        formData.append("sinopse", sinopse)
        formData.append("author", author)        
        formData.append("artist", artist)
        
        tags.map((tag) => {
            formData.append("tags", tag)
        })

        fetch(`${link}/obras/criar`, {
            method: "post",
            credentials: "include",
            body: formData
        
        }).then((res)=>{
            return res.json()
        
        })
        .then((data) => {
            setFormVisibility(false)
            setMessageSuccess(data.message)
            // setTimeout(() => {
            //     setMessageSuccess("")
            // }, 3000)
            
        })
        .catch((error) => {
            setMessageError(error.message)
            setTimeout(() => {
                setMessageError("")
            }, 3000)
        })
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

                    {/* <div className="">
                        <label htmlFor="tags" className="block font-semibold mb-1">Tags</label>
                        <div className="relative">
                            <button
                            onClick={TagsFormVisibility}  
                            type="button"
                            className="w-full border-gray-300 px-3 py-2 rounded-md border flex flex-wrap gap-2 min-h-[44px] items-center text-sm text-left"
                            >
                                <span id="placeholder" className="">Selecione as tags...</span>
                                <div id="selectedTags" className="flex flex-wrap gap-2"></div>
                            </button>

                        
                            <div className={tagsVisibility ? "w-full mt-1 rounded-md shadow-lg border p-4 border-gray-300" : "hidden"}>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {tagsFromDB.length > 0 && (
                                        tagsFromDB.map((tag) => (
                                            <span 
                                            key={tag._id}
                                            className={tags.includes(tag._id) ? "tag cursor-pointer bg-gray-600 text-white px-3 py-1 rounded-full text-sm" : "tag cursor-pointer bg-gray-400 px-3 py-1 rounded-full text-sm"} 
                                            onClick={(e) => SetSelectedTagsOnForm(e, tag._id)}
                                            >
                                                {tag.title}
                                            </span>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="mt-2">
                        <label htmlFor="image" className="block font-semibold mb-1">
                            Imagem
                        </label>
                        <label htmlFor="image" className="flex flex-col items-center px-4 py-6 bg-gray-800 text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white transition">
                            {file ? 
                                <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8.25 8.25a1 1 0 01-1.414 0l-4.25-4.25a1 1 0 111.414-1.414L8 12.086l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>

                            :   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M16.88 9.94a1.5 1.5 0 00-2.12 0L11 13.71V3.5a1.5 1.5 0 00-3 0v10.21L5.24 9.94a1.5 1.5 0 10-2.12 2.12l6 6a1.5 1.5 0 002.12 0l6-6a1.5 1.5 0 000-2.12z"/>
                                </svg>
                            }
                            <InputFormAdmin onChange={SetImage} className="hidden" id="image" name="image" type="file" placeholder="" disabled={false}/>
                        </label>
                    </div> */}
                
                    <SubmitButton/>
                </form>

            </div>


        </div>
    )
}

export default AddWorks