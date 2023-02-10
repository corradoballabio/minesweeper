function ControlBoard(props) {
  return(
    <div className='header'>
      <h2>minesweeper</h2>
      <ul>
        <li><button onClick={props.onClick}>start</button></li>
        <li><button onClick={props.onFlagClick}>flag</button></li>
      </ul>
    </div>
  )
}

export default ControlBoard