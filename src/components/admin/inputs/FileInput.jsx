function FileInput({id, name, type, placeholder, disabled, onChange}){
    return(
        <>
            <input 
                className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600`} 
                disabled={disabled}
                id={id} 
                multiple
                name={name} 
                onChange={onChange}
                placeholder={placeholder}  
                required
                type={type} 
            />
        </>
    )
}

export default FileInput