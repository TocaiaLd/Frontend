function Loading(){
    return(
        <div className="flex flex-col items-center space-y-4 h-[80vh] justify-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin">.</div>
            <p className="text-blue-600 font-semibold text-lg">Carregando, por favor aguarde...</p>
        </div>
    )
}

export default Loading