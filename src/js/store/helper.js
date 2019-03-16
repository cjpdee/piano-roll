import {store} from './store';
export function getKeysArray() {
    /*
        This function takes the note that the user
        wants at the bottom of the piano roll and
        creates a new notes array starting with the
        chosen root note, and then sets this
        as the new piano roll order for the whole app
    */

    let chosenRootOctave = store.state.project.baseOctave;
    let numOctaves = store.state.project.numOctaves;
    let rootNote   = store.state.project.rootNote;
    let notes = store.state.data.notes;


    /*
    this property needs to be sorted out
    the aim is to increase the octave number
    in line with the actual note
    at the moment it's not increasing the octave at the right point
    so it might play C#3, A4 then suddenly A#5
    works with A as the rootnote for now though
    */

    let offset = notes.indexOf(rootNote);

    let orderedNotes = [];
    for(let j=0; j < notes.length; j++) {
        let pointer = (j + offset) % notes.length;
        orderedNotes.push(notes[pointer]);
    }


    let notesInRoll = []; // rename this is terrible




    for (let i = chosenRootOctave; i < chosenRootOctave + numOctaves; i++) {
        orderedNotes.forEach(note => {
            notesInRoll.push(note + i);
        })
    }

    console.log(notesInRoll);
    return notesInRoll.reverse()
}