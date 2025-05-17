import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from "react-qr-code";
import '../styles/compbo.css';

const availableRoutes = [
  {
    id: 1,
    origin: "Ciudad de México",
    destination: "Monterrey",
    busName: "Ruta Express",
    type: "Con paradas intermedias",
    departure: "08:00 Hrs",
    arrival: "14:00 Hrs",
    priceNormal: 800.00,
    pricePromo: 720.00,
    stops: ["Querétaro", "San Luis Potosí"],
  },
  {
    id: 2,
    origin: "Ciudad de México",
    destination: "Monterrey",
    busName: "Direct Line",
    type: "Viaje directo",
    departure: "10:00 Hrs",
    arrival: "16:00 Hrs",
    priceNormal: 900.00,
    pricePromo: 810.00,
    stops: [], // Sin paradas intermedias
  },
  {
    id: 3,
    origin: "Ciudad de México",
    destination: "Guadalajara",
    busName: "Ruta Veloz",
    type: "Con paradas intermedias",
    departure: "07:00 Hrs",
    arrival: "12:00 Hrs",
    priceNormal: 500.00,
    pricePromo: 450.00,
    stops: ["Toluca", "Morelia"],
  },
  {
    id: 4,
    origin: "Monterrey",
    destination: "Cancún",
    busName: "Ruta Caribeña",
    type: "Con paradas intermedias",
    departure: "09:00 Hrs",
    arrival: "20:00 Hrs",
    priceNormal: 1200.00,
    pricePromo: 1080.00,
    stops: ["Tampico", "Villahermosa"],
  },
  {
    id: 5,
    origin: "Guadalajara",
    destination: "Tijuana",
    busName: "Ruta Pacífico",
    type: "Con paradas intermedias",
    departure: "06:00 Hrs",
    arrival: "18:00 Hrs",
    priceNormal: 1500.00,
    pricePromo: 1350.00,
    stops: ["Mazatlán", "Hermosillo"],
  },
  {
    id: 6,
    origin: "Cancún",
    destination: "Tijuana",
    busName: "Ruta Transcontinental",
    type: "Con paradas intermedias",
    departure: "12:00 Hrs",
    arrival: "24:00 Hrs",
    priceNormal: 2000.00,
    pricePromo: 1800.00,
    stops: ["Mérida", "Ciudad de México", "Guadalajara"],
  },
  // faltana gregar las directas
];
const SeatMap = ({ onSelectSeat, selectedSeats, passengerIndex }) => {
  const totalSeats = 10; // Solo 10 asientos disponibles

  return (
    <div className="seat-map">
      <h3>Selecciona tu asiento</h3>
      <div className="seats">
        {Array.from({ length: totalSeats }, (_, index) => {
          const seatNumber = index + 1; // Los asientos van del 1 al 10
          return (
            <button
              key={seatNumber}
              className={`seat ${selectedSeats.includes(seatNumber) ? 'selected' : ''}`}
              onClick={() => onSelectSeat(seatNumber)}
            >
              {seatNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const SearchPage = () => {
  const location = useLocation();
  const { origin, destination, passengers, departureDate, returnDate } = location.state || {};

  const [timeLeft, setTimeLeft] = useState(300);
  const [ticket, setTicket] = useState(null);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    paymentMethod: 'Tarjeta de crédito',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    paypalEmail: '',
    transferReference: '',
    passengerNames: Array.from({ length: passengers }, () => '')
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]); // Asientos seleccionados
  const [showSeatMap, setShowSeatMap] = useState(false); // Estado para mostrar/ocultar el mapa de asientos
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSelectTrip = (departure, arrival, price) => {
    setSelectedTrip({ departure, arrival, price });
    setShowLoginOptions(true);
  };

  const handleLoginOption = (option) => {
    if (option === 'guest') {
      setShowLoginOptions(false);
      setShowPurchaseForm(true); // Mostrar directamente el formulario de compra
    } else if (option === 'login') {
      setShowLoginForm(true);
      setShowLoginOptions(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Inicio de sesión exitoso. Redirigiendo...");
    setShowLoginForm(false);
    setShowPurchaseForm(true);
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePassengerNameChange = (index, value) => {
    const newPassengerNames = [...formData.passengerNames];
    newPassengerNames[index] = value;
    setFormData({ ...formData, passengerNames: newPassengerNames });
  };

  const handleSelectSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      alert("Este asiento ya está seleccionado. Por favor, elige otro.");
      return;
    }

    if (selectedSeats.length >= passengers) {
      alert("Ya has seleccionado asientos para todos los pasajeros.");
      return;
    }

    setSelectedSeats([...selectedSeats, seatNumber]);
  };

  const handlePurchase = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (selectedSeats.length < passengers) {
      alert("Por favor, selecciona un asiento para cada pasajero.");
      return;
    }

    if (formData.paymentMethod === "Tarjeta de crédito" && (!formData.cardNumber || !formData.cardExpiry || !formData.cardCVV)) {
      alert("Por favor, completa los datos de la tarjeta.");
      return;
    }

    if (formData.paymentMethod === "PayPal" && !formData.paypalEmail) {
      alert("Por favor, ingresa tu correo de PayPal.");
      return;
    }

    if (formData.paymentMethod === "Transferencia bancaria" && !formData.transferReference) {
      alert("Por favor, ingresa la referencia de la transferencia.");
      return;
    }

    const priceValue = selectedTrip?.price ? parseFloat(selectedTrip.price.replace('$', '')) : 0;
    const totalPrice = priceValue * passengers;

    const ticketNumber = Math.floor(Math.random() * 1000000);

    setTicket({
      number: ticketNumber,
      date: departureDate,
      departure: selectedTrip.departure,
      arrival: selectedTrip.arrival,
      seats: selectedSeats,
      price: `$${totalPrice.toFixed(2)}`,
      name: formData.name,
      email: formData.email,
      paymentMethod: formData.paymentMethod,
      passengerNames: formData.passengerNames
    });

    setShowPurchaseForm(false);
    setPurchaseSuccess(true);

    setTimeout(() => {
      setPurchaseSuccess(false);
    }, 5000);
  };

  // Filtrar las rutas disponibles según el origen y destino seleccionados
  const filteredRoutes = availableRoutes.filter(
    (route) => route.origin === origin && route.destination === destination
  );

  return (
    <div className="search-page">
      <div className="container">
        <header id="header">
          <h1>IDAGO <span className="plus"></span></h1>
        </header>

        <section id="booking">
          <h2>Selecciona tu horario</h2>
          <div className="timer">{formatTime(timeLeft)}</div>
          <div className="route">
            <p><strong>Origen:</strong> {origin}</p>
            <p><strong>Destino:</strong> {destination}</p>
            <p><strong>Pasajeros:</strong> {passengers}</p>
          </div>
          <div className="trips">
            {filteredRoutes.length > 0 ? (
              filteredRoutes.map((route) => (
                <div className="trip" key={route.id}>
                  <p><strong>Autobús: {route.busName}</strong></p>
                  <p><strong>Tipo:</strong> {route.type}</p>
                  <p><strong>Sale:</strong> {route.departure}</p>
                  <p><strong>Llega:</strong> {route.arrival}</p>
                  <p className="price">Normal: <span className="strike">${route.priceNormal.toFixed(2)}</span></p>
                  <p className="price internet">Promoción: ${route.pricePromo.toFixed(2)}</p>
                  <p><strong>Servicios:</strong> {route.services ? route.services.join(", ") : "No hay servicios disponibles"}</p>
                  {route.stops && route.stops.length > 0 && (
                    <>
                      <p><strong>Paradas intermedias:</strong></p>
                      <ul className="stops-list">
                        {route.stops.map((stop, index) => (
                          <li key={index}>{stop}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  <button
                    className="select-btn"
                    onClick={() => handleSelectTrip(route.departure, route.arrival, `$${route.pricePromo.toFixed(2)}`)}
                  >
                    <i className="fas fa-check"></i> Seleccionar
                  </button>
                </div>
              ))
            ) : (
              <p>No hay autobuses disponibles para esta ruta.</p>
            )}
          </div>
        </section>
      </div>

      {showLoginOptions && (
        <div className="login-options card">
          <h2>¿Cómo deseas continuar?</h2>
          <button className="button" onClick={() => handleLoginOption('guest')}>Seguir como invitado</button>
          <button className="button" onClick={() => handleLoginOption('login')}>Iniciar sesión</button>
        </div>
      )}

      {showLoginForm && (
        <div className="login-form card">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <label>Email:</label>
            <input type="email" name="email" value={loginData.email} onChange={handleLoginInputChange} required />
            <label>Contraseña:</label>
            <input type="password" name="password" value={loginData.password} onChange={handleLoginInputChange} required />
            <button type="submit" className="button">Iniciar Sesión</button>
          </form>
        </div>
      )}

      {showPurchaseForm && (
       <div className="purchase-form card">
       <h2>Formulario de Compra</h2>
       <div className="form-container">
         <div className="summary">
           <h3>Resumen de la Compra</h3>
           <p><strong>Origen:</strong> {origin}</p>
           <p><strong>Destino:</strong> {destination}</p>
           <p><strong>Pasajeros:</strong> {passengers}</p>
           <p><strong>Salida:</strong> {departureDate}</p>
           <p><strong>Hora de Salida:</strong> {selectedTrip?.departure}</p>
           <p><strong>Hora de Llegada:</strong> {selectedTrip?.arrival}</p>
           <p><strong>Precio Total:</strong> ${(parseFloat(selectedTrip?.price.replace('$', '')) * passengers).toFixed(2)}</p>
         </div>
     
         <form onSubmit={handlePurchase}>
           <div className="form-group">
             <label>Nombre del comprador:</label>
             <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
           </div>
     
           <div className="form-group">
             <label>Email del comprador:</label>
             <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
           </div>
     
           {formData.passengerNames.map((name, index) => (
             <div className="form-group" key={index}>
               <label>Nombre del pasajero {index + 1}:</label>
               <input
                 type="text"
                 value={name}
                 onChange={(e) => handlePassengerNameChange(index, e.target.value)}
                 required
               />
             </div>
           ))}
     
           {passengers === 1 ? (
             <SeatMap
               onSelectSeat={handleSelectSeat}
               selectedSeats={selectedSeats}
             />
           ) : (
             <>
               {!showSeatMap ? (
                 <button
                   type="button"
                   className="button"
                   onClick={() => setShowSeatMap(true)}
                 >
                   Seleccionar asientos
                 </button>
               ) : (
                 <SeatMap
                   onSelectSeat={handleSelectSeat}
                   selectedSeats={selectedSeats}
                 />
               )}
             </>
           )}
     
           <div className="form-group">
             <label>Método de Pago:</label>
             <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
               <option value="Tarjeta de crédito">Tarjeta de crédito</option>
               <option value="PayPal">PayPal</option>
               <option value="Transferencia bancaria">Transferencia bancaria</option>
             </select>
           </div>
     
           {formData.paymentMethod === "Tarjeta de crédito" && (
             <>
               <div className="form-group">
                 <label>Número de Tarjeta:</label>
                 <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required />
               </div>
     
               <div className="form-row">
                 <div className="form-group">
                   <label>Fecha de Vencimiento:</label>
                   <input type="text" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} required />
                 </div>
     
                 <div className="form-group">
                   <label>CVV:</label>
                   <input type="text" name="cardCVV" value={formData.cardCVV} onChange={handleInputChange} required />
                 </div>
               </div>
             </>
           )}
     
           {formData.paymentMethod === "PayPal" && (
             <div className="form-group">
               <label>Correo de PayPal:</label>
               <input type="email" name="paypalEmail" value={formData.paypalEmail} onChange={handleInputChange} required />
             </div>
           )}
     
           {formData.paymentMethod === "Transferencia bancaria" && (
             <div className="form-group">
               <label>Referencia de la Transferencia:</label>
               <input type="text" name="transferReference" value={formData.transferReference} onChange={handleInputChange} required />
             </div>
           )}
     
           <button type="submit" className="button confirm-button">Confirmar Compra</button>
         </form>
       </div>
     </div>
      )}

      {ticket && (
        <div id="ticket" className="card">
          <h2>Tu Ticket</h2>
          <p><strong>Número de boleto:</strong> {ticket.number}</p>
          <p><strong>Nombre del comprador:</strong> {ticket.name}</p>
          {ticket.passengerNames.map((name, index) => (
            <p key={index}>
              <strong>Pasajero {index + 1}:</strong> {name} (Asiento: {ticket.seats[index]})
            </p>
          ))}
          <p><strong>Precio:</strong> {ticket.price}</p>
          <QRCode value={`Boleto: ${ticket.number}, Pasajeros: ${ticket.passengerNames.join(', ')}, Asientos: ${ticket.seats.join(', ')}`} />
          <button className="button" onClick={() => window.print()}>Imprimir Ticket</button>
        </div>
      )}

      {purchaseSuccess && (
        <div className="success-message">
          Compra realizada con éxito. ¡Gracias por tu compra!
        </div>
      )}
    </div>
  );
};

export default SearchPage;