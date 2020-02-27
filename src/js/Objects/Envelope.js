import { getBarsTime } from "../util/time";
import store from "../store/store";

export default class Envelope {
    constructor() {
        this.amount = 100;
        this.attack = 0;
        // this.attackCurve = 0;
        this.hold = 0;
        this.decay = 50;
        // this.decayCurve = 0;
        this.release = 0;
    }

    getTime(property) {
        console.log(getBarsTime(property / 3))
        return getBarsTime(property / 3)
    }

    getEnvPercentages() {
        var total = this.attack + this.hold + this.decay;

        function getThing(thing) {
            return thing;
        }

        var values = {
            attack: 100 - this.attack / 3 + (((100 - this.decay) / 3) % (100 / 3)),
            hold: (total - this.attack - this.decay),
            decay: (total - this.attack - this.hold)
        }
        // console.log(values);
        // return values;
        return this.getTime(this.attack);
    }



    createEnvelope(filter, now, frequency) {
        function getEnvelopeTime(attack, hold, release) {

        }

        var fil = filter.filterNode;

        // now = context.currentTime;
        fil.frequency.setValueAtTime(0, now);
        fil.frequency.cancelScheduledValues(now);
        fil.frequency.linearRampToValueAtTime((this.cutoff || 1) * 1000, now + this.getTime(this.attack / 100));
        fil.frequency.linearRampToValueAtTime(0.01, now + this.getTime(this.attack / 100) + this.getTime(this.decay / 100));
    };


}