function CloseButton({onClick}){
    return(
        <>
            <button 
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold hover:cursor-pointer"
                onClick={onClick}
            >
                ×
            </button>    
        </>
    )
}

export default CloseButton


    


    
   


