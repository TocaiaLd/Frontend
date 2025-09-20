import ListOfWorks from "../../components/common/ListOfWorks";
import { useParams } from "react-router-dom";

function MostRecents(){
    const {page} = useParams()
    
    return(
        <ListOfWorks linkSearch={"recentes"} page={page} title={`Últimos Lançamentos`}/>
    )
}

export default MostRecents