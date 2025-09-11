//Hooks
import { Link } from "react-router-dom"
// import { useContext } from "react"
// import { LoginContext } from "../context/LoginContext"

function NavBar(){
    // const {user, Logout} = useContext(LoginContext)

    return(
        <nav className="bg-gray-800 text-white p-4 flex items-center justify-between shadow-md">

            <div className="text-2xl font-bold">
                <Link to="/" className="hover:text-gray-300">PuroHentai</Link>
            </div>
            
            <div className="flex items-center">

                <div className="mr-6">
                    <ul className="flex space-x-6">
                        <li className="">
                            <Link to="/pesquisar" className="hover:text-gray-300">Pesquisar</Link>
                        </li>
                        <li className="">
                            <Link to="/obras" className="hover:text-gray-300">Obras</Link>
                        </li>
                        <li className="">
                            <Link to="/conta/login" className="hover:text-gray-300">Login</Link>
                        </li>
                    </ul>
                </div>

            
                {/* {user 
                ? 
                    <div className="flex items-center">
                        <div className="mr-2 hover:cursor-pointer" onClick={Logout}>
                            <img width="25" height="25" src="https://img.icons8.com/parakeet-line/48/FFFFFF/logout-rounded.png" alt="logout-rounded"/> 
                        </div>
                        <div className="">
                            <Link href="/conta">
                                <img src={user.photo} alt="" width="40px"/>  
                            </Link>
                        </div>
                    </div> 
                : 
                <Link href="/conta/login" className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-white font-semibold">Login</Link>
                } */}
            </div>
            

        </nav>

    )
}

export default NavBar