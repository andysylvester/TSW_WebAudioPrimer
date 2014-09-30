var osc;
var volume;

volume = tsw.gain(0.5);

function turn_on() {
     osc = tsw.oscillator (600, 'sawtooth');
     tsw.connect(osc, volume, tsw.speakers);
     osc.start();
};

function turn_off() {
     osc.stop();
};

