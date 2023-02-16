function Block(props) {
  const displayIcon =
    (props.isFlagged && 'flagged') ||
    (props.isHidden && 'hidden') ||
    (props.hasMine && 'mined') ||
    (props.risk && 'risk_'+props.risk)

  return (
    <button
      key={1}
      className={`block ${displayIcon}`}
      onClick={props.onClick}
      onContextMenu={props.onClick}
    />
  )
}

export default Block