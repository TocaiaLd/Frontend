//Hooks
import { Link } from "react-router-dom"

function Footer(){
    return(
        <footer className="bg-gray-800 text-white w-full mt-2">

            <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between">
                <div className="mb-6 md:mb-0">
                    <h3 className="text-xl font-semibold mb-2">Sobre o site</h3>
                    <p className="text-sm text-gray-400 max-w-sm">
                    Este é um projeto para leitura e acompanhamento de quadrinhos. 
                    Adicione aqui suas informações, redes, ou contato.
                    </p>
                </div>
                <div className="">
                    <h3 className="text-xl font-semibold mb-2">Redes Sociais</h3>
                    <ul className="text-sm text-gray-400">
                        <li className="">
                            <Link href="#" className="hover:text-white">Instagram</Link>
                        </li>
                        <li className="">
                            <Link href="#" className="hover:text-white">Twitter</Link>
                        </li>
                        <li className="">
                            <Link href="#" className="hover:text-white">GitHub</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-gray-500 text-sm py-4 border-t border-gray-700">
            © 2025 - Todos os direitos reservados.
            </div>

        </footer>
    )
}

export default Footer