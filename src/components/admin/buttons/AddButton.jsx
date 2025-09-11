import { Link } from "react-router-dom"

function AddButton({link}){ 
    return(
        <>
            <Link to={link}>
                <button 
                id="btn-adicionar" 
                className="block bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 hover:cursor-pointer text-center font-semibold transition w-full"
                >
                    Adicionar
                </button>    
            </Link>
        </>
    )
}

export default AddButton


    


    
   


