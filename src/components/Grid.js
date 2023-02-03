function Grid(props) {

  return (
    <div>
      {props.blocks.map((row, i) => {
        return (
          <div className="grid-row">
            {row.map((block, j) => {
              return (
                <button className={'block'}>
                  {block.mine ? 'Y' : ''}
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