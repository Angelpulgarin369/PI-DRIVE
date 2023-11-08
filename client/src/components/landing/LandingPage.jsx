import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'; // Importa los estilos

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.landingPage}>
        <div className={styles.content}>
          <h1>♥ Descubre a los Pilotos de Fórmula 1 ♥</h1>
          <p>¡𝓓𝓮𝓼𝓬𝓾𝓫𝓻𝓮 𝓺𝓾𝓲é𝓷𝓮𝓼 𝓼𝓸𝓷!</p>
          <Link to="/home" className={styles.enterButton}>
            Ingresar
          </Link>
        </div>
        <div className={styles['message-box']}>
          <p className={styles.message}>
          ¡Bienvenido a la emocionante aventura de descubrir a los legendarios pilotos de Fórmula 1! ¡Prepárate para explorar el apasionante mundo de las carreras de Fórmula 1 y conoce a tus héroes en la pista!
          </p>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;