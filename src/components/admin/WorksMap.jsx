import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

//utilidades
import linkBackend from "../../utilities/linkBackend"

function WorksMap({onChange}){
    const [works, setWorks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${linkBackend}/painel-administrativo/capitulos/carregar-obras`, {
            method: "get",
            headers: {"Content-Type":"application/json"},
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            setWorks(data.works)
        })
        .catch((error) => {
            navigate(
                "/pagina-de-erro",
                {state: {message: error.message}}
            )
        })
        
    }, [])
    
    return(
        <select
            onChange={onChange}
            defaultValue={"none"} 
            className="bg-gray-800 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" 
            name="work" 
            id="work"
            >
                <option value="none" disabled>selecione uma obra</option>

                {works && works.map((work) => (
                    <option name="work" key={work.title} value={work._id}>{work.title}</option>
                ))}

        </select>
    )
}

export default WorksMap