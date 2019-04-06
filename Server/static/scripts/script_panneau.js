var data = new Array();
var allData = new Array();
var previousArray = new Array();

// create a heatmap instance
var heatmap = h337.create({
  container: document.getElementById('heatmapContainer'),
  maxOpacity: .5,
  radius: 50,
  blur: .75,
});

function panneau() {
	// boundaries for data generation
	var width = (+window.getComputedStyle(document.body).width.replace(/px/,''));
	var height = (+window.getComputedStyle(document.body).height.replace(/px/,''));
	
	// Initialisation du tableau de données de chaque capteur
	var i = 0;
	var j = 0;
	var posx = 200;
	var posy = 30;
		
	for(j = 0; j < 8; j++) {
		data[j] = new Array();
		for(i = 0; i < 3; i++) {
			data[j][i] = {x:posx, y:posy, value:0};	
			posx += 25;		
		}
		posx = 200;
		posy += 65;
	}
}

function updatePanneau(currentArray) {
	var i = 0;
	var j = 0;
	
	for(j = 0; j < 8; j++) {
		for(i = 0; i < 3; i++) {
			if(previousArray[j] <= currentArray[j])
				data[j][i]["value"] = currentArray[j];
			else
				data[j][i]["value"] -= 0.2;
			
			allData[j] = data[j][i];
		}
	}
	console.log(MAX_AMP);
	heatmap.setData({
	  min: 0,
	  max: MAX_AMP,
	  data: allData
	});
	
	previousArray = currentArray;
}

