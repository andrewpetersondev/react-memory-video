import "./App.css"
import { useState, useEffect } from "react"
import { cardImages } from "./components/Images"
import Header from "./components/Header"
import Grid from "./components/Grid"

const App = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [winner, setWinner] = useState(null)
  const [exceeds, setExceeds] = useState(null)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }))

    setCards(shuffledCards)
    setTurns(0)
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
    setExceeds(false)
    setWinner(false)

    console.log("shuffledCards", shuffledCards)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  // this function is a prop that is passed to the Card component
  // if choiceOne is null, then set choiceOne to the card that was clicked
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // check if the two clicked cards match
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        backToDefault()
      } else {
        setTimeout(() => backToDefault(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  const backToDefault = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
    setTurns((prevTurns) => prevTurns + 1)
  }

  useEffect(() => {
    setTimeout(() => {
      const isTrue = cards.every((card) => card.matched === true)
      if (turns === 15) {
        if (isTrue) {
          setWinner(true)
        } else {
          setExceeds(true)
          // Disabled user from clicking on cards
          setDisabled(true)
        }
      } else if (isTrue && cards.length > 0) {
        setWinner(true)
      }
    }, 500)
  }, [turns, cards, winner])

  return (
    <>
      <div className='App'>
        <Header
          onShuffle={shuffleCards}
          turns={turns}
        />
        {winner ? <div className='result'>You won!</div> : null}
        {exceeds ? (
          <div className='result'>You lost! You are out of turns!</div>
        ) : null}
        <Grid
          cards={cards}
          choiceOne={choiceOne}
          choiceTwo={choiceTwo}
          handleChoice={handleChoice}
          disabled={disabled}
        />
      </div>
    </>
  )
}

export default App
