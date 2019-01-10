import store from './store';


var audioContext;
var audioCtx;
function init() {
    audioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext;
}

init();