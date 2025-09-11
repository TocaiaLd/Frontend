function TextInput({id, placeholder, type="text", onChange, name, disabled=false, value}){
    return(
        <>
            <input
                disabled={disabled}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                id={id} 
                onChange={onChange}
                name={name}
                placeholder={placeholder}  
                required
                value={value}
                type={type}
            />

        </>
    )
}

export default TextInput