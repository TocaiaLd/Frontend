import { Link } from "react-router-dom"
import { useContext } from "react"
import { AccountContext } from "../../../context/AccountContext"

function Logout(){
    const {setAccount} = useContext(AccountContext)
    
    function SignOut(){
        fetch("http://localhost:3000/api/conta/logout", {
            method: "post",
            credentials: "include",
            headers: {"Content-Type":"application/json"}
        })
        .then((res) => res.json())
        .then(() => {
            setAccount(false)
        })
        .catch((error) => console.log(error))
    }
    
    return(
        <li className="">

            <Link 
            className="hover:text-gray-300"
            onClick={SignOut}
            >
                Logout
            </Link>

        </li>
    )
}

export default Logout