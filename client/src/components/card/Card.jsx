import React from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom';

const defaultImage = "https://www.donolli.com.ar/defaultImagePI.png"

function Card(props) {
    const { id, image, forename, surname, teams, dob } = props;

    return (
      <div className={style.container}>
        {/* Imagen del piloto */}
        <img src={image || defaultImage} alt={`${forename} ${surname}`} className={style.image} />

        <Link to={`/detail/${id}`}>
          {/* Enlace al detalle del piloto */}
          <h3 className={style.name}>{forename} {surname}</h3>
        </Link>
        {/* Fecha de nacimiento del piloto */}
        <div className={style.dob}>Date of Birth: {dob}</div>
        <h4>Teams:</h4>
        <div className={style.teams}>
          {typeof teams === 'string'
            ? <p>{teams}</p>
            : Array.isArray(teams) && teams.length > 0
              ? (
                <p>
                  {teams.map((team, index) => (
                    index === teams.length - 1 ? team.name : `${team.name}, `
                  ))}
                </p>
              )
              : (
                <p>No teams found.</p>
              )}
        </div>
      </div>
    )
  }
  
  export default Card;