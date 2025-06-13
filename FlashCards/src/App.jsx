import { useState } from 'react'
import Card from './components/Card'
import riceVinegar from './assets/riceV.jpg'
import miso from './assets/miso.jpg'
import './App.css'

function App() {
  const [count, setCount] = useState(10)
  const [isClicked, setIsClicked] = useState(false)
  const updateClick = () => {
    setIsClicked(!isClicked)

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
  const flashCard = [
    { name: 'What type of vinegar is usually used to season Japanese "sushi"?', answer: 'Rice vinegar', difficulty: 'easy',imageLink: riceVinegar },
    { name: 'What type of rice is used for sushi?', answer: 'Short-grain rice (Season with vinegar, sugar and salt)', difficulty: 'medium' },
    { name: 'What is the main ingredient in miso soup?', answer: 'Miso paste', difficulty: 'easy',imageLink:miso },
    { name: 'Which Southeast Asian herb has a strong citrus flavor and is commonly used in Thai and Vietnamese dishes?', answer: 'Lemongrass', difficulty: 'medium' },
    { name: 'What is the main ingredient in pho broth?', answer: 'Beef or chicken bones', difficulty: 'hard' },
    { name: 'In Vietnamese cuisine, what is the noodle soup with herbs, beef or chicken, and rice noodles called?', answer: 'Pho', difficulty: 'easy' }, 
    { name: 'What is the main ingredient in kimchi?', answer: 'Fermented vegetables (usually napa cabbage and radishes)', difficulty: 'medium' },
    { name: 'What is the Japanese dish made of thinly sliced raw fish called?', answer: 'Sashimi', difficulty: 'hard' },
    { name: 'What do the "numbing" and "spicy" in the Chinese dish "Mapo Tofu" mean?', answer: 'Sichuan peppercorns and chili peppers', difficulty: 'medium' },
    { name: 'What is the name of the spice mix commonly used in Indian cuisine?', answer: 'Garam masala', difficulty: 'easy' }
  ];
  return (
    <>
      <div className='title'>
        <h1> Asian cuisine knowledge </h1>
        <h2> Let find out what u know about Asian cuisine </h2>
        <h3>Number Of Card: {count}/10</h3>
      </div>
      <div className='card-container' onClick={updateClick}>
        <div className={`card-inner ${isClicked ? 'clicked' :''}`}>
          <Card Category='Question' className='card-front' content={flashCard[count-1].name} difficulty= {flashCard[count-1].difficulty} imageLink={flashCard[count-1].imageLink} />
          <Card Category = 'Answer' className='card-back' content={flashCard[count-1].answer} difficulty ={flashCard[count-1].difficulty} />
        </div>
      </div>
      <div className='action-buttons'>
        <button onClick={goBack}> ← Back </button>
        <button onClick={goNext}> Next →</button>
      </div>
    </>
  )
}

export default App
