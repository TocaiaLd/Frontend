// Hooks
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

// Componentes
import Search from "./Search"
import AddButton from "./buttons/AddButton"
import ItemFromDb from "./ItemFromDB"

//utilidades
import linkBackend from "../../utilities/linkBackend"
import Loading from "../../layouts/Loading"

function ListWithSearch({title, dataToSearch, ShowConfirmationToDelete, setIdToDelete, wasChanged, children=null, choosedWork=null}){
    const [dataFromDB, setDataFromDB] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()

    // Recebendo os itens do banco de dados ao iniciar a página
    useEffect(() => {
        setTimeout(()=>{
            fetch((`${linkBackend}/painel-administrativo/${dataToSearch}`), {
                method:"post",
                credentials: "include",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    searchValue: searchValue,
                    work: choosedWork
                })
                
            })
            .then((res) => res.json())
            .then((data) => {
                if(data.data){
                    setDataFromDB(data.data)
                }
            })
            .catch((error) => {
                navigate(
                    "/pagina-de-erro",
                    {state: {message: error.message}}
                )
            })

        }, 600)
        
    }, [searchValue, wasChanged, choosedWork])

    // Setando os valores de busca
    function SearchByValue(e){
        setSearchValue(e.target.value)
    }
    
    return(
        <div className="max-w-3xl mx-auto relative">
                <h1 className="text-2xl font-bold mb-6">{title}</h1>
                
                {children}

                <label htmlFor="search" className="block font-semibold mb-1">
                    Procurar {title}
                </label>

                <Search onChange={SearchByValue}/>
                
                {dataFromDB.length >=1
                    ?
                        dataFromDB.map((item) => ( 
                            <ItemFromDb 
                            key={item._id} 
                            itemTitle={item.chapterNumber || item.title} 
                            idToEdit={item._id}
                            onClick={() => {
                                setIdToDelete(item._id)
                                ShowConfirmationToDelete()
                            }}
                            />
                        ))
                    :

                    <div className="text-gray-600 text-sm bg-yellow-100 border border-yellow-200 px-4 py-3 rounded-lg mb-6">
                        Não há dados cadastrados.
                    </div>
                }

                <AddButton link="adicionar"/>
        </div> 
    )
}

export default ListWithSearch