import React from 'react'
import Grid from './Grid'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.rows = 9
    this.columns = 9
    this.state = {
      blocks: inizializeBlocks(this.rows, this.columns)
    }
  }

  render() {
    return (
      <Grid
        blocks={this.state.blocks}
      />
    );
  }
}

function inizializeBlocks(rows, columns) {
  return Array(rows*columns).fill(null).reduce((matrix, k, i) => {
    i % rows === 0 ? matrix.push([k]) : matrix[matrix.length-1].push(k)
    return matrix;
  }, []);
}

export default App;