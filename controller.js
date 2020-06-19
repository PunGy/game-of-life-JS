const playButton = document.getElementById('play')
const speedControll = document.getElementById('speed')
const cellSizeControll = document.getElementById('cell-size')
const withGridControll = document.getElementById('with-grid')

let speed = parseInt(speedControll.value, 10)
let intervalId

function isPlay()
{
    return playButton.innerText === 'Stop'
}

function startGeneration()
{
    if (currentGenerationStep === 0) firstGeneration()
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
