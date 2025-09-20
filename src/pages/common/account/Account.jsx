import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// Layouts, componentes
import Loading from "../../../layouts/Loading"
import EmailModal from "../../../components/common/account/EmailModal"

function Account(){
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const [modalNicknameVisibility, setModalNicknameVisibility] = useState(false)
    const [modalPasswordVisibility, setModalPasswordVisibility] = useState(false)
    const [modalEmailVisibility, setModalEmailVisibility] = useState(false)
    const [modalPhotoVisibility, setModalPhotoVisibility] = useState(false)
    
    function setNicknameVisibility(e){
        e.preventDefault()
        setModalNicknameVisibility(!modalNicknameVisibility)
    }

    function setPasswordVisibility(e){
        e.preventDefault()
        setModalPasswordVisibility(!modalPasswordVisibility)
    }

    function setEmailVisibility(e){
        e.preventDefault()
        setModalEmailVisibility(!modalEmailVisibility)
    }

    function setPhotoVisibility(e){
        e.preventDefault()
        setModalPhotoVisibility(!modalPhotoVisibility)
    }

    useEffect(() => {
        fetch(`http://localhost:3000/api/conta`, {
            method: "get",
            headers: {"Content-Type":"application/json"},
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            if(!data.user){
                return navigate("/")
            }
            setUser(data.user)
            setLoading(false)
        }).catch((error) => console.log(error))
    }, [])
    
    if(loading){
        return <Loading/>
    }
    
    function ChangeTab(e){
        e.preventDefault()

        const tab = e.target 

        const tabs = [...document.querySelectorAll("#tab")]

        tabs.map((tab) => {
            tab.classList.remove("border-b-2")
        })

        tab.classList.add("border-b-2")
    }

    

    return(
        <section className="min-h-screen flex flex-col items-center py-10 px-4">
            
            <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-md">
                
                {/* <!-- Foto do usuário --> */}
                <div className="flex justify-center relative">
                    <img
                        src={user.photo}
                        alt="Foto de perfil"
                        className="w-28 h-28 rounded-full border-4 border-blue-500"
                    />
                </div>

                {/* <!-- Nickaname e cargo --> */}
                <div className="text-center mb-4">
                    {/* <!-- Nickname --> */}
                    <div className="flex justify-center items-center space-x-2">
                        <p className="text-lg font-semibold">{user.nickname}</p>
                        <label htmlFor="edit-nickname" title="Editar Nickname" className="cursor-pointer">
                            <svg className="edit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M16.5 3.75a2.25 2.25 0 0 1 3.182 3.182L7.5 18.75H4.5v-3l12-12z"/>
                            </svg>
                        </label>
                    </div>
                
                </div>
            
                
                {/* <!-- Cabeçalho das abas --> */}
                <div className="flex border-b justify-center gap-x-10 border-gray-300 mb-4 select-none">
                    
                    <label id="tab" onClick={ChangeTab} className="w-1/2 cursor-pointer px-6 py-2 -mb-px  hover:text-blue-600 border-b-2 text-center">
                        Dados do Usuário
                    </label>

                    <label id="tab" onClick={ChangeTab} className="w-1/2 cursor-pointer px-6 py-2 -mb-px hover:text-blue-600 text-center">
                        Obras Seguidas
                    </label>

                </div>

                {/* <!-- Conteúdo das abas --> */}
                <div className="tabs-content">
                
                    {/* <!-- Dados do Usuário --> */}
                    <div id="content1" className="tab-content relative">

                        <div className="text-left space-y-4">

                            {/* <!-- Nickname --> */}
                            <div className="flex space-x-2">

                                <p> <strong>Nickname:</strong> {user?.nickname}</p>
                                
                                <label htmlFor="edit-nickname" title="Editar Nickname" className="cursor-pointer" onClick={setNicknameVisibility}>
                                    <svg className="edit-icon w-5 h-5 stroke-blue-500 hover:stroke-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M16.5 3.75a2.25 2.25 0 0 1 3.182 3.182L7.5 18.75H4.5v-3l12-12z"/>
                                    </svg>
                                </label>

                            </div>

                            {/* <!-- Email --> */}
                            <div className="flex space-x-2">
                                <p><strong>Email:</strong> {user?.email}</p>
                                <label htmlFor="edit-email" title="Editar Email" className="cursor-pointer" onClick={setEmailVisibility}>
                                <svg className="edit-icon w-5 h-5 stroke-blue-500 hover:stroke-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M16.5 3.75a2.25 2.25 0 0 1 3.182 3.182L7.5 18.75H4.5v-3l12-12z"/>
                                </svg>
                                </label>
                            </div>

                            <EmailModal visibility={modalEmailVisibility} functionVisibility={setEmailVisibility}/>

                            {/* <!-- Senha --> */}
                            <div className="flex space-x-2">
                                <p><strong>Senha:</strong> ************</p>

                                <label htmlFor="edit-password" title="Editar Senha" className="cursor-pointer" onClick={setPasswordVisibility}>
                                <svg className="edit-icon w-5 h-5 stroke-blue-500 hover:stroke-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M16.5 3.75a2.25 2.25 0 0 1 3.182 3.182L7.5 18.75H4.5v-3l12-12z"/>
                                </svg>
                                </label>
                            </div>

                            {/* Cargo */}
                            <p>
                                <strong>Role: </strong>
                                {user.role}
                            </p>

                            {/* Data de criação */}
                            <p>
                                <strong>Data de cadastro: </strong> 
                                {user.createdAt.substring(0, 10)}
                            </p>

                        </div>

                    </div>
                    
                    {/* <!-- Obras Seguidas --> */}
                    <div id="content2" className="tab-content hidden">
                        <ul className="list-disc pl-5 space-y-2">
                        <li className="flex items-center space-x-4">
                            <img src="https://res.cloudinary.com/dwek8nvgl/image/upload/v1754739331/obras/Sangatsu%20no%20Lion/capa/Sangatsu%20no%20Lion-Capa.png" 
                            alt="Sangatsu no Lion" className="w-16 h-24 object-cover rounded-lg shadow-md" />
                            <a href="#" className="text-blue-600 hover:underline font-semibold text-lg">
                            Sangatsu no Lion
                            </a>
                        </li>
                        </ul>
                        {/* <!-- Mais obras aqui --> */}
                    </div>

                </div>

            </div>

        </section>
    )
}

export default Account