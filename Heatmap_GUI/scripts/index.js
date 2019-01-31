window.onload = function WindowLoad(event) {
    initMap(11);
}

MAX_AMP = 10;
MIN_AMP = 0;

function initMap(sensorCount){
    var map = document.getElementById("map");
    map.innerHTML = '';
    console.log(map);
    for (var i = 0; i < sensorCount; i++) {
        (function () {
            var ii = i;
            map.innerHTML += 
            ('<div class="sensorWrapper">'+
               '<div class="sensor"></div>'+
               '<a class="indicator">-</a>'+
             '</div>');
      })();
      updateSensor(i, i)
    }
}

function updateSensor(sensorIdx, ampValue) {

    sensors = document.getElementsByClassName("sensor");
    indicator = document.getElementsByClassName("indicator");

    sensors[sensorIdx].style.background = heatMapColorforValue(ampValue);
    indicator[sensorIdx].text = "" + ampValue + " A";
}

function heatMapColorforValue(value){
  var h = (1.0 - (value)/MAX_AMP) * 240
  return "hsl(" + h + ", 100%, 50%)";
}

var maxHeatRange = document.getElementById("maxHeatRange");
maxHeatRange.value = MAX_AMP;
maxHeatRange.oninput = function () {
    MAX_AMP = maxHeatRange.value;
}

var minHeatRange = document.getElementById("minHeatRange");
minHeatRange.value = MIN_AMP;
minHeatRange.oninput = function () {
    MIN_AMP = minHeatRange.value;
}