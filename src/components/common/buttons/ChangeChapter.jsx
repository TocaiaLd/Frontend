import { Link } from "react-router-dom"

function ChangeChapter({slug, previousChapter, children}){
    return(
        <Link to={`/obra/${slug}/${previousChapter}`} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl text-sm font-medium transition">
            {children}
        </Link>
    )
}

export default ChangeChapter