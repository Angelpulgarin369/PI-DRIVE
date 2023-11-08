import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import style from './Detail.module.css';
const defaultImage = "https://www.donolli.com.ar/defaultImagePI.png"

function Detail() {
  const { id } = useParams(); 
  const [driver, setDriver] = useState({});
  const URL_BASE = `http://localhost:3001/drivers/${id}`;

  useEffect(() => {
    axios(URL_BASE)
      .then(({ data }) => {
        if (data.id) {
          const image = typeof data.id !== "string" ? data.image.url : data.image;
          setDriver({ ...data, image });
        } else {
          setDriver({ notFound: true });
        }
      })
      .catch((error) => {
        console.error("Error fetching driver:", error);
      });
  }, [id]);

  const renderTeams = () => {
    if (typeof driver.teams === 'string') {
      return <span>{driver.teams}</span>;
    } else if (Array.isArray(driver.Teams) && driver.Teams.length > 0) {
      return (
        <span>
          {driver.Teams.map((team, index) =>
            index === driver.Teams.length - 1 ? team.name : `${team.name}, `
          )}
        </span>
      );
    } else {
      return <span>No se encontraron escuderías</span>;
    }
  };

  const handleDownload = () => {
    // Crear un elemento "a" para descargar la tarjeta completa
    const downloadLink = document.createElement("a");

    // Construir el contenido de la tarjeta completa (puedes personalizar esto)
    const cardContent = `
      Driver: ${driver.name.forename} ${driver.name.surname}
      Nationality: ${driver.nationality}
      Date of Birth: ${driver.dob}
      Description: ${driver.description}
      Teams: ${renderTeams()}
    `;

    // Crear un Blob (objeto binario) con el contenido de la tarjeta
    const blob = new Blob([cardContent], { type: "text/plain" });

    // Configurar el enlace de descarga
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "driver_card.txt"; // Nombre del archivo

    // Simular un clic en el enlace para iniciar la descarga
    downloadLink.click();
  };

  return (
    <div className={style.container}>
      <div>
        <h2 className={style.title}>Driver's detail</h2>
      </div>

      {/* Agrega un botón que redirija a la página de inicio */}
      <Link to="/home">
        <button className={style.button}>HOME</button>
      </Link>

      {/* Agrega un botón para descargar la card completa */}
      <button className={style.downloadButton} onClick={handleDownload}>
        Descargar Card Completa
      </button>

      <div className={style.detail}>
        <div className={style.leftColumn}>
          <h1 className={style.specialFont}>
            <span>{driver.name ? driver.name.forename : driver.forename}</span>
            <span>{driver.name ? driver.name.surname : driver.surname}</span>
          </h1>
          <div className={style.infoDriver}>
            <p><span className={style.negrita}>Nationality:</span> {driver.nationality}</p>
            <p><span className={style.negrita}>Date of Birth:</span> {driver.dob}</p>
            <p><span className={style.negrita}>Description:</span> {driver.description}</p>
            <div><span className={style.negrita}>Teams:</span> {renderTeams()}</div>
            <p><span className={style.negrita}>Id:</span> {driver.id}</p>
          </div>
        </div>
        <div className={style.rightColumn}>
          <img
            src={driver.image ? driver.image : defaultImage}
            alt={driver.surname}
            className={style.circularImage}
          />
        </div>
      </div>
    </div>
  );
}

export default Detail;