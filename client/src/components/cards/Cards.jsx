import React from 'react';
import Card from '../card/Card'; 
import style from './Cards.module.css';

export default function Cards({ drivers }) { 
  // La función renderCard toma un objeto 'driver' como argumento y devuelve una instancia del componente Card
  const renderCard = (driver) => (
    <Card
      key={driver.id} 
      id={driver.id} 
      forename={driver.forename} 
      surname={driver.surname} 
      teams={driver.Teams || driver.teams} 
      image={driver.image.url || driver.image} 
      dob={driver.dob} 
    />
  );

  return (
    <div className={style.container}>
      {drivers.map(renderCard)} {/* Mapea los pilotos y llama a la función renderCard para renderizar cada tarjeta */}
    </div>
  );
}

