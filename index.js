const canvas = document.getElementById('universe')
const ctx = canvas.getContext('2d')

const alive = true
const dead = false
const cellSize = 4 // cell size in pixel
const mapSize = {
    height: Math.floor(window.innerHeight / cellSize),
    width: Math.floor(window.innerWidth / cellSize),
}
canvas.width = mapSize.width * cellSize
canvas.height = mapSize.height * cellSize

/**
 * 2 dimentional array of cells
 * Cell is an boolean, which means alive(true), or dead(false)
 */
let cells = Array.from(
    { length: mapSize.width },
    () => ( // map over x axis
        Array.from(
            { length: mapSize.height },
            () => dead // map over y axis
        )
    ),
)

function drawCell(x, y, isAlive)
{
    if (isAlive === undefined) isAlive = cells[x][y]
    ctx.fillStyle = isAlive ? 'black' : 'white'
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
}

function getOffset(x, y) {
    if (x > mapSize.width - 1) x = 0
    if (x < 0) x = mapSize.width - 1
    if (y > mapSize.height - 1) y = 0
    if (y < 0) y = mapSize.height - 1

    return [x, y]
}
function getAliveNeighCount(x, y)
{
    let aliveNeighCount = 0
    let xi, yi

    /**
     * we should check is cells on {xi yi, where i - range from -1 to +1} alive
        x-1 y+1
        x-1 y
        x-1 y-1

        x y+1
        x y-1

        x+1 y+1
        x+1 y
        x+1 y-1
     */
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue // do not check original x y
            [xi, yi] = getOffset(x + i, y + j)
            
            if (cells[xi][yi]) aliveNeighCount++
            if (aliveNeighCount > 3) return aliveNeighCount // to count over 4 isn't necessary
        }
    }
    return aliveNeighCount
}
function getNextCellCondition(x, y, isAlive)
{
    let aliveNeighCount = getAliveNeighCount(x, y)
    if (isAlive) {
        if (aliveNeighCount === 2 || aliveNeighCount === 3) return alive
        else return dead
    } else {
        if (aliveNeighCount === 3) return alive
        else return dead
    }
}
function generationStep()
{
    return cells.forEach(
        (row, x) => (
            row.forEach((isAlive, y) => {
                const nextState = getNextCellCondition(x, y, isAlive)
                if (isAlive !== nextState) {
                    drawCell(x, y, nextState)
                    cells[x][y] = nextState
                }
            })
        )
    )
}

function firstGeneration()
{
    cells[9][11] = alive
    drawCell(9, 11)
    cells[9][10] = alive
    drawCell(9, 10)
    cells[10][12] = alive
    drawCell(10, 12)
    cells[11][10] = alive
    drawCell(11, 10)
    cells[11][12] = alive
    drawCell(11, 12)
    cells[12][11] = alive
    drawCell(12, 11)
    cells[13][10] = alive
    drawCell(13, 10)
    cells[10][13] = alive
    drawCell(10, 13)
    cells[10][14] = alive
    drawCell(10, 14)
    cells[12][12] = alive
    drawCell(12, 12)
    cells[15][15] = alive
    drawCell(15, 15)
    cells[16][16] = alive
    drawCell(16, 16)
    cells[15][16] = alive
    drawCell(15, 16)
}

firstGeneration()
setInterval(generationStep, 200)
