// Componentes
import TextInput from "../../../components/admin/inputs/TextInput"
import ErrorMessage from "../../../components/common/messages/ErrorMessage"
import SuccessMessage from "../../../components/common/messages/SuccessMessage"

// Hooks
import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"

// Utilidades
import linkBackend from "../../../utilities/linkBackend"
import { AccountContext } from "../../../context/AccountContext"

function Login(){
    const navigate = useNavigate()
    const [messageError, setMessageError] = useState("")
    const [messageSuccess, setMessageSuccess] = useState("")
    const {setAccount} = useContext(AccountContext)

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setInputs((values) => ({...values, [name]: value}))
    }

    function SubmitForm(e){
        e.preventDefault()
        
        fetch(`${linkBackend}/conta/login`, {
            method: "post",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: inputs.email,
                password: inputs.password
            })
        })
        .then((res) => res.json())
        .then((data) => {
            
            if(!data.auth){
                return setMessageError(data.message)
            }

            setMessageSuccess(data.message)
            setAccount(data.user)
            
            setTimeout(() => {
                navigate("/")
            }, 3000)
        })
        .catch((error) => {
            setMessageError(error.message)
        })
    }
    
    return(
        <div className="mt-10 mb-10 flex items-center justify-center">
            <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-lg">
                {messageError && (
                    <ErrorMessage message={messageError} setMessage={setMessageError}/>
                )}
                {messageSuccess && (
                    <SuccessMessage message={messageSuccess} setMessage={setMessageSuccess}/>
                )}
                
                <h1 className="text-2xl font-bold mb-6">
                    Entrar na conta
                </h1>

                <form className="space-y-4" onSubmit={SubmitForm}>

                    <div className="">
                        <label htmlFor="email" className="block font-semibold mb-1">
                            Email
                        </label>
                        <TextInput 
                        id="email" 
                        name="email" 
                        type="email"
                        value={inputs.email}
                        placeholder="Digite seu email"
                        onChange={handleChange}
                        />
                    </div>
                            
                    <div className="">
                        <label htmlFor="password" className="block font-semibold mb-1">
                            Senha
                        </label>
                        <TextInput 
                        id="password" 
                        name="password" 
                        type="password" 
                        value={inputs.password}
                        placeholder="Digite sua senha"
                        onChange={handleChange}
                        />
                    </div>
                    
                    <button 
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-semibold hover:cursor-pointer" 
                    type="submit"
                    >
                        Entrar
                    </button>

                </form>

            </div>
        </div>

    )
}

export default Login