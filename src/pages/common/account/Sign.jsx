// Componentes
import TextInput from "../../../components/admin/inputs/TextInput"
import ErrorMessage from "../../../components/common/messages/ErrorMessage"
import SuccessMessage from "../../../components/common/messages/SuccessMessage"

// Hooks
import { useNavigate } from "react-router-dom"
import { useState } from "react"


function Sign(){
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({})

    const [messageError, setMessageError] = useState("")
    const [messageSuccess, setMessageSuccess] = useState("")

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setInputs((values) => ({...values, [name]: value}))
    }

    function SubmitForm(e){
        e.preventDefault()

        fetch("http://localhost:3000/api/conta/criar", {
            method: "post",
            headers: {"Content-Type":"application/json"},
            credentials: "include",
            body: JSON.stringify({
                nickname: inputs.nickname,
                email: inputs.email,
                password: inputs.password
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if(!data.success){
                setMessageError(data.message)
                return setTimeout(() => {
                    setMessageError("")
                }, 5000)
            }
            
            setMessageSuccess(data.message)
            setTimeout(() => {
                navigate("/conta/login")
            }, 5000)
        })
        .catch((error) => {
            navigate(
                "/pagina-de-erro",
                {state: {message: error.message}}
            )
        })
    }
        
    return(
        <div className="flex items-center justify-center mt-10 mb-10">
            <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-lg">
                {messageError && (
                    <ErrorMessage message={messageError}/>
                )}
                {messageSuccess && (
                    <SuccessMessage message={messageSuccess}/>
                )}
                
                <h1 className="text-2xl font-bold mb-6">
                    Criar Conta
                </h1>

                <form className="space-y-4" onSubmit={SubmitForm}>
                    
                    {/* nickname */}
                    <div className="">
                        <label htmlFor="nickname" className="block font-semibold mb-1">
                            Nome de usuário
                        </label>
                        <TextInput 
                        id="nickname" 
                        name="nickname" 
                        placeholder="Digite seu nome de usuário" 
                        disabled={false}
                        onChange={handleChange}
                        value={inputs.nickname}
                        />
                    </div>

                    {/* Email */}
                    <div className="">
                        <label htmlFor="email" className="block font-semibold mb-1">
                            Email
                        </label>
                        <TextInput 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="Digite seu email" 
                        disabled={false}
                        onChange={handleChange}
                        value={inputs.email}
                        />
                    </div>

                    {/* Senha */}   
                    <div className="">
                        <label htmlFor="password" className="block font-semibold mb-1">
                            Senha
                        </label>
                        <TextInput 
                        id="password" 
                        name="password" 
                        type="password" 
                        placeholder="Digite sua senha"
                        onChange={handleChange}
                        disabled={false}
                        value={inputs.password}
                        />
                    </div>

                    <button 
                    className="w-full bg-blue-600 py-3 rounded hover:bg-blue-700 transition font-semibold hover:cursor-pointer" 
                    type="submit"
                    >
                        Criar
                    </button>
                </form>

            </div>
        </div>

    )
}

export default Sign