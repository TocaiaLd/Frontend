import { Link } from "react-router-dom"

function OptionCard({tittle, link, description}){
    return(
        <div className="mb-10">
            <Link to={link} className="text-white block w-full h-full bg-gray-800 rounded-2xl p-6 text-center transition hover:bg-gray-900">
                <h2 className="text-xl font-semibold mb-2">{tittle}</h2>
                <p className="text-gray-100">{description}</p>
            </Link>
        </div>
    )
}

export default OptionCard