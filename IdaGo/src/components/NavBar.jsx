import React, { useEffect, useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Swal from 'sweetalert2';
import logo from '../assets/idagologo.png'; // Importa la imagen del logotipo

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => {
    Swal.fire({
      title: "Contáctanos",
      html: `
        <input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
        <input type="email" id="email" class="swal2-input" placeholder="Correo">
        <textarea id="mensaje" class="swal2-textarea" placeholder="Recomendación"></textarea>
      `,
      confirmButtonText: "Enviar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        if (!nombre || !email || !mensaje) {
          Swal.showValidationMessage("Todos los campos son obligatorios");
          return false;
        }

        Swal.fire("¡Mensaje enviado!", "Nos pondremos en contacto pronto.", "success");
      }
    });
  };

  return (
    <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav_logo">
        <img src={logo} alt="IdaGo Logo" className="logo" /> {/* Logotipo */}
      </div>
      <ul className="nav_links">
        <li className="link">
          <AnchorLink href="#header">Inicio</AnchorLink>
        </li>
        <li className="link">
          <AnchorLink href="#booking">Planea</AnchorLink>
        </li>
        <li className="link">
          <AnchorLink href="#plan-section">Aventuras</AnchorLink>
        </li>
        <li className="link">
          <AnchorLink href="#safe-spaces">Espacios</AnchorLink>
        </li>
        <li className="link">
          <AnchorLink href="#best-trips">Top viajes</AnchorLink>
        </li>
      </ul>
      <button className="btn" onClick={handleContactClick}>Contacto</button>
    </nav>
  );
};

export default NavBar;