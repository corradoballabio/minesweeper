import Block from './Block'

function Grid(props) {

  return (
    <div>
      {props.blocks.map((row, i) => {
        return (
          <div key={i} className="grid-row">
            {row.map((block, j) => {
              let coordinate = [i, j]

              return (
                <Block
                  key={coordinate}
                  isFlagged={block.isFlagged}
                  isHidden={block.isHidden}
                  hasMine={block.hasMine}
                  risk={block.risk}
                  onClick={(e) => props.onClick(coordinate, e)}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Grid