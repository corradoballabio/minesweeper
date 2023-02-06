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

    let mines = arr.reduce((acc, cell, i) => {
      if(cell.mine) acc.push(i)
      return acc
    }, [])

    mines.forEach((mine) => {
      let left = mine%this.rows > 0
      let right = mine%this.rows !== this.rows-1

      if(left && mine-1 >= 0) arr[mine-1].risk++
      if(right && mine+1 <= (this.rows * this.columns)) arr[mine+1].risk++

      // above
      if(mine-this.rows >= 0) arr[mine-this.rows].risk++
      if(left && mine-this.rows-1 >= 0) arr[mine-this.rows-1].risk++
      if(right && mine-this.rows+1 >= 0) arr[mine-this.rows+1].risk++

      // below
      if(mine+this.rows < (this.rows * this.columns)) arr[mine+this.rows].risk++
      if(left && mine+this.rows-1 < (this.rows * this.columns)) arr[mine+this.rows-1].risk++
      if(right && mine+this.rows+1 < (this.rows * this.columns)) arr[mine+this.rows+1].risk++
    })

    return arr.reduce((matrix, k, i) => {
      i % this.rows === 0 ? matrix.push([k]) : matrix[matrix.length-1].push(k)
      return matrix;
    }, []);
  }

  handleClick(coordinate) {
    let [x, y] = coordinate
    const blocks = this.state.blocks.slice()
    blocks[x][y].hidden = false

    this.setState({
      blocks: blocks
    })
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