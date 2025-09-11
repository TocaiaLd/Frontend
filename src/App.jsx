// Hooks usados
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// Páginas
import PanelAdmin from "./pages/admin/PanelAdmin"
  import HomeTags from "./pages/admin/tags/HomeTags"
  import AddTags from "./pages/admin/tags/AddTags"
  import HomeWorks from "./pages/admin/works/HomeWorks"

import Login from "./pages/common/account/Login"
import Home from "./pages/common/Home"
import Work from "./pages/common/Work"

// Layouts
import Footer from "./layouts/Footer"
import NavBar from "./layouts/NavBar"
import Sign from "./pages/common/account/Sign"
import AddWorks from "./pages/admin/works/AddWorks"

function App() {

  return (
    <BrowserRouter>
      {/* Guia Superior */}
      <NavBar/>
      <Routes>

        <Route path="/" element={<Home/>}/>

        {/* Painel administrativo */}
        <Route path="/painel-administrativo" element={<PanelAdmin/>}/>
          <Route path="/painel-administrativo/tags" element={<HomeTags/>}/>
            <Route path="/painel-administrativo/tags/adicionar" element={<AddTags/>}/>

          <Route path="/painel-administrativo/obras" element={<HomeWorks/>}/>
            <Route path="/painel-administrativo/obras/adicionar" element={<AddWorks/>}/>

          <Route path="/painel-administrativo/capitulos"/>
            <Route path="/painel-administrativo/capitulos/adicionar"/>
        
        {/* Obra */}
        <Route path="/obra/:slug" element={<Work/>}/>

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
