import React, { useState, useEffect } from 'react';

function ControlBoard(props) {
  let [timer, setTimer] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      props.timerActive && setTimer(timer => timer + 1)
    }, 1000);
    return () => clearInterval(interval);
  }, [props.timerActive]);

  const handleNewGameClick = () => {
    setTimer(0)
    props.onNewGameClick()
  }

  const formattedTimer = ('0000' + timer).substring(timer.toString().length)

  const newGameIcon = props.isGameLost ? 'sad' : 'smiley'
  const flaggedIcon = props.isSafe ? 'flaggedClicked' : 'flagged'

  return(
    <div className='header'>
      <div><h2>minesweeper</h2></div>
      <div className='timer'>{formattedTimer}</div>
      <div><button className={`boardIcon ${newGameIcon}`} onClick={handleNewGameClick}></button></div>
      <div><button className={`boardIcon ${flaggedIcon}`} onClick={props.onFlagClick}></button></div>
    </div>
  )
}

export default ControlBoard