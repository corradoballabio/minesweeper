function Block(props) {
  const displayIcon =
    (props.isFlagged && 'flagged') ||
    (props.hidden && 'hidden') ||
    (props.mine && 'mined') ||
    (props.risk && 'risk_'+props.risk)

  return (
    <button
      key={1}
      className={`block ${displayIcon}`}
      onClick={props.onClick}
    />
  )
}

export default Block