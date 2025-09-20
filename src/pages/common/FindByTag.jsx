// Hooks
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// Componentes 
import BlueMessage from "../../components/common/messages/BlueMessage"
import Loading from "../../layouts/Loading"

function FindByTag(){
    const [tags, setTags] = useState(null)
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:3000/api/tags", {
            method: "get",
            credentials: "include",
            headers: {"Content-Type":"application/json"},
        })
        .then((res) => res.json())
        .then((data) => {
            if(!data.success){
                return setMessage(data.message)
            }
            setTags(data.tags)
            setLoading(false)
        }
        )
        .catch((error) => console.log(error))
    }, [])

    if(loading){
        return <Loading/>
    }

    return(
        
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Cabeçalho */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Explorar Tags</h1>
                <p className="text-gray-500">Clique em uma tag para ver obras relacionadas</p>
            </div>

            {/* Lista de Tags */}
            {tags ?
                <div className="flex flex-wrap gap-3"> 
                    {tags.map((tag) => (
                        <Link 
                        to={`/tags/${tag.slug}/1`} 
                        key={tag.slug} 
                        className="bg-gray-700 hover:bg-gray-500  px-4 py-2 rounded-full font-medium transition">
                            {tag.title}
                        </Link>
                    ))}
                </div>
                :
                <BlueMessage message={message}/>
            }

        </div>
        
    )
}

export default FindByTag