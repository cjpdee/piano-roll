import store from "../session/store";
import Vue from 'Vue';



console.log(Vue);


Vue.component('Oscillator',{
	props: {
		isPlaying : false,
	},
	data() {
		return {
			volume : 80,
			waveform : "sine",
			lowpass : false,
			lpA : 0,
			lpD : 0,
			resonance : 0
		};
	},
	template: `
		<div class="oscillator">
			<h2>Osc 1</h2>
			<select class="oscillator__select">
				<option value="sine/sqr">sine</option>
				<option value="sine/saw">square</option>
				<option value="sine/saw">saw</option>
			</select>
			<select name="octave" id="octave">
				<option value="A3">A3</option>
				<option value="A4">A4</option>
			</select>
			<span class="oscillator__property-wrap">
				<label class="oscillator__property-label" for="volume">Vol</label>
				<input class="oscillator__property" type="range" id="volume" />
			</span>
			<span class="oscillator__property-wrap">
				<label class="oscillator__property-label" for="lowpass">LP</label>
				<input class="oscillator__property" type="range" id="lowpass" />
			</span>
			<ul>
				<li class="oscillator__property-wrap">
					<label class="oscillator__property-label" for="lowpass-attack">Att</label>
					<input class="oscillator__property" type="range" id="lowpass-attack" />
				</li>
				<li class="oscillator__property-wrap">
					<label class="oscillator__property-label" for="lowpass-decay">Dec</label>
					<input class="oscillator__property" type="range" id="lowpass-decay" />
				</li>
			</ul>
			<span class="oscillator__property-wrap">
				<label class="oscillator__property-label" for="resonance">Res</label>
				<input class="oscillator__property" type="range" id="resonance" />
			</span>
		</div>
	`,
	created() {
		// initialise the oscillator
	},
	methods: {

	}
})

// class Oscillator extends React.Component {
//     constructor() {
//         this.id = store.getOscillatorCount();
//         this.wavetable = wavetable

//         store.incrementOscCount();
//     }

//     delete() {
//         // delete the object & dom element
//         // then:
//         store.decrementOscCount()
//     }

//     render() {
//         return (
//             <div>
//                 <h2>Oscillator {this.id}</h2>
//                 <select>
//                     <option value="sine/sqr"></option>
//                     <option value="sine/saw"></option>
//                 </select>
//                 <input type="range" id="wt pos" />
//                 <input type="range" id="volume" />
//                 <input type="range" id="lowpass" />
//                 <input type="range" id="resonance" />
//             </div>
//         );
//     }

//     getPitch(note) {
//         var notes = [
//             A4,B4,C4
//         ];
//         notes.forEach(function() {
//             // dividing / multiply highest frequency by
//             // each notes index in the array
//         });
//     }
// }

export default Oscillator;
