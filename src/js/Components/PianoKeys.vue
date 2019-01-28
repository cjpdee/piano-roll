<template>
	<div class="piano">
		<button class="piano__key" data-key="B5"></button>
		<button class="piano__key" data-key="A#5"></button>
		<button class="piano__key" data-key="A5"></button>
		<button class="piano__key" data-key="G#5"></button>
		<button class="piano__key" data-key="G5"></button>
		<button class="piano__key" data-key="F#5"></button>
		<button class="piano__key" data-key="F5"></button>
		<button class="piano__key" data-key="E5"></button>
		<button class="piano__key" data-key="D#5"></button>
		<button class="piano__key" data-key="D5"></button>
		<button class="piano__key" data-key="C#5"></button>
		<button class="piano__key" data-key="C5"></button>
		<!-- octave 4 -->
		<button class="piano__key" data-key="B4"></button>
		<button class="piano__key" data-key="A#4"></button>
		<button class="piano__key" data-key="A4"></button>
		<button class="piano__key" data-key="G#4"></button>
		<button class="piano__key" data-key="G4"></button>
		<button class="piano__key" data-key="F#4"></button>
		<button class="piano__key" data-key="F4"></button>
		<button class="piano__key" data-key="E4"></button>
		<button class="piano__key" data-key="D#4"></button>
		<button class="piano__key" data-key="D4"></button>
		<button class="piano__key" data-key="C#4"></button>
		<button class="piano__key" data-key="C4"></button>
	</div>
</template>

<script>

export default {}

/*

- set starting octave i guess?
so A4 goes to C5 for 24 notes



Octave Select gives starting octave:

for (i = startingOctave; i > startingOctave + 1; i++) {
	data.notes.forEach(note => {
		notesInRoll.push(note + i);
	})
}

then for each notes in roll on the piano keys
use the same array for the 

*/

</script>