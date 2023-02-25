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

  return(
    <div className='header'>
      <h2>minesweeper</h2>
      <ul>
        <li className='timer'>{formattedTimer}</li>
        <li><button onClick={handleNewGameClick}>start</button></li>
        <li><button onClick={props.onFlagClick}>flag</button></li>
      </ul>
    </div>
  )
}

export default ControlBoard