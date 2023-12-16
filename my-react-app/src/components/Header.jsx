const Header = ({ onShuffle, turns }) => {
  return (
    <header>
      <h1 className='header-text'>Test Your Memory</h1>
      <button onClick={onShuffle}>New Game</button>
      <div>
        <p className='turns'>Turns: {turns}/15</p>
      </div>
    </header>
  )
}
export default Header
