import React, { useState } from 'react';
import style from './SearchBar.module.css';

export default function SearchBar({ onSearch }) {
  // Estado para almacenar el texto de búsqueda
  const [searchName, setSearchName] = useState('');

  // Manejador de cambios para el campo de búsqueda
  const handleChange = (event) => {
    // Actualiza el estado con el texto ingresado por el usuario
    setSearchName(event.target.value);
  };

  // Manejador para realizar la búsqueda
  const search = () => {
    // Llama a la función de búsqueda y pasa el texto actual
    onSearch(searchName);
    // Borra el contenido del campo de búsqueda
    setSearchName('');
  };

  return (
    <div className={style.divSearch}>
      {/* Input para ingresar el texto de búsqueda */}
      <input
        type="search"
        value={searchName}
        onChange={handleChange}
        placeholder="busca su driver favorito"
      />
      {/* Botón para realizar la búsqueda */}
      <button onClick={search} className={style.searchButton}>
        Buscar
      </button>
    </div>
  );
}