import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    passengers: '',
    departureDate: '',
    returnDate: '',
  });

  const locations = ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Cancún', 'Tijuana'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearchClick = () => {
    navigate('/search', { state: { ...formData } });
  };

  return (
    <div className="booking-form__container">
      <h2>Selecciona tu horario</h2>
      <div className="booking-form__nav">
        <span className="active">Clase económica</span>
      </div>
      <form>
        {/* Campo de Origen */}
        <div className="booking-form__group">
          <span><i className="ri-map-pin-2-line"></i></span>
          <div className="booking-form__input-group">
            <select name="origin" value={formData.origin} onChange={handleInputChange}>
              <option value=""></option> {/* Opción vacía */}
              {locations.map((loc, index) => (
                <option key={index} value={loc}>{loc}</option>
              ))}
            </select>
            <label>Origen</label>
          </div>
        </div>

        {/* Campo de Destino */}
        <div className="booking-form__group">
          <span><i className="ri-map-pin-2-line"></i></span>
          <div className="booking-form__input-group">
            <select name="destination" value={formData.destination} onChange={handleInputChange}>
              <option value=""></option> {/* Opción vacía */}
              {locations.map((loc, index) => (
                <option key={index} value={loc}>{loc}</option>
              ))}
            </select>
            <label>Destino</label>
          </div>
        </div>

        {/* Campo de Pasajeros */}
        <div className="booking-form__group">
          <span><i className="ri-user-3-line"></i></span>
          <div className="booking-form__input-group">
            <input
              type="number"
              name="passengers"
              value={formData.passengers}
              onChange={handleInputChange}
              placeholder=" " // Placeholder vacío
            />
            <label>Pasajeros</label>
          </div>
        </div>

        {/* Campo de Partida */}
        <div className="booking-form__group">
          <span><i className="ri-calendar-check-line"></i></span>
          <div className="booking-form__input-group">
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleInputChange}
            />
            <label>Partida</label>
          </div>
        </div>

        {/* Campo de Regreso */}
        <div className="booking-form__group">
          <span><i className="ri-calendar-check-line"></i></span>
          <div className="booking-form__input-group">
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleInputChange}
            />
            <label>Regreso</label>
          </div>
        </div>

        {/* Botón de Buscar */}
        <button className="booking-form__btn" type="button" onClick={handleSearchClick}>
          <i className="ri-search-2-line"></i> Buscar
        </button>
      </form>
    </div>
  );
};

export default BookingForm;