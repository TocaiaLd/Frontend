import { useState } from "react"

function HasTagButton({children, has}){
    const [hasTag, setHasTag] = useState(has)
    
    if(!hasTag){
        return(
            <div
            onClick={() => setHasTag(true)} 
            className="border border-gray-400 px-4 py-1 rounded-4xl text-white">
                {children}
            </div>
        )
    }
    
    return(
        <div
        onClick={() => setHasTag(false)} 
        className="border border-gray-400 px-4 py-1 rounded-4xl text-white bg-green-600">
            {children}
        </div>
    )
}

export default HasTagButton