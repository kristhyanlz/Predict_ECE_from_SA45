import { Routes, Route } from 'react-router-dom';

import Barra from "./components/Barra";
import Formulario from './pages/Formulario';
import ErrorPage from "./pages/errorPage";
import ProbarCSV from "./pages/ProbarCSV"

function App() {

  return (
    <>
      <Barra>
        <Routes>
          <Route path="/" element={<Formulario/>}/>
          <Route path="/csv" element={<ProbarCSV/>}/>
          <Route path="/error" element={<ErrorPage/>} />
          <Route path="*" element={<ErrorPage/> } />
        </Routes>
      </Barra>
    </>
  )
}

export default App
