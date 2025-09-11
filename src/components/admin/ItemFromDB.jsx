//Componenetes
import EditButton from "./buttons/EditButton"
import DeleteButton from "./buttons/DeleteButton"


function ItemFromDb({itemTitle, onClick}){
    
    return(
        <ul className="space-y-3 mb-6">
            <li className="flex items-center justify-between border-1 p-3 rounded">
                
                <span className="flex-1">
                    {itemTitle}
                </span>
                
                <div className="flex gap-2">
                    <EditButton/>
                    <DeleteButton onClick={onClick}/>
                </div>

            </li>
        </ul>
    )
}

export default ItemFromDb



    


    
   


