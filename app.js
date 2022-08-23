const time = document.querySelector('#time')
const startButton = document.querySelector('#start')
const pauseButton = document.querySelector('#pause')
const resetButton = document.querySelector('#reset')
const pauseValue = document.querySelector('#value')
let hours = 0
let minutes = 0
let seconds = 0
let milliseconds = 0
let intervalId
let pause = true
let startTime = 0
let elapseTime = 0

startButton.addEventListener('click', () => {
	if (pause) {
		pause = false
		startTime = Date.now() - elapseTime
		intervalId = setInterval(countTime, 50)
	}
})

pauseButton.addEventListener('click', () => {
	if (!pause) {
		pause = true
		clearInterval(intervalId)
		pauseValue.textContent = time.textContent + ' ' + pauseValue.textContent
	}
})

resetButton.addEventListener('click', () => {
	hours = 0
	minutes = 0
	seconds = 0
	milliseconds = 0
	startTime = 0
	elapseTime = 0
	pause = true
	clearInterval(intervalId)
	time.textContent = '00:00:00:00'
	pauseValue.textContent = ''
})

function countTime() {
	elapseTime = Date.now() - startTime

	milliseconds = Math.floor((elapseTime / 10) % 100)
	seconds = Math.floor((elapseTime / 1000) % 60)
	minutes = Math.floor((elapseTime / (1000 * 60)) % 60)
	hours = Math.floor((elapseTime / (1000 * 60 * 60)) % 60)

	milliseconds = timeFormat(milliseconds)
	seconds = timeFormat(seconds)
	minutes = timeFormat(minutes)
	hours = timeFormat(hours)

	time.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`

	function timeFormat(value) {
		return ('0' + value).length > 2 ? value : '0' + value
	}
}
