function Block(props) {
  return (
    <button
      key={1}
      className={'block'}
    >
      {props.mine ? 'X' : props.risk}
    </button>
  )
}

export default Block