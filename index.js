const canvas = document.getElementById('universe')
const ctx = canvas.getContext('2d')
const generationCounter = document.getElementById('generation-step')

const alive = true
const dead = false
let cellSize = +document.getElementById('cell-size').value // cell size in pixel
let currentGenerationStep = 0
let withGrid = document.getElementById('with-grid').checked

const { innerHeight, innerWidth } = window
let mapSize = calculateMapSize()
canvas.width = mapSize.width * cellSize
canvas.height = mapSize.height * cellSize


let cells = buildCellsArray()
let tempCells = buildCellsArray()

/**
 * Map size in cells
 */
function calculateMapSize()
{
    return {
        height: Math.floor((innerHeight - (innerHeight / 100 * 7)) / cellSize),
        width: Math.floor(window.innerWidth / cellSize),
    }
}
function buildCellsArray()
{
    /**
     * 2 dimentional array of cells
     * Cell is an boolean, which means alive(true), or dead(false)
    */
    return Array.from(
        { length: mapSize.width },
        () => ( // map over x axis
            Array.from(
                { length: mapSize.height },
                () => dead // map over y axis
            )
        ),
    )
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
    currentGenerationStep++
    generationCounter.innerText = currentGenerationStep
    cells.forEach(
        (col, x) => (
            col.forEach((isAlive, y) => {
                const nextState = getNextCellCondition(x, y, isAlive)
                tempCells[x][y] = nextState
            })
        )
    )
    endupStep()
}
function endupStep()
{
    tempCells.forEach((col, x) =>
    {
        col.forEach((isAlive, y) => 
        {
            drawCell(x, y, isAlive)
            cells[x][y] = isAlive
        })
    })
}

function clearCanvas()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}
function restore()
{
    mapSize = calculateMapSize()
    cells = buildCellsArray()
    tempCells = buildCellsArray()
    clearCanvas()
    currentGenerationStep = 0
    if (withGrid) drawGrid()
}

function drawCell(x, y, isAlive)
{
    if (isAlive === undefined) isAlive = cells[x][y]

    if (isAlive)
    {
        ctx.fillStyle = 'black'
        ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1.2, cellSize - 1.2)
    }
    else
    {
        ctx.clearRect(x * cellSize, y * cellSize, cellSize - 1.2, cellSize - 1.2)
    }
}

function drawGrid()
{
    const { width, height } = canvas
    ctx.lineWidth = 1
    ctx.strokeStyle = '#aaa'
    for (let x = cellSize; x <= width; x += cellSize)
    {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
    }
    for (let y = cellSize; y <= height; y += cellSize)
    {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
    }
    // sharpen cells
    endupStep()
}
function clearGrid()
{
    clearCanvas()
    cells.forEach((col, x) => {
        col.forEach((isAlive, y) => {
            drawCell(x, y, isAlive)
        })
    })
}

if (withGrid) drawGrid()
