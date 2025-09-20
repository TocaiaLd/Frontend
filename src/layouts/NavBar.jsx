//Hooks
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { AccountContext } from "../context/AccountContext"
import Logout from "../components/common/account/Logout"

function NavBar(){
    const {account} = useContext(AccountContext)

    return(
        <nav className="bg-gray-800 text-white p-4 flex items-center justify-between shadow-md">

            <div className="text-2xl font-bold">
                <Link to="/" className="hover:text-gray-300">Projeto</Link>
            </div>
            
            <div className="flex items-center">

                <div className="mr-6">
                    <ul className="flex space-x-6">
                        <li className="">
                            <Link to="/pesquisar" className="hover:text-gray-300">Pesquisar</Link>
                        </li>
                        <li className="">
                            <Link to="/tags" className="hover:text-gray-300">Tags</Link>
                        </li>

                        {account 
                        ? 
                            <Logout/>
                        :
                            <li className="">
                                <Link to="/login" className="hover:text-gray-300">Login</Link>
                            </li>
                        }

                    </ul>
                </div>
            </div>
            

        </nav>

    )
}

export default NavBar