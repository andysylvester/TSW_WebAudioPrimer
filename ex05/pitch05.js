var osc;
var oscType = 'sine';
var volume;
var frequency = 600;

volume = tsw.gain(0.5);

function turn_on() {
     osc = tsw.oscillator (frequency, oscType);
     tsw.connect(osc, volume, tsw.speakers);
     osc.start();
};

function turn_off() {
     osc.stop();
};

function changePitch(newValue)
{
    osc.frequency(newValue);
};

function getOscType(value)
{
     oscType = value;
	 osc.type(oscType)
}

var context = new AudioContext();

var settings = {
		id: 'keyboard',
		width: 600,
		height: 150,
		startNote: 'A2',
		whiteNotesColour: '#fff',
		blackNotesColour: '#000',
		borderColour: '#000',
		activeColour: 'yellow',
		octaves: 2
	};
	
var keyboard = new QwertyHancock(settings);

keyboard.keyDown = function (note, frequency) {
	turn_on();
	changePitch(frequency)
};

keyboard.keyUp = function (note, frequency) {
	turn_off();
};

var testChord;
var chordOscillators = [];

function playChord() {
     testChord = tsw.chord('A4', 'major');
     console.log(testChord);
	 for (i = 0; i < testChord.length; i++) {
         console.log(testChord[i], tsw.frequency(testChord[i]));
     }		 
	 for (i = 1; i < testChord.length; i++) {
         playNote(tsw.frequency(testChord[i]));
     }		 
};

function playNote(frequency) {
     var osc;
     var oscType = 'sine';
     osc = tsw.oscillator (frequency, oscType);
     tsw.connect(osc, volume, tsw.speakers);
     osc.start();
	 chordOscillators.push(osc);
};

function stopChord() {
	 for (i = 0; i < chordOscillators.length; i++) {
       chordOscillators[i].stop();
     }		 
};

