import React from 'react'
import Grid from './Grid'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.rows = 9
    this.columns = 9
    this.difficulty = 0.14 // easy = 12; medium = 16; hard = 20
    this.state = {
      blocks: this.inizializeBlocks()
    }
  }

  inizializeBlocks() {
    let arr = Array(this.rows * this.columns).fill().map((_, i) => {
      return {
        hidden: true,
        risk: null,
        mine: Math.random() < this.difficulty
      }
    })

    let matrix = arr.reduce((matrix, k, i) => {
      i % this.rows === 0 ? matrix.push([k]) : matrix[matrix.length-1].push(k)
      return matrix;
    }, []);


    let mines = matrix.reduce((acc, row, i) => {
      row.forEach((block, j) => {
        if(block.mine) acc.push([i, j])
      })
      return acc
    }, [])

    mines.forEach(coord => {
      let neighbors = this.getNeighbors(coord)
      neighbors.forEach(neighbor => {
        const[x, y] = neighbor
        matrix[x][y].risk++
      })
    })
    return matrix
  }

  handleClick(coordinate) {
    let [x, y] = coordinate
    const blocks = this.state.blocks.slice()
    blocks[x][y].hidden = false

    this.setState({
      blocks: blocks
    })
  }

  getNeighbors(coordinate) {
    const [x, y] = coordinate
    const neighbors  = []

    const isLeftBorder = y === 0
    const isRightBorder = y === this.columns-1
    const isTopBorder = x === 0
    const isBottomBorder = x === this.rows-1

    // side l-r
    if(!isLeftBorder) neighbors.push([x, y-1])
    if(!isRightBorder) neighbors.push([x, y+1])
    // top c-l-r
    if(!isTopBorder) neighbors.push([x-1, y])
    if(!isTopBorder && !isLeftBorder) neighbors.push([x-1, y-1])
    if(!isTopBorder && !isRightBorder) neighbors.push([x-1, y+1])
    // bottom c-l-r
    if(!isBottomBorder) neighbors.push([x+1, y])
    if(!isBottomBorder && !isLeftBorder) neighbors.push([x+1, y-1])
    if(!isBottomBorder && !isRightBorder) neighbors.push([x+1, y+1])

    return neighbors
  }

  render() {
    return (
      <div className='app'>
        <Grid
          blocks={this.state.blocks}
          onClick={(coordinate) => this.handleClick(coordinate)}
        />
      </div>
    );
  }
}

export default App;