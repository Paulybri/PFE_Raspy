window.onload = function WindowLoad(event) {
    initMap(8);
}

window.setInterval(function(){
  /// call your function here
  $.getJSON("./background_process",{},function(result){
      console.log(result.currentArray);
    for (i = 0; i < result.currentArray.length; i++){
      
        updateSensor(i,result.currentArray[i]);
    }
  });
}, 1000);

MAX_AMP = 10;
MIN_AMP = 0;

function initMap(sensorCount){
    amp_data = []
    var map = document.getElementById("map");
    map.innerHTML = '';
    console.log(map);
	map.innerHTML += '<table>';
    for (var i = 0; i < sensorCount; i++) {

			if (i == 0) {
				map.innerHTML += '<tr>';
			}
            map.innerHTML += 
            ('<th class="sensorWrapper">'+
               '<div class="sensor"></div>'+
               '<a class="indicator">-</a>'+
             '</th>');
            amp_data.push(0);

      updateSensor(i, 0)
		if (i == sensorCount/2) {
			map.innerHTML += '</tr><tr>';
		}
    }
	map.innerHTML += '</tr></table>';
}

function updateSensor(sensorIdx, ampValue) {
    sensors = document.getElementsByClassName("sensor");
    indicator = document.getElementsByClassName("indicator");

    sensors[sensorIdx].style.background = heatMapColorforValue(ampValue);
    indicator[sensorIdx].text = "" + ampValue.toFixed(2) + " A";
    amp_data[sensorIdx] = ampValue
}

function refreshStrip() {

    for(var i = 0; i < amp_data.length; i++) {
      updateSensor(i, amp_data[i]);
    }
}

function heatMapColorforValue(value){
  var h = 
    (1.0 - Math.min(Math.max(value-MIN_AMP,0)/(MAX_AMP-MIN_AMP),1)) * 240
  return "hsl(" + h + ", 100%, 50%)";
}

var maxHeatRange = document.getElementById("maxHeatRange");
maxHeatRange.value = MAX_AMP;
maxHeatRange.oninput = function () {
    MAX_AMP = maxHeatRange.value;
    refreshStrip()
}

var minHeatRange = document.getElementById("minHeatRange");
minHeatRange.value = MIN_AMP;
minHeatRange.oninput = function () {
    MIN_AMP = minHeatRange.value;
    refreshStrip()
}