//componentes
import TextInput from "../../../components/admin/inputs/TextInput"
import SubmitButton from "../../../components/admin/buttons/SubmitButton"
import ErrorMessage from "../../../components/common/messages/ErrorMessage"

// Hooks
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


//utilidades
import linkBackend from "../../../utilities/linkBackend"

function EditTags(){
    const [tagTitle, setTagTittle] = useState("")
    const [slug, setSlug] = useState("")

    const [messageError, setMessageError] = useState(null)

    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        fetch(`${linkBackend}/painel-administrativo/tags/pegar-dados/${id}`, {
            method: "get",
            credentials: "include",
            headers: {"Content-Type":"application/json"},

        }).then((res)=> res.json())
        .then((data) => {            
            if(!data.success){
                return setMessageError(data.message)
            }
            const tag = data.data

            setTagTittle(tag.title)

        })
        .catch((error) => {
            navigate("/pagina-de-erro", {state: {message: error.message}})
        })

    }, [])

    const handleChange = (e) => {
        let tagTitle = e.target.value
        tagTitle = tagTitle.toLowerCase()
        let slug = tagTitle.replaceAll(" ", "-")

        setTagTittle(tagTitle)
        setSlug(slug)
    }

    function SubmitForm(e){
        e.preventDefault()
        
        fetch(`${linkBackend}/painel-administrativo/tags/editar/${id}`, {
            method: "post",
            credentials: "include",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                title: tagTitle,
                slug: slug
            })

        }).then((res)=> res.json())
        .then((data) => {            
            if(!data.success){
                return setMessageError(data.message)
            }
            navigate("/painel-administrativo/tags", {state: {message: data.message}})
        })
        .catch((error) => {
            navigate("/pagina-de-erro", {state: {message: error.message}})
        })
    }
    
    return(
        <div className="p-6 mt-10 mb-10">
            <div className="max-w-3xl mx-auto p-6 rounded-2xl shadow-xl relative bg-gray-800">
                {/* Messagem para quando ocorrer um erro */}
                {messageError && (<ErrorMessage message={messageError}/>)}
                
                <form onSubmit={SubmitForm}>
                    <h2 className="text-xl font-bold mb-4">Editar Tag</h2>

                    <label htmlFor="tag" className="block font-semibold mb-1">
                        Nome
                    </label>
                    
                    <TextInput 
                    id="tag"
                    name="tag"
                    value={tagTitle} 
                    placeholder="digite o novo nome da tag" 
                    onChange={handleChange}/>

                    <SubmitButton/>
                </form>

            </div>


        </div>
    )
}

export default EditTags