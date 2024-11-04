import { Routes, Route, Navigate } from 'react-router-dom';

import Barra from "./components/Barra";
import Formulario from './pages/Formulario';
import ErrorPage from "./pages/errorPage";

function App() {

  return (
    <>
      <Barra>
        <Routes>
          <Route path="/" element={<Formulario/>}/>
          <Route path="/error" element={<ErrorPage/>} />
          <Route path="*" element={<ErrorPage/> } />
        </Routes>
      </Barra>
    </>
  )
}

export default App
