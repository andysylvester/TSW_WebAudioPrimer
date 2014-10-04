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
