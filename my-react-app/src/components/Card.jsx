import Educative from "../images/EducativeIcon.png"

const Card = ({ card, flipped, disabled, handleChoice }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <>
      <div className='card'>
        {/* if flipped is true, then the class flipped will be added */}
        <div className={flipped ? "flipped" : ""}>
          <img
            src={card.src}
            alt='card front'
            className='front'
          />
          <img
            src={Educative}
            alt='card back'
            className='back'
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  )
}
export default Card
