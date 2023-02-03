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
    let arr = Array(this.rows * this.columns).fill().map(_ => {
      return {mine: Math.random() < this.difficulty}
    })

    return arr.reduce((matrix, k, i) => {
      i % this.rows === 0 ? matrix.push([k]) : matrix[matrix.length-1].push(k)
      return matrix;
    }, []);
  }

  render() {
    return (
      <div className='app'>
        <Grid
          blocks={this.state.blocks}
        />
      </div>
    );
  }
}

export default App;