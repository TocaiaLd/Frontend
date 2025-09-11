function CancelDeleteButton({onClick}){
    return(
        <button 
        type="button"
        onClick={onClick}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition hover:cursor-pointer">
            Não
        </button>
    )
}

export default CancelDeleteButton