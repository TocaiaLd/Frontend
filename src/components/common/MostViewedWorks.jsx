//Hooks
import {Swiper, SwiperSlide} from "swiper/react"
import { Pagination } from "swiper/modules"
import { Keyboard } from "swiper/modules"
import { Autoplay } from "swiper/modules"
import "swiper/swiper-bundle.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

//componentes
import linkBackend from "../../utilities/linkBackend"
import Loading from "../../layouts/Loading"

function MostViewedWorks(){
    const [mostViewedWorks, setMostViewedWorks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${linkBackend}/mais-populares`, {
            method: "get",
            headers: {"Content-Type":"application/json"},
        })
        .then((res) => res.json())
        .then((data) => {
            setMostViewedWorks(data.mostViewedWorks)
            setLoading(false)
        })
        .catch((error) => 
            navigate(
                "/pagina-de-erro",
                {state: {message: error.message}}
            )
        )

    }, [])

    if(loading){
        return <Loading/>
    }

    return(
        <section className="max-w-6xl mx-auto py-8 px-4">
                
                <h2 className="text-2xl font-semibold mb-4">Mais Populares</h2>
                <div className="relative h-[50vh] mx-auto overflow-hidden rounded-lg shadow-lg">

                    <div className="w-full h-full flex">
                        
                        <Swiper
                        modules={[Pagination, Keyboard, Autoplay]}
                        spaceBetween={0}
                        keyboard={true}
                        slidesPerView={1}
                        pagination={{clickable: true}}
                        autoplay={true}
                        >
                            {mostViewedWorks.map((work) => (
                                <SwiperSlide>
                                    <div className="min-w-full h-full relative" key={work._id}>

                                        <img src={work.image}
                                        alt="Tokyo Ghoul" 
                                        className="w-full h-full object-cover object-[center_20%]"/>
                                    
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 flex flex-col">
                                            <Link to={`/obra/${work.slug}`}>
                                                <h3 className="text-xl font-bold">{work.title}</h3>
                                            </Link>
                                            <p className="text-sm">{work.sinopse}</p>
                                        </div>

                                    </div>
                                </SwiperSlide>
                            ))}

                        </Swiper>
                        
                    </div>

                </div>
        </section>
    )
}

export default MostViewedWorks