// Hooks
import { Link } from "react-router-dom"

function WorkCard({slug, image, title, chapters,}){

    return(
        <div className="bg-gray-800 rounded-xl shadow-md px-2 py-3 flex flex-col items-center max-w-xs mx-auto">
                                    
            <Link to={`obra/${slug}`}>
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full aspect-[33/50] object-cover rounded-xl mb-4"
                />
            </Link>

            <Link to={`obra/${slug}`}>
                <h4 className="font-semibold text-center text-lg mb-3">{title}</h4>
            </Link>
        
        
            <div className="flex flex-col gap-2">
                {chapters.slice(-2).map((e) => (
                    
                    <Link key={e.chapterNumber} to={`obra/${slug}/${e.chapterNumber}`}>
                        <span
                        name={e._id}
                        className="bg-gray-200 text-gray-800 text-sm mr-3 p-1 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                            Capítulo {e.chapterNumber} - {e.createdAt.substring(0,10)}
                        </span>
                    </Link>

                ))}
            </div>
        </div>
    )
}

export default WorkCard