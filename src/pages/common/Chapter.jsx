// Hooks
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

//componenetes e layouts
import Loading from "../../layouts/Loading"

function Chapter(){
    const navigate = useNavigate()
    const {slug, chapter} = useParams()
    
    const [loading, setLoading] = useState(true)
    const [cap, setCap] = useState()
    const [othersChapters, setOtherChapters] = useState([])

    const [previousChapter, setPreviousChapter] = useState(null)
    const [nextChapter, setNextChapter] = useState(null)
    
    function ChangeChapter(e){
        navigate(`/obra/${slug}/${e.target.value}`)
    }

    useEffect(() => {
            fetch(`http://localhost:3000/api/obra/${slug}/${chapter}`, {
                method: "get",
                headers: {"Content-Type":"application/json"},
                credentials: "include"
            })
            .then((res) => res.json())
            .then((data) => {
                if(!data.chapter){
                    return navigate("/")
                }
                setCap(data.chapter)
                
                var chaptersNumbers = data.othersChapters.map((e) => Number(e.chapterNumber))
                setOtherChapters(chaptersNumbers)

                const arrayLength = chaptersNumbers.length
                const paramsChapter = Number(chapter)

                const proximoNúmero = chaptersNumbers.reduce((prev, actual, index) => {
                    if(actual == paramsChapter){
                        if((index + 1) == arrayLength){
                            return undefined 
                        }
                        return actual
                    }

                    if(prev == paramsChapter){
                        return actual
                    }

                    var result = Math.abs(paramsChapter - actual) < Math.abs(paramsChapter - prev) ? actual : prev 

                    return result
                })

                const anteriorNúmero = chaptersNumbers.reduceRight((prev, actual, index) => {
                    if(actual == paramsChapter){
                        if(index == 0){
                            return undefined 
                        }
                        return actual
                    }

                    if(prev == paramsChapter){
                        return actual
                    }

                    var result = Math.abs(paramsChapter - actual) < Math.abs(paramsChapter - prev) ? actual : prev 

                    return result
                })


                setNextChapter(proximoNúmero)
                setPreviousChapter(anteriorNúmero)


                setLoading(false)
            })
            .catch((error) => console.log(error))
    
    }, [chapter])

    if(loading){
        return <Loading/>
    }

    return(
        
        <main className="max-w-4xl mx-auto px-4 py-6">
            {/* <!-- Cabeçalho --> */}
            <header className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-6">
                <h1 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
                    Capítulo {cap.chapterNumber} - {cap.work.title}
                </h1>

                <div className="w-1/4">
                    <select 
                    defaultValue={chapter} 
                    className="bg-white text-black border w-full border-gray-400 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={ChangeChapter}
                    >
                        {othersChapters.map((number) => (
                            <option key={number} value={number} className="border-black">Capítulo {number}</option>
                        ))}

                    </select>
                </div>

                {/* <!-- Navegação --> */}
                <div className="flex gap-2">
                    {previousChapter && (
                        <Link to={`/obra/${slug}/${previousChapter}`} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl text-sm font-medium transition">
                        Capítulo Anterior
                        </Link>
                    )}
                    {nextChapter && (
                        <Link to={`/obra/${slug}/${nextChapter}`} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl text-sm font-medium transition">
                        Próximo Capítulo
                        </Link>
                    )}
                </div>
            </header>

            {/* <!-- Imagens das páginas --> */}
            <div className="space-y-6">
                {cap.images.map((image) => (
                    <img src={`${image}`} alt="Página 1" className="w-full rounded-lg shadow-md object-cover" key={image}/>
                ))}
            </div>

            {/* <!-- Aviso de fim --> */}
            <div className="mt-10 text-center text-gray-500 text-sm">
                Você chegou ao final do capítulo.
            </div>

            {/* <!-- Navegação novamente no fim -->
            <div className="flex justify-center gap-3 mt-6">
                {previousChapter && (
                    <Link to={`/obra/${slug}/${previousChapter}`} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl text-sm font-medium transition">
                        Capítulo Anterior
                    </Link>
                )}
                {nextChapter && (
                    <Link to={`/obra/${slug}/${nextChapter}`} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl text-sm font-medium transition">
                        Próximo Capítulo
                    </Link>
                )}
            </div> */}
        </main>

        
    )
}

export default Chapter