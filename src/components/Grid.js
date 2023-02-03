function Grid(props) {

  return (
    <div>
      {props.blocks.map((row, i) => {
        return (
          <div className="grid-row">
            {row.map((block, j) => {
              return (
                <button className={'block'}>
                  {/*  */}
                </button>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Grid