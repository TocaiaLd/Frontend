function FileInput({id, name, onChange, fileSelect}){
    
    return(
        <>
            <div className="mt-2">
                        <label htmlFor="image" className="block font-semibold mb-1">
                            Imagem
                        </label>

                        <label htmlFor="image" className="flex flex-col items-center px-4 py-6 bg-gray-800 text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white transition">
                            
                            {fileSelect ? 
                                <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8.25 8.25a1 1 0 01-1.414 0l-4.25-4.25a1 1 0 111.414-1.414L8 12.086l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>

                            :   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M16.88 9.94a1.5 1.5 0 00-2.12 0L11 13.71V3.5a1.5 1.5 0 00-3 0v10.21L5.24 9.94a1.5 1.5 0 10-2.12 2.12l6 6a1.5 1.5 0 002.12 0l6-6a1.5 1.5 0 000-2.12z"/>
                                </svg>
                            }
                            
                            
                            <input 
                                className="hidden"
                                id={id} 
                                multiple
                                name={name} 
                                onChange={onChange}
                                placeholder="" 
                                required
                                type="file"
                            />
                        </label>
                    </div>
        </>
    )
}

export default FileInput