import ListOfWorks from "../../components/common/ListOfWorks";
import { useParams } from "react-router-dom";

function TagsSelected(){
    const {slug, page} = useParams()
    
    return(
        <ListOfWorks linkSearch={`tags/${slug}`} page={page} title={`Obras - ${slug}`}/>
    )
}

export default TagsSelected