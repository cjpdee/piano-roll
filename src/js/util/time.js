import store from '../store/store';

/**
 * TIMING FUNCTIONS
 */

// These two aren't 
function getSecondsPerBeat() {
	let bpm = store.state.project.bpm;
	return 60 / bpm;
}

function getLoopTimeframe() {
	let numBars = store.state.project.numBars;

	let secondsPerBeat = getSecondsPerBeat();

	let oneBar = secondsPerBeat * 4; // 4 can be changed if we want to support 3/4 or other time signatures

	return oneBar * numBars;
}

export function secondsPerBeat() {
	getSecondsPerBeat();
}

// TODO: currently the exported function is unused
export function loopTimeframe() {
	getLoopTimeframe();
}

export function getBarsTime(numBars) {
	return numBars * getSecondsPerBeat() * 16 * numBars;
}

// get duration from a percentage of the loop
export function durationFromPercentage(lengthAsPercentage) {
	const loopTime = getLoopTimeframe();

	return (loopTime / 100) * lengthAsPercentage;
}

export function percentageFromPixels(pixels) {
	const rollWidth = document.querySelector("[data-js=piano-roll]").getBoundingClientRect().width;
	return (pixels / rollWidth) * 100;
}

export function pixelsFromPercentage(percentage) {
	const rollWidth = document.querySelector("[data-js=piano-roll]").getBoundingClientRect().width;
	return ((percentage / 100) * rollWidth)
}
