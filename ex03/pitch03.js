var osc;
var oscType = 'sine';
var volume;

volume = tsw.gain(0.5);

function turn_on() {
     osc = tsw.oscillator (600, oscType);
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
