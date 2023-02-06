import Block from './Block'

function Grid(props) {

  return (
    <div>
      {props.blocks.map((row, i) => {
        return (
          <div key={i} className="grid-row">
            {row.map((block, j) => {
              return (
                <Block
                  key={j}
                  hidden={block.hidden}
                  mine={block.mine}
                  risk={block.risk}
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