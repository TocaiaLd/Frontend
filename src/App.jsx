// Hooks usados
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

//
import ProtectRoute from "./components/admin/ProtectRoute"

// Páginas
import PanelAdmin from "./pages/admin/PanelAdmin"
  import HomeTags from "./pages/admin/tags/HomeTags"
  import AddTags from "./pages/admin/tags/AddTags"
  import EditTags from "./pages/admin/tags/EditTags"

  import HomeWorks from "./pages/admin/works/HomeWorks"
  import AddWorks from "./pages/admin/works/AddWorks"
  import EditWork from "./pages/admin/works/EditWorks"

  import AddChapters from "./pages/admin/chapters/AddChapters"
  import HomeChapters from "./pages/admin/chapters/HomeChapters"
  import EditChapters from "./pages/admin/chapters/EditChapters"

import Login from "./pages/common/account/Login"
import Home from "./pages/common/Home"
import Work from "./pages/common/Work"
import Chapter from "./pages/common/Chapter"

// Layouts
import Footer from "./layouts/Footer"
import NavBar from "./layouts/NavBar"
import Sign from "./pages/common/account/Sign"

function App() {

  return (
    <BrowserRouter>
      {/* Guia Superior */}
      <NavBar/>
      <Routes>

        <Route path="/" element={<Home/>}/>

        {/* Painel administrativo */}
        <Route path="/painel-administrativo" element={<ProtectRoute> <PanelAdmin/> </ProtectRoute>}/>
          <Route path="/painel-administrativo/tags" element={<ProtectRoute> <HomeTags/> </ProtectRoute>}/>
          <Route path="/painel-administrativo/tags/adicionar" element={<ProtectRoute> <AddTags/> </ProtectRoute>}/>
          <Route path="/painel-administrativo/tags/editar/:id" element={<ProtectRoute> <EditTags/> </ProtectRoute>}/>


          <Route path="/painel-administrativo/obras" element={<ProtectRoute> <HomeWorks/> </ProtectRoute>}/>
          <Route path="/painel-administrativo/obras/adicionar" element={<ProtectRoute> <AddWorks/> </ProtectRoute>}/>
          <Route path="/painel-administrativo/obras/editar/:id" element={<ProtectRoute> <EditWork/> </ProtectRoute>}/>

          <Route path="/painel-administrativo/capitulos" element={<ProtectRoute> <HomeChapters/> </ProtectRoute>}/>
          <Route path="/painel-administrativo/capitulos/adicionar" element={<ProtectRoute> <AddChapters/> </ProtectRoute>}/>
          <Route path="/painel-administrativo/capitulos/editar/:id" element={<ProtectRoute> <EditChapters/> </ProtectRoute>}/>
        
        {/* Obra */}
        <Route path="/obra/:slug" element={<Work/>}/>
        <Route path="/obra/:slug/:chapter" element={<Chapter/>}/>
        

        {/* Conta */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/criar" element={<Sign/>}/>


      </Routes>
      {/* Rodapé */}
      <Footer/>

    </BrowserRouter>
  )
}

export default App
