// Componentes
import FollowWork from "./buttons/FollowWork"

function WorkCardInfo({work, setMessageError}){
    return(
        <div className="flex flex-col md:flex-row gap-8 bg-gray-800 rounded-xl p-4">
                {/* <!-- Capa --> */}
                <div className="md:w-1/4">
                    <img 
                        src={`${work.image}`} 
                        alt="Capa da Obra" 
                        className="h-full w-full rounded-2xl shadow-md object-cover"
                    />
                </div>

                {/* <!-- Informações --> */}
                <div className="flex-1 space-y-4">
                    <h1 className="text-4xl font-bold">{work.title}</h1>
                    <p className="text-sm">Autor: 
                        <span className="text-gray-50 font-medium"> {work.author}</span>
                    </p>

                    {/* <!-- Tags --> */}
                    <div className="flex flex-wrap gap-2">
                        {work.tags.map((tag) => (
                            <span key={tag._id} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">{tag.title}</span>
                        ))}
                    </div>

                    
                    
                    <FollowWork id={work._id} setMessageError={setMessageError}/>
                           
                   

                    {/* <!-- Descrição --> */}
                    <div className="pt-4">
                        <h2 className="text-xl font-semibold mb-2">Sinopse</h2>
                        <p className="text-gray-50 leading-relaxed">
                        {work.sinopse}
                        </p>
                    </div>

                </div>
        </div>
    )
}

export default WorkCardInfo