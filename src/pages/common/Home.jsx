//Components
import ListOfWorks from "../../components/common/ListOfWorks"
import MostViewedWorks from "../../components/common/MostViewedWorks"

function Home(){

    return(
        <>
            {/* mais vistos */}
            <MostViewedWorks/>

            {/* Últimos lançados */}
            <ListOfWorks linkSearch={"recentes"} page={1} title={`Últimos Lançamentos`}/>
        </>
    )
}

export default Home



  
  




  
