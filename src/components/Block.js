function Block(props) {
  return (
    <button
      key={1}
      className={`block ${props.mine && 'mined'}`}
      >
      {props.mine ? '' : props.risk}
    </button>
  )
}

export default Block