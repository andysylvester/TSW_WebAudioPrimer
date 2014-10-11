var osc;
var osc_is_on = 0;
var volume;
var biquadFilter = tsw.context().createBiquadFilter();
var oscType = 'sine';
var oscFrequency = 440;
var filterType = 'lowpass';
var filterFrequency = 700;
var filterQ = 10;
var filter = tsw.filter({
    type: 'lowpass',
    frequency: 700,
    Q: 10
    });

volume = tsw.gain(0.5);

function turn_on() {
     if ((filterType === "lowpass") || (filterType === "highpass") || (filterType === "bandpass") || (filterType === "notch") || (filterType === "allpass")) {
	    turn_on_tsw();
     } else {
	    turn_on_web_audio();
     }
};

function turn_on_tsw() {
     // Use TSW filter function for filter
     osc = tsw.oscillator (oscFrequency, oscType);
     tsw.connect(osc, filter, volume, tsw.speakers);
     osc.start();
	 osc_is_on = 1;
};

function turn_on_web_audio() {
     // Use Web Audio API native function for filter
     osc = tsw.oscillator (oscFrequency, oscType);
     tsw.connect(osc, biquadFilter, volume, tsw.speakers);
     osc.start();
	 osc_is_on = 1;
};

function turn_off() {
     osc.stop();
	 osc_is_on = 0;
};

function changePitch(newValue)
{
    oscFrequency = newValue;
	if (osc_is_on == 1) {
       osc.frequency(newValue);
	}
};

function changeCutoffFreq(newValue)
{
    filter.frequency(newValue);
    biquadFilter.frequency.value = newValue;
};

function changeGain(newValue)
{
     biquadFilter.gain.value = newValue;
};

function changeQ(newValue)
{
    filter.Q(newValue);
    biquadFilter.Q.value = newValue;
};

function getFilterType(value)
{
     filterType = value;
	 filter.type(filterType)
     biquadFilter.type = filterType;
}

function showValue01(newValue)
{
	document.getElementById("range01").innerHTML=newValue;
}

function showValue02(newValue)
{
	document.getElementById("range02").innerHTML=newValue;
}

function showValue03(newValue)
{
	document.getElementById("range03").innerHTML=newValue;
}

function showValue04(newValue)
{
	document.getElementById("range04").innerHTML=newValue;
}
