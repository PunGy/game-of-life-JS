const playButton = document.getElementById('play')
const speedControll = document.getElementById('speed')
const cellSizeControll = document.getElementById('cell-size')
const withGridControll = document.getElementById('with-grid')
const clearModeControll = document.getElementById('clear-mode')

let speed = parseInt(speedControll.value, 10)
let intervalId

function isPlay()
{
    return playButton.innerText === 'Stop'
}

function startGeneration()
{
    intervalId = setInterval(generationStep, speed)
    playButton.innerText = 'Stop'
}
function stopGeneration()
{
    clearInterval(intervalId)
    playButton.innerText = 'Start'
}

playButton.addEventListener('click', () =>
{  
    if (isPlay()) stopGeneration()
    else startGeneration()
})

speedControll.addEventListener('change', () =>
{
    let nextSpeed = parseInt(speedControll.value, 10)
    if (nextSpeed < 0)
    {
        nextSpeed = 0
        speedControll.value = nextSpeed
    }

    speed = nextSpeed
    if (isPlay())
    {
        stopGeneration()
        startGeneration()
    }
})

cellSizeControll.addEventListener('change', () => {
    cellSize = parseInt(cellSizeControll.value, 10)
    if (isPlay()) stopGeneration()
    restore()
})

withGridControll.addEventListener('change', () => {
    withGrid = withGridControll.checked
    if (withGrid) drawGrid()
    else clearGrid()
})

let isDrawing = false
let prevXY = {}
function clickCell(xp, yp)
{
    const x = Math.floor(xp / cellSize),
    y = Math.floor(yp / cellSize)

    if (prevXY.x === x && prevXY.y === y) return
    
    const nextState = !cells[x][y]
    cells[x][y] = nextState
    prevXY.x = x
    prevXY.y = y

    drawCell(x, y, nextState)
}
canvas.addEventListener('mousedown', ({ x, y }) => {
    isDrawing = true
    clickCell(x, y)
})

canvas.addEventListener('mousemove', ({ x, y }) => {
    if (isDrawing)
    {
        clickCell(x, y)
    }
})

canvas.addEventListener('mouseup', () => {
    isDrawing = false
})
