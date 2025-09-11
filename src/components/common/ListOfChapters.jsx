//Hooks
import { Link } from "react-router-dom"

function ListOfChapters({chapters}){
    if(chapters.length != 0){
        return(
            <section className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Capítulos</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {chapters.map((chapter) => (
                            <Link to={`${chapter.chapterNumber}`} key={chapter._id} className="block text-center bg-gray-800 hover:bg-gray-900 px-4 py-3 rounded-xl shadow-sm transition text-sm font-medium">
                                Capítulo {chapter.chapterNumber}
                            </Link>
                    ))}
                </div>
            </section>
        )
    }
    
    return(
        <section className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Capítulos</h2>
        
            <div className="text-gray-600 text-sm bg-yellow-100 border border-yellow-200 px-4 py-3 rounded-lg">
                Nenhum capítulo cadastrado.
            </div>
             
        </section>

    )
}

export default ListOfChapters