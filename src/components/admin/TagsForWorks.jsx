//hooks
import { useEffect, useState } from "react"

//utilidades
import linkBackend from "../../utilities/linkBackend"
import HasTagButton from "../../components/admin/buttons/HasTagButton"

function TagsForWorks({handleChange, selectedTags}){
    const [tagsFromDB, setTagsFromDB] = useState([])
    const [tagsVisibility, setTagsVisibility] = useState(false)

    useEffect(() => {
        fetch((`${linkBackend}/painel-administrativo/obras/tags`), {
                method:"get",
                credentials: "include",
                headers: {"Content-Type":"application/json"},
            })
            .then((res)=> res.json()) 
            .then((data) => {
                setTagsFromDB(data.tags)
            })
            .catch((error) => console.log(error.message))
    }, [])
    
    return(
        <div className="">
            <label 
            htmlFor="tags" 
            className="block font-semibold mb-1">Tags</label>

            <div className="relative">

                <button
                onClick={() => setTagsVisibility(!tagsVisibility)}  
                type="button"
                className="w-full border-gray-300 px-3 py-2 rounded-md border flex flex-wrap gap-2 min-h-[44px] items-center text-sm text-left"
                >
                    <span id="placeholder" className="">Selecione as tags...</span>
                    <div id="selectedTags" className="flex flex-wrap gap-2"></div>
                </button>

            
                <div className={tagsVisibility ? "w-full mt-1 rounded-md shadow-lg border p-4 border-gray-300" : "hidden"}>

                    <div className="flex flex-wrap gap-2 mb-4">
                            
                            {tagsFromDB.map((tag) => (
                                <label className="cursor-pointer" key={tag._id}>

                                    <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    onChange={handleChange}
                                    name={tag.slug}
                                    value={tag._id}
                                    />

                                    
                                    {selectedTags && selectedTags.includes(tag._id)

                                    ?
                                        <HasTagButton has={true}>
                                            {tag.title}
                                        </HasTagButton>
                                        
                                    :
                                        <HasTagButton has={false}>
                                            {tag.title}
                                        </HasTagButton>
                                    }

                                    
                                </label>
                            ))}
                        
                    </div>

                </div>

            </div>

        </div>
    )
}

export default TagsForWorks