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
    if (nextSpeed < 100)
    {
        nextSpeed = 100
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
let drawMode = alive
canvas.addEventListener('mousedown', ({ x: xp, y: yp }) => {
    isDrawing = true
    const x = Math.floor(xp / cellSize),
              y = Math.floor(yp / cellSize)

    cells[x][y] = drawMode
    drawCell(x, y, drawMode)
})

canvas.addEventListener('mousemove', ({ x: xp, y: yp }) => {
    if (isDrawing)
    {
        const x = Math.floor(xp / cellSize),
              y = Math.floor(yp / cellSize)

        cells[x][y] = drawMode
        drawCell(x, y, drawMode)
    }
})

canvas.addEventListener('mouseup', () => {
    isDrawing = false
})


clearModeControll.addEventListener('click', () => {
    drawMode = !clearModeControll.checked
})