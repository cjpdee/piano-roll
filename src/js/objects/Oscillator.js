import store from "../session/store";
import Vue from 'Vue';



console.log(Vue);

class Oscillator extends Vue {
    
    constructor() {
        let id = 0;
        console.log(this);
        this.id = id;
        // also set up the actual oscillator
    }
}

Vue.component('Oscillator',{
    props: {
        isPlaying : false,
    },
    data() {
        return {
            volume : 80,
            waveform : sine
        }
    },
    template: `
        <div>
            <h2>Oscillator {{ this.id }}</h2>
            <select>
                <option value="sine/sqr">sine</option>
                <option value="sine/saw">square</option>
                <option value="sine/saw">saw</option>
            </select>
            <input type="range" id="volume" />
            <input type="range" id="lowpass" />
            <input type="range" id="resonance" />
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
