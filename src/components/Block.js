function Block(props) {
  const displayIcon = /* (props.hidden && 'hidden') || */
    (props.mine && 'mined') ||
    (props.risk && 'risk_'+props.risk)
  return (
    <button
      key={1}
      className={`block ${displayIcon}`}
    />
  )
}

export default Block