import React from 'react'
import Grid from './Grid'
import ControlBoard from './ControlBoard'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.rows = 9
    this.columns = 9
    this.totalMines = 10

    this.state = {
      blocks: this.inizializeBlocks(),
      isGameStarted: false,
      isSafeMode: false
    }
  }

  inizializeBlocks() {
    let arr = Array(this.rows * this.columns).fill().map((_, i) => {
      return {
        isHidden: true,
        isFlagged: false,
        risk: null,
        hasMine: false //Math.random() < this.difficulty
      }
    })

    return arr.reduce((grid, k, i) => {
      i % this.rows === 0 ? grid.push([k]) : grid[grid.length-1].push(k)
      return grid;
    }, []);
  }

  handleNewGameClick() {
    this.setState({
      blocks: this.inizializeBlocks(),
      isGameStarted: false,
      isSafeMode: false
    })
  }

  handleFlagClick() {
    this.setState({
      isSafeMode: !this.state.isSafeMode
    })
  }

  handleBlockClick(coordinate) {
    const [x, y] = coordinate
    const tmpBlocks = this.state.blocks.slice()
    let isGameStarted = this.state.isGameStarted

    if(!this.state.isGameStarted) {
      isGameStarted = !this.isGameStarted
      this.mineGrid(tmpBlocks, coordinate)
      this.setRisks(tmpBlocks)
    }

    if(!tmpBlocks[x][y].isHidden) return

    if(this.state.isSafeMode) {
      tmpBlocks[x][y].isFlagged = !tmpBlocks[x][y].isFlagged
    } else if(tmpBlocks[x][y].hasMine) {
      tmpBlocks[x][y].isHidden = false
    } else if (tmpBlocks[x][y].risk) {
      tmpBlocks[x][y].isHidden = false
    } else {
      tmpBlocks[x][y].isHidden = false
      this.displayNeighbors(coordinate, tmpBlocks)
    }

    this.setState({
      blocks: tmpBlocks,
      isGameStarted: isGameStarted
    })
  }

  mineGrid(grid, coordinate) {
    let mineCounter = 0
    let [x, y] = coordinate

    while(mineCounter < this.totalMines) {
      const i = Math.floor(Math.random() * this.rows)
      const j = Math.floor(Math.random() * this.columns)

      if(grid[i][j].hasMine || (i === x && j === y)) continue

      grid[i][j].hasMine = true
      mineCounter++
    }
  }

  setRisks(grid) {
    let mines = grid.reduce((acc, row, i) => {
      row.forEach((block, j) => {
        if(block.hasMine) acc.push([i, j])
      })
      return acc
    }, [])

    mines.forEach(coord => {
      let neighbors = this.getNeighbors(coord)
      neighbors.forEach(neighbor => {
        const[x, y] = neighbor
        grid[x][y].risk++
      })
    })
  }

  displayNeighbors(clickedBlock, tmpBlocks) {
    const blocksToCheck = this.getNeighbors(clickedBlock).filter(([x,y]) =>
      !tmpBlocks[x][y].isFlagged && tmpBlocks[x][y].isHidden
    )

    while(blocksToCheck.length) {
      const [x, y] = blocksToCheck.pop()

      tmpBlocks[x][y].isHidden = false
      if(!tmpBlocks[x][y].risk) {
        this.getNeighbors([x, y]).filter(([i, j]) =>
          !tmpBlocks[x][y].isFlagged && tmpBlocks[i][j].isHidden
        ).forEach(coord => blocksToCheck.push(coord))
      }
    }
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
          onClick={(coordinate) => this.handleBlockClick(coordinate)}
        />
        <ControlBoard
          onNewGameClick={() => this.handleNewGameClick()}
          onFlagClick={() => this.handleFlagClick()}
        />
      </div>
    );
  }
}

export default App;