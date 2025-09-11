function SearchInput({onChange}){
    return(
        <>
            <input 
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            onChange={onChange}
            placeholder="Pesquisar..." 
            type="text" 
            />
        </>
    )
}

export default SearchInput