// Hooks
import { Link } from "react-router-dom"

function WorkCard({slug, image, title, chapters,}){

    const TwoLastChapters = chapters.slice(-2).reverse()

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
         
            <div className="flex flex-col gap-2 items-center  w-full">
                {TwoLastChapters.map((e) => (
                    <Link key={e.chapterNumber} to={`obra/${slug}/${e.chapterNumber}`} className="w-full">
                        <div className="flex bg-gray-500 p-1 px-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors w-full place-content-between">       
                                        
                            <div
                                name={e._id}
                                className=" text-white text-sm">
                                    Capítulo {e.chapterNumber}
                            </div>
                            
                            <div className="text-white text-sm">
                                {e.createdAt.substring(0,10)}
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default WorkCard