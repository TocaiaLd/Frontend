// Hooks
import { useState, useEffect } from "react"

// Componentes
import Search from "./Search"
import AddButton from "./buttons/AddButton"
import ItemFromDb from "./ItemFromDB"

//utilidades
import linkBackend from "../../utilities/linkBackend"
import Loading from "../../layouts/Loading"

function ListWithSearch({title, dataToSearch, ShowConfirmationToDelete, setIdToDelete, wasChanged}){
    const [dataFromDB, setDataFromDB] = useState([])
    const [searchValue, setSearchValue] = useState("")

    // Recebendo os itens do banco de dados ao iniciar a página
    useEffect(() => {
        setTimeout(()=>{
            fetch((`${linkBackend}/painel-administrativo/${dataToSearch}`), {
                method:"post",
                credentials: "include",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    searchValue: searchValue
                })
                
            })
            .then((res) => res.json())
            .then((data) => {
                setDataFromDB(data.data)
            })
            .catch((error) => {
                navigate(
                    "/pagina-de-erro",
                    {state: {message: error.message}}
                )
            })

        }, 600)
        
    }, [searchValue, wasChanged])

    // Setando os valores de busca
    function SearchByValue(e){
        setSearchValue(e.target.value)
    }
    
    return(
        <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-xl relative">
                <h1 className="text-2xl font-bold mb-6">{title}</h1>
                
                <Search onChange={SearchByValue}/>
                
                {dataFromDB 
                    ?
                        dataFromDB.map((item) => ( 
                            <ItemFromDb 
                            key={item._id} 
                            itemTitle={item.title} 
                            onClick={() => {
                                ShowConfirmationToDelete()
                                setIdToDelete(item._id)
                            }}
                            />
                        ))
                    :
                        <Loading/>
                }

                <AddButton link="adicionar"/>
        </div> 
    )
}

export default ListWithSearch