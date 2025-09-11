function DeleteButton({onClick}){
    return(
        <>
            <button 
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 hover:cursor-pointer"
            onClick={onClick}
            >
                Excluir
            </button>
        </>
    )
}

export default DeleteButton
