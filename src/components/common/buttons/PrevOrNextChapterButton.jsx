import { Link } from "react-router-dom"

function PrevOrNextChapterButton({slug, previousChapter, nextChapter}){
    return(
        <div className="flex gap-2 min-w-4/12 max-w-[100%]">
            {previousChapter && (
                <Link 
                to={`/obra/${slug}/${previousChapter}`} 
                className="bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded-xl text-sm font-medium transition w-1/2 text-center">
                    Anterior
                </Link>
            )}
            {nextChapter && (
                <Link 
                to={`/obra/${slug}/${nextChapter}`} 
                className="bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded-xl text-sm font-medium transition w-1/2 text-center">
                    Próximo
                </Link>
            )}
        </div>
    )
}

export default PrevOrNextChapterButton