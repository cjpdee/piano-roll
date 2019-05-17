const projectMutations = {
	mutations: {

		/*
			General / Misc
		*/

		createAudioContext(state) {
			let audioCtx;
			audioCtx = window.AudioContext || window.webkitAudioContext;
			state.audioContext = new audioCtx;

			// Create the master volume control
			state.masterGain = state.audioContext.createGain();
			state.masterGain.gain.value = 0.6;
		},

		setMouseActiveState(state, payload) {
			this.state.mouseActive = payload;
		},

		/*
			Project Mutations - needs organising
		*/

		setName(name) {
			this.state.project.name = name;
		},
		setBPM(state, payload) {
			this.state.project.bpm = payload.bpm;
		},
		setNumBars(state, payload) {
			this.state.project.numBars = payload.numBars;
		},
		// Piano roll setup
		setBaseOctave(state, payload) {
			this.state.project.baseOctave = payload.baseOctave;
		},
		setTimeSignature(state, payload) {
			this.state.project.timeSignature = payload.timeSignature
		},
		setNoteSize(state, payload) {
			this.state.project.noteSize = payload.noteSize
		},
		setNumOctaves(state, payload) {
			this.state.project.numOctaves = payload.numOctaves;
		},
		setRootNote(state, payload) {
			this.state.project.rootNote = payload.rootNote;
		},

		setNoteLengthInBeats(state, payload) {
			this.state.project.noteLength = payload.length;
		},

		setMasterGain(state, payload) {
			if (this.state.masterGain) {
				this.state.masterGain.gain.value = payload.masterGain;
			}
		}
	}
}

export default projectMutations;
