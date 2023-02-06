function Block(props) {
  return (
    <button
      key={1}
    >
      {props.mine ? 'X' : props.risk}
      className={`block ${props.hidden && 'hidden'}`}
    </button>
  )
}

export default Block