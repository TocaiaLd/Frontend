import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

// Componentes
import WorkCard from "./WorkCard"
import Loading from "../../layouts/Loading"
import PageChanger from "./PageChanger"

function ListOfWorks({linkSearch, page, title}){
    const navigate = useNavigate()

    const [works, setWorks] = useState([])
    const [loading, setLoading] = useState(true)
    const [numberOfWorks, setNumberOfWorks] = useState()
    const [pages, setPages] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/api/${linkSearch}/${page}`, {
            method: "get",
            headers: {"Content-Type":"application/json"},
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            setWorks(data.latestWorksAtt)

            function GetPages(actual, totalPages){
                const paginas = []
        
                if(actual == 1 || actual == 2){
                    for(let i = 1; i <= 3; i++){
                        paginas.push(i)
                    }
                    return paginas
                }

                for(let i = Math.min(actual - 1, totalPages - 2); i <= Math.min(actual + 1, totalPages); i++){
                    paginas.push(i)
                }
        
                return paginas
            }
    
            if(!data.numberOfWorks){
                setNumberOfWorks(false)
                return setLoading(false)
            }

            setPages(GetPages(Number(page || 1), Number(data.numberOfWorks))) 
            setNumberOfWorks(Number(data.numberOfWorks))

            setLoading(false)
        })
        .catch((error) => 
            console.log(error)
        )

    }, [page])



    if(loading){
        return <Loading/>
    }
    
    return(
        <>
            <section className="py-12 px-4 flex flex-col items-center">
                
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-6">{title}</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">


                        {works && (
                            works.map((item) => (
                                <WorkCard key={item._id} slug={item.slug} image={item.image} title={item.title} chapters={item.chapters}/>
                            ))
                        )}

                    </div>
                </div>

                
                {numberOfWorks && (
                    <PageChanger pages={pages} actualPage={Number(page)} totalPages={numberOfWorks} link={linkSearch}/>
                )}
                
            </section>
        </>
    )
}

export default ListOfWorks