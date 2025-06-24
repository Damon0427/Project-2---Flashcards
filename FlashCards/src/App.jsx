import { useState,useEffect } from 'react'
import Card from './components/Card'
import riceVinegar from './assets/riceV.jpg'
import miso from './assets/miso.jpg'
import pho from './assets/pho.jpg'
import './App.css'

function App() {
  const initflashCard = [
    { name: 'What type of vinegar is usually used to season Japanese "sushi"?', answer: 'Rice vinegar', difficulty: 'easy',imageLink: riceVinegar },
    { name: 'What type of rice is used for sushi?', answer: 'Short-grain rice', difficulty: 'medium' },
    { name: 'What is the main ingredient in miso soup?', answer: 'Miso paste', difficulty: 'easy',imageLink:miso },
    { name: 'Which Southeast Asian herb has a strong citrus flavor and is commonly used in Thai and Vietnamese dishes?', answer: 'Lemongrass', difficulty: 'medium' },
    { name: 'What is the main ingredient in pho broth?', answer: 'Beef or chicken bones', difficulty: 'hard' },
    { name: 'In Vietnamese cuisine, what is the noodle soup with herbs, beef or chicken, and rice noodles called?', answer: 'Pho', difficulty: 'easy',imageLink:pho}, 
    { name: 'What is the main ingredient in kimchi?', answer: 'Fermented vegetables', difficulty: 'medium' },
    { name: 'What is the Japanese dish made of thinly sliced raw fish called?', answer: 'Sashimi', difficulty: 'hard' },
    { name: 'What do the "numbing" and "spicy" in the Chinese dish "Mapo Tofu" mean?', answer: 'Sichuan peppercorns and chili peppers', difficulty: 'medium' },
    { name: 'What is the name of the spice mix commonly used in Indian cuisine?', answer: 'Garam masala', difficulty: 'easy' }
  ];
  const normalizInput = (input) => {
    return input
    .trim()
    .toLowerCase()
    .replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
  }

  const [count, setCount] = useState(1)
  const [isClicked, setIsClicked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)
  const [input,setInput] = useState('')
  const [showStatus, setShowStatus] = useState('');
  const [flashCard, setFlashCard] = useState(initflashCard);
  const [masterCard, setMasterCard] = useState([]);

  const shuffleCard = () => {
    const shuffledCards = flashCard.sort(() => Math.random() - 0.5);
    setFlashCard(shuffledCards);
    setCount(1);
    setInput('');
  }
  useEffect(() => { 
    if (showStatus === 'correct') {
      setCorrectCount(prevCount => {
        const newCount = prevCount + 1
        setLongestStreak(prevLongest => Math.max(prevLongest, newCount));
        return newCount;
      });
    } else if (showStatus === 'Incorrect') {
      setCorrectCount(0);
    }
  },[showStatus]);

    
  const checkAnswer = () => {
    const normalizedInput = normalizInput(input);
    const correctAnswer = normalizInput(flashCard[count - 1].answer);
    if (correctAnswer.includes(normalizedInput)) {
      setShowStatus('correct')
    } else {
      setShowStatus('Incorrect')
    }
    setTimeout(() => {
      setShowStatus('');
    }, 1500);
  }
  const updateInput = (e) => {
    setInput(e.target.value)
  }

  const updateClick = () => {
    setIsClicked(!isClicked)
  }

  const addMasterCard = () => {
    setFlashCard(prevCards => prevCards.filter((_, index) => index !== count - 1));
    setMasterCard(prevMasterCards => [ ...prevMasterCards, flashCard[count - 1] ]);
    if (count > 1) {
      setCount(count - 1);
    }
    setIsClicked(false);
  }

  const goNext = () => {
    if (count < 10) {
      setCount(count + 1)
      setIsClicked(false)
    }
  }
  const goBack = () => {
    if (count > 1) {
      setCount(count - 1)
      setIsClicked(false)
    }
  }

  return (
    <>
      <div className='title'>
        <h1> Asian cuisine knowledge </h1>
        <h2> Let find out what u know about Asian cuisine </h2>
        <h3>Number Of Card: {count} / {flashCard.length}</h3>
      </div>
      <div className='status-board'>
        <span>Current Streak: {correctCount} </span>
        <span>longest Streak: {longestStreak}</span>
      </div>
      <div className='card-container' onClick={updateClick}>
        <div className={`card-inner ${isClicked ? 'clicked' :''}`}>
          <Card Category='Question' className='card-front' content={flashCard[count-1].name} difficulty= {flashCard[count-1].difficulty} imageLink={flashCard[count-1].imageLink} />
          <Card Category = 'Answer' className='card-back' content={flashCard[count-1].answer} difficulty ={flashCard[count-1].difficulty} />
        </div>
      </div>
      <div className='input-section'>
        <span >Guess the your answer here:</span>
        <input type="text" onChange={updateInput} />
        <button className='submit-button' onClick={checkAnswer}>submit</button>
      </div>
      <div className='action-buttons'>
        <button onClick={goBack}> ← Back </button>
        <button onClick={goNext}> Next →</button>
        <button onClick={shuffleCard}>Shuffle</button>
        <button onClick={addMasterCard}>Master</button>
      </div>

      {showStatus === 'correct' && (
        <div className="overlay">
          <div className="success-box">
            🎉 Great job! your answer is correct.
          </div>
        </div>
      )}
      {showStatus === 'Incorrect' && (
        <div className="overlay">
          <div className="error-box">
            ❌ Oops! answers are incorrect. Please try again.
          </div>
        </div>
      )}
    </>
  )
}

export default App
