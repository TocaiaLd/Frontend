import { useState, useEffect } from "react"

// Componentes
import WorkCard from "./WorkCard"
import Loading from "../../layouts/Loading"

function ListOfWorks(){
    const [works, setWorks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:3000/api/mais-recentes", {
            method: "get",
            headers: {"Content-Type":"application/json"},
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            setWorks(data.latestWorksAtt)
            setLoading(false)
        })
        .catch((error) => 
            navigate(
                "/pagina-de-erro",
                {state: {message: error.message}}
            )
        )

    }, [])

    if(loading){
        return <Loading/>
    }
    
    return(
        <>
            <section className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-6">Últimos Lançamentos</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">


                        {works && (
                            works.map((item) => (
                                <WorkCard key={item._id} slug={item.slug} image={item.image} title={item.title} chapters={item.chapters}/>
                            ))
                        )}

                    </div>
                </div>

            </section>
        </>
    )
}

export default ListOfWorks