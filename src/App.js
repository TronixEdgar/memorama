import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estado para las cartas del memorama (8 pares)
  const [cards, setCards] = useState([
    { id: 1, value: 'A', isFlipped: false, image: '/Images/cardA.png' },
    { id: 2, value: 'B', isFlipped: false, image: '/Images/cardB.png' },
    { id: 3, value: 'A', isFlipped: false, image: '/Images/cardA.png' },
    { id: 4, value: 'B', isFlipped: false, image: '/Images/cardB.png' },
    { id: 5, value: 'C', isFlipped: false, image: '/Images/cardC.png' },
    { id: 6, value: 'D', isFlipped: false, image: '/Images/cardD.png' },
    { id: 7, value: 'C', isFlipped: false, image: '/Images/cardC.png' },
    { id: 8, value: 'D', isFlipped: false, image: '/Images/cardD.png' },
    { id: 9, value: 'E', isFlipped: false, image: '/Images/cardE.png' },
    { id: 10, value: 'F', isFlipped: false, image: '/Images/cardF.png' },
    { id: 11, value: 'E', isFlipped: false, image: '/Images/cardE.png' },
    { id: 12, value: 'F', isFlipped: false, image: '/Images/cardF.png' },
    { id: 13, value: 'G', isFlipped: false, image: '/Images/cardG.png' },
    { id: 14, value: 'H', isFlipped: false, image: '/Images/cardH.png' },
    { id: 15, value: 'G', isFlipped: false, image: '/Images/cardG.png' },
    { id: 16, value: 'H', isFlipped: false, image: '/Images/cardH.png' },
  ]);

  const [flippedCards, setFlippedCards] = useState([]);
  const [won, setWon] = useState(false);
  const [time, setTime] = useState(0); // Estado para el tiempo
  const [isTimerActive, setIsTimerActive] = useState(false); // Estado para controlar el reloj

  // Función para voltear las cartas
  const flipCard = (id) => {
    if (flippedCards.length === 2 || won) return;

    const updatedCards = cards.map(card =>
      card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
    );
    setCards(updatedCards);

    const flippedCard = cards.find(card => card.id === id);
    setFlippedCards([...flippedCards, flippedCard]);

    if (!isTimerActive) {
      setIsTimerActive(true); // Iniciar el temporizador cuando se voltea la primera carta
    }

    if (flippedCards.length === 1) {
      const [firstCard] = flippedCards;
      if (firstCard.value !== flippedCard.value) {
        setTimeout(() => {
          const resetCards = cards.map(card =>
            card.id === firstCard.id || card.id === flippedCard.id
              ? { ...card, isFlipped: false }
              : card
          );
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      } else {
        setFlippedCards([]);
      }
    }
  };

  // Mezclar las cartas al inicio del juego
  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  // Comprobar si el jugador ha ganado
  useEffect(() => {
    const allCardsFlipped = cards.every(card => card.isFlipped);
    if (allCardsFlipped) {
      setWon(true);
      setIsTimerActive(false); // Detener el temporizador cuando se gane
    }
  }, [cards]);

  // Llamar a la función shuffle cuando el juego se cargue
  useEffect(() => {
    shuffleCards();
  }, []);

  // Lógica del temporizador
  useEffect(() => {
    let timer;
    if (isTimerActive && !won) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 0.1); // Incrementar con 0.1
      }, 100);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer); // Limpiar el intervalo al salir
  }, [isTimerActive, won]);

  return (
    <div className={`App ${won ? 'won' : ''}`}>
      <header className="App-header">
        <h1>Juego de Memorama</h1>
        {won && <div className="congratulations">¡Felicidades! ¡Has ganado!</div>}
        
        <div className="timer">
          {`Tiempo: ${time.toFixed(1)}s`}
        </div>

        <div className="card-container">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`card ${card.isFlipped ? 'flipped' : ''}`}
              onClick={() => flipCard(card.id)}
            >
              <div className="card-inner">
                {card.isFlipped ? (
                  <img src={card.image} alt={card.value} />
                ) : (
                  <img src={process.env.PUBLIC_URL + '/Images/cardBack.png'} alt="Card Back" className="card-back" />
                )}
              </div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;