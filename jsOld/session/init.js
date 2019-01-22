import store from './store';
import Oscillator from '../objects/Oscillator';


var audioContext;
var audioCtx;
function initAudioContext() {
    audioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext;
}


function initEventListeners() {

    document.addEventListener('click',function() {
        if (!audioContext) {
            initAudioContext();
        }
    })

    const $newOscillatorBtn = document.querySelector("[data-js-project=new-oscillator]");

    $newOscillatorBtn.addEventListener('click',function() {
        let newOsc = new Oscillator;
        console.log(newOsc);

        store.addOscillator(newOsc)
    })
}


initEventListeners();