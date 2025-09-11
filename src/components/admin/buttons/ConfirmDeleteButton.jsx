function ConfirmDeleteButton({onClick}){
    return(
        <button 
        type="button"
        onClick={onClick}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition hover:cursor-pointer">
            Sim
        </button>
    )
}

export default ConfirmDeleteButton