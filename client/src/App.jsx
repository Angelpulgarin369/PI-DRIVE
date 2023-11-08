import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

// Importaciones de componentes
import LandingPage from './components/landing/LandingPage';
import Home from "./components/home/Home";
import Detail from './components/detail/Detail';
import CreateDriver from './components/createdriver/CreateDriver';
import Nav from './components/nav/Nav';

// Importaciones de acciones Redux
import { getDriverByName, getAllDrivers } from './redux/actions/actions';

// Otras importaciones (como estilos)
import './App.css';

function App() {
  // Configuración inicial
  const { pathname } = useLocation(); // Obtiene la ruta actual
  const navigate = useNavigate(); // Función para navegar a otras rutas
  const dispatch = useDispatch(); // Función para despachar acciones de Redux
  const [searchString, setSearchString] = useState(""); // Estado para el término de búsqueda

  // Función para actualizar el término de búsqueda
  const onSearch = (name) => {
    setSearchString(name);
  };

  // Función para manejar el clic en el botón de inicio
  const onHomeClick = () => {
    setSearchString(""); // Limpia el término de búsqueda
    dispatch(getAllDrivers()); // Obtiene todos los conductores nuevamente
  };

  // Efecto de efecto secundario para buscar conductores cuando cambia el término de búsqueda
  useEffect(() => {
    if (searchString) {
      dispatch(getDriverByName(searchString)); // Busca conductores por nombre
    }
  }, [searchString, dispatch]);

  return (
    <div className='App'>
      {pathname !== '/' && (
        <Nav
          onSearch={onSearch} // Pasa la función onSearch a Nav
          onHomeClick={onHomeClick} // Pasa la función onHomeClick a Nav
        />
      )}
      <Routes>
        {/* Define las rutas de la aplicación */}
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<CreateDriver />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;