A live in-browser piano roll with synthesisers to get musical ideas down quickly

Development Notes:


Todo:

Oscillator.vue
- on oscillator - if user clicks osc name + id, allow to give the osc a name
- allow user to select active oscillator

Piano config
- Fix user-selected root note breaking the octave system
Potential fix: 
A A# B C C# D D# E F F# G G#
       ^ start of left side
^ start of right side

then concat the 2 sides

Piano keys / user input
- Fix the keypress handler so it feels more natural

In piano roll:
- 'onion skin' effect for scales - in notes
- the scale + key will be controlled from the Controls component

- Ability to select root note which the piano roll starts on


Drum machine tab - switch using v-if



- design something