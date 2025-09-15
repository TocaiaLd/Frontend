// Hooks
import { useNavigate } from "react-router-dom"

// Componentes
import OptionCard from "../../components/admin/OptionCard"

function PanelAdmin(){
    const navigate = useNavigate()

    return(
        <>
            {/* Titulo */}
            <h1 className="text-3xl font-bold mb-8 mt-8 text-center">Painel Administrativo</h1>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto">
                {/* Tags */}
                <OptionCard 
                tittle="Tags" 
                description="Criar, alterar e excluir Tags" 
                link="/painel-administrativo/tags"
                />

                {/* Obras */}
                <OptionCard 
                tittle="Obras" 
                description="Criar, alterar e excluir Obras" 
                link="/painel-administrativo/obras"
                />

                {/* Obras */}
                <OptionCard 
                tittle="Capítulos" 
                description="Criar, alterar e excluir Capítulos" 
                link="/painel-administrativo/capitulos"
                />

            </div>   
        </>
    )
}

export default PanelAdmin
