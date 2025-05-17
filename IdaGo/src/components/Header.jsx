import React from 'react';
import headerImage from '../assets/img2.jpg'; // Asegúrate de que la ruta sea correcta

const Header = () => {
  return (
    <header className="header">
      <img 
        src={headerImage} 
        alt="Header" 
        className="header__image" 
      />
    </header>
  );
};

export default Header;