// Hooks
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

//componenetes e layouts
import Loading from "../../layouts/Loading"
import PrevOrNextChapterButton from "../../components/common/buttons/PrevOrNextChapterButton"

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
            <h1 className="text-xl sm:text-2xl font-semibold text-center sm:text-left mb-3">
                {cap.work.title} - Capítulo {cap.chapterNumber} 
            </h1>
            
            <div className="flex flex-row items-center justify-between gap-2 mb-6">
                
                <div className="w-8/12">
                    <select 
                    value={chapter} 
                    className="bg-gray-800 border w-full border-none px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
                    onChange={ChangeChapter}
                    >
                        {othersChapters.map((number) => (
                            <option key={number} value={number} className="border-black">
                                Capítulo {number}
                            </option>
                        ))}

                    </select>
                </div>

                {/* <!-- Navegação --> */}
                <PrevOrNextChapterButton slug={slug} previousChapter={previousChapter} nextChapter={nextChapter}/>

            </div>

            {/* <!-- Imagens das páginas --> */}
            <div className="space-y-6">
                {cap.images.map((image) => (
                    <img src={`${image}`} alt="Página 1" className="w-full rounded-lg shadow-md object-cover" key={image}/>
                ))}
            </div>

            {/* <!-- Aviso de fim --> */}
            <h1 className="mt-10 mb-10 text-center text-gray-500 text-xl sm:text-2xl">
                Você chegou ao final do capítulo.
            </h1>

            <PrevOrNextChapterButton slug={slug} previousChapter={previousChapter} nextChapter={nextChapter}/>
            
            
        </main>

        
    )
}

export default Chapter