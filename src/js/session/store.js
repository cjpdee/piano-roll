import './init';

var store = {
    data : {
        audioContext : window.AudioContext || window.webkitAudioContext,
        audioCtx : new AudioContext
    },
    getAudioContext : function() {
        return store.data.audioCtx;
    },
    values : {
        bpm : 90,
        noteLength : '1/4',
        pitches : {
            // figure out an algorithm to divide the pitches,
            // don't hard code this
            // also should be a function and not an obj
        }
    },
    getPitch(note) {
        // 
    }
}
