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
                  hidden={block.hidden}
                  mine={block.mine}
                  risk={block.risk}
                  onClick={() => props.onClick(coordinate)}
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