# react-memory-video

## Steps to build this project

### Boilerplate

- create github repo
- clone repo
- use vite to install react
- npm i, npm run dev to get up and running

### Empty out Starter Code from Vite

### Draw Basic Application using Pencil or Figma

### Break Application Down into Components

- Header
- Grid
- Card

### Import the Images

### Create Header Component

```jsx
const Header = ({ turns, onShuffle }) => {
  return (
    <>
      <h1 className='header'>Test Your Memory 🧠</h1>
      <button onClick={onShuffle}>New Game</button>
      <div>
        <p className='turns'>Turns: {turns}/15</p>
      </div>
    </>
  )
}

export default Header
```

### Create the Shuffle Function

- In the memory game, the cards of your grid need to be shuffled and placed randomly so that the grid cards are different every time you play the game.

- Import the cardImages array from the /usercode/memory-game/src/Components/Images.js file.

- Import the useState hook that will store the state of your shuffled cards and the number of turns the user takes to guess the matching images.

- Create a shuffleCards function that creates two identical images using the existing cardImages array. This function then shuffles the images in random order and updates the state of the shuffled cards and the turns.

- Import and use the useEffect hook to call the shuffleCards function on the first render to shuffle the grid when you open the game.

```jsx
const App = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  //  Shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  // Call the shuffle card function at first render
  useEffect(() => {
    shuffleCards()
  }, [])

  return <div className='App'>Hello World</div>
}
```

### Import Header

### Add Styles to the Header

```css
:root {
  --brand-color: #0ea5e9;
  --dark-color: #0f172a;
  --mid-color: #cbd5e1;
  --light-color: #ffffff;
}

body {
  font-family: sans-serif;
  margin: 0;
  font-size: 1.5em;
  text-align: center;
  background: var(--dark-color);
  color: #fff;
}

/* Header */

.header {
  color: var(--brand-color);
}

/* App */
.App {
  max-width: 860px;
  margin: 40px auto;
}

/* Button */
button {
  background: none;
  border: 2px solid #fff;
  padding: 6px 12px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  font-size: 1em;
}
button:hover {
  color: #0f172a;
  background-color: var(--brand-color);
}

/* Turns */
.turns {
  color: orange;
  font-weight: bolder;
  font-size: 2rem;
}
```

### Develop the Grid Cell

The memory game is made up of a grid of cells. Each cell in the grid is a square card where, initially, the Educative icon is displayed. When you click on any square card present in the grid, the card flips and displays an image of a flower.

- Create a Card component in the /usercode/memory-game/src/Components/Card.js file that contains the following props:

  - card: Contains the details of a grid card having the image path (src) and a boolean variable (matched) to keep track of the card that has been clicked as elements.
  - flipped: A boolean variable that flips the card by changing the class name depending on whether it is true.
  - disabled: Another boolean variable that stops a user from clicking on a card if it becomes true
  - handleChoice: A function that adds the card into either of the two slot turns.

- Use the props defined above and create the grid cell that displays the /usercode/memory-game/Components/Images/EducativeIcon.png icon as the default card image, and flips the card after being clicked. This will then show a flower image that can be accessed from the src property of the card prop.

### Develop the Grid Application

A single cell of the grid has been created. It is time to implement the grid of your application which will be a 4x3 (4 rows and 3 columns) grid of cards.

Perform the following tasks to achieve this goal:

- Create the Grid component in the /usercode/memory-grid/src/Components/Grid.js file that contains the following props:

  - A cards array that contains all the shuffled cards.

  - Two variables, named choiceOne and choiceTwo respectively, that contain the two card slots that are currently clicked.

  - A disabled boolean variable, with the handleChoice function, which was mentioned as the props of the Card component in the previous task.

- Iterate over the cards array and pass the relevant props to the Card component.

```jsx
import Card from "./Card"

const Grid = ({ cards, choiceOne, choiceTwo, disabled, handleChoice }) => {
  return (
    <div className='card-grid'>
      {cards.map((card) => (
        <div
          className='card'
          key={card.id}
        >
          <Card
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  )
}

export default Grid
```

### Create the Choice Function

To complete this task successfully, do the following in the /usercode/memory-game/src/App.js file:

- Use the useState hook to define states for the choiceOne and choiceTwo variables. Since these will eventually contain cards, they will be provided with null as the initial value.

- Create a handleChoice() function that adds the cards into either of the two slots, as in choiceOne and choiceTwo, depending on which one is free or null.

```jsx
const [choiceOne, setChoiceOne] = useState(null)
const [choiceTwo, setChoiceTwo] = useState(null)

const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}
```

### Import the Grid Component

You have implemented the major part of testing your memory game cards. However, the disabled element is still missing. In addition, you also need to import the Grid component to test the changes made in the previous tasks.

Perform the following operations in the /usercode/memory-game/src/App.js file:

- Use the useState hook to define the last remaining disabled element. This will keep the cards from flipping back if the two cards selected are identical.

- Import the Grid component from the /usercode/memory-game/src/Components/Grid.js file with the correct props to test your memory game grid.

```jsx
import Grid from "./components/Grid"
;<Grid
  cards={cards}
  choiceOne={choiceOne}
  choiceTwo={choiceTwo}
  handleChoice={handleChoice}
  disabled={disabled}
/>
```

### Style the Grid Cards

```css
/* Card grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

/* images */
img {
  width: 100%;
  aspect-ratio: 1/1;
}

/*  image card */
.card {
  position: relative;
}

.card:hover {
  box-shadow: 0px 0px 9px 1px #324369;
}

.card img {
  display: block;
  border: 2px solid black;
  border-radius: 6px;
  cursor: pointer;
}

/* front of card  */
.card .front {
  transform: rotateY(90deg);
  position: absolute;
  transition: all ease-in 0.2s;
}

.flipped .front {
  transform: rotateY(0deg);
  transition-delay: 0.2s;
}

/* back of card-cover */

.card .back {
  transition: all ease-in 0.2s;
  transition-delay: 0.2s;
}

.flipped .back {
  transform: rotateY(90deg);
  transition-delay: 0s;
}

.result {
  margin-bottom: 30px;
}

@media only screen and (min-width: 500px) and (max-width: 1000px) {
  .card-grid {
    display: inline-grid;
    grid-template-columns: repeat(4, 16vw);
    grid-gap: 20px;
  }
}

@media only screen and (min-width: 1001px) and (max-width: 2500px) {
  .card-grid {
    display: inline-grid;
    grid-template-columns: repeat(4, 10vw);
    grid-gap: 20px;
  }
}
```

### Select the Correct Cards

The memory game looks great now. The grid has been created and the cards in the grid flip after being clicked.

However, you still need to implement the logic when the two clicked cards are identical. Moreover, the turns counter does not increment and is stuck at 0.

Keeping the above information in mind, perform the following operations in the /usercode/memory-game/src/App.js file:

- Create a function named backToDefault() that will reset all the state values and increment the turns counter by one after every two cards are clicked.

```jsx
const backToDefault = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setDisabled(false)
  setTurns((prevTurns) => prevTurns + 1)
}
```

- Create a useEffect hook that checks whether the clicked cards (choiceOne and choiceTwo) are identical. If they are, they will be left flipped, otherwise they’ll be flipped back.

```jsx
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
      setTimeout(() => backToDefault(), 500)
    }
  }
}, [choiceOne, choiceTwo])
```

- Call the backToDefault() function in the useEffect hook in both cases: when the clicked cards are the same and when the clicked cards are not the same. In the latter condition, call the function after a small delay.

### Add the Winning condition

Everything in the application appears to be working fine. However, you still don’t know if you’ve won or not!

In this task, perform the following steps in the /usercode/memory-game/src/App.js file:

- Create two new states. One of these should be marked as true when you win, and the other when the turns counter becomes 15 and you haven’t won yet.

- Create a new useEffect hook that uses the cards array along with the matched property of a card element and sets the winner based on whether all cards in the grid have been clicked and flipped.

- Add a conditional statement in the above useEffect hook to check if the user has won or not.

- Reset the boolean states when you click the “New Game” button.

```jsx
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
```

```jsx
setExceeds(false)
setWinner(false)
```

```jsx
{
  winner ? <div className='result'>You won!</div> : null
}
{
  exceeds ? <div className='result'>You lost! You are out of turns!</div> : null
}
```
