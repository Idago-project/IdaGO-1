import React from 'react';
const PlanSection = () => {
    return (
      <section className="section__container plan__container">
        <p className="subheader">Apoyo de tu pasaje</p>
        <h2 className="section__header">Planea tu viaje</h2>
        <p className="description">
          Encuentra ayuda con tus reservas y ver qué esperar a lo largo de tu viaje.
        </p>
        <div className="plan__grid">
          <div className="plan__content">
            <span className="number">01</span>
            <h4>Requisitos de viaje</h4>
            <p>Mantente informado para tu viaje con ciertos requerimientos.</p>
            <span className="number">02</span>
            <h4>Riesgos de viaje</h4>
            <p>Protección para tu tranquilidad que cubre una variedad de posibles riesgos y situaciones inesperadas.</p>
            <span className="number">03</span>
            <h4>Requisitos de viaje por destinos</h4>
            <p>Mantente informado y planea tu viaje con facilidad.</p>
          </div>
          <div className="plan__image">
            <img src="src/assets/bus1.jpg" alt="plan" />
            <img src="src/assets/bus2.jpg" alt="plan" />
            <img src="src/assets/bus3.jpg" alt="plan" />
          </div>
        </div>
      </section>
    );
  };
  
  export default PlanSection;
  