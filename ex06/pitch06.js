var osc;
var oscType = 'sine';
var volume;
var frequency = 600;

volume = tsw.gain(0.5);

function turn_on() {
     osc = tsw.oscillator (frequency, oscType);
     tsw.connect(osc, volume, tsw.speakers);
     osc.start(tsw.now() + 1.0);
};

function turn_off() {
     osc.stop(tsw.now() + 1.0);
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

function playScale() {
     var testScale;
	 var startTime = tsw.now();
	 var octave, octave_plus;

     // Generate base scale
     testScale = tsw.scale('E', 'major');
	 
     // Set base octave	and next octave, then convert to strings
     octave = 3;
	 octave_plus = octave + 1;
     octave_string = octave.toString();	 
     octave_text_plus = octave_plus.toString();	 

	 // Check for C in scale sequence and append next octave when that happens
	 for (i = 0; i < testScale.length; i++) {
         if ((testScale[i] === "C")||(testScale[i] === "C#")){
		     octave_string = octave_text_plus;
	     }
		 testScale[i] = testScale[i] + octave_string;
     }		 
	 
     // Play each note in the scale for one second
	 for (i = 0; i < testScale.length; i++) {
         playScaleNote(tsw.frequency(testScale[i]), startTime + i, startTime + i + 1);
     }		 
	 
};

function playScaleNote(frequency, startTime, stopTime) {
     var osc;
     var oscType = 'sine';
     osc = tsw.oscillator (frequency, oscType);
     tsw.connect(osc, volume, tsw.speakers);
     osc.start(startTime);
     osc.stop(stopTime);
};
