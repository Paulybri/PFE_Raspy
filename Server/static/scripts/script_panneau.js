var data = new Array();
var d1;
var d2;
var d3;
var d4;
var d5;
var d6;
var d7;
var d8;
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
		console.log(data[j]);
	}
/*
	d1 = new Array(3);
	d1[0] = {x:200, y:30, value:0};
	d1[1] = {x:225, y:30, value:0};
	d1[2] = {x:250, y:30, value:0};
	
	d2 = new Array(3);
	d2[0] = {x:200, y:95, value:0};
	d2[1] = {x:225, y:95, value:0};
	d2[2] = {x:250, y:95, value:0};
	
	d3 = new Array(3);
	d3[0] = {x:200, y:152, value:0};
	d3[1] = {x:225, y:152, value:0};
	d3[2] = {x:250, y:152, value:0};
	
	d4 = new Array(3);
	d4[0] = {x:200, y:214, value:0};
	d4[1] = {x:225, y:214, value:0};
	d4[2] = {x:250, y:214, value:0};
	
	d5 = new Array(3);
	d5[0] = {x:200, y:272, value:0};
	d5[1] = {x:225, y:272, value:0};
	d5[2] = {x:250, y:272, value:0};
	
	d6 = new Array(3);
	d6[0] = {x:200, y:275, value:0};
	d6[1] = {x:225, y:275, value:0};
	d6[2] = {x:250, y:275, value:0};
	
	d7 = new Array(3);
	d7[0] = {x:200, y:350, value:0};
	d7[1] = {x:225, y:350, value:0};
	d7[2] = {x:250, y:350, value:0};
	
	d8 = new Array(3);
	d8[0] = {x:200, y:410, value:0};
	d8[1] = {x:225, y:410, value:0};
	d8[2] = {x:250, y:410, value:0};*/
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
	
	/*
	for(j = 0; j < 8; j++) {
		for(i = 0; i < 3; i++) {
			data[j][i]["value"] = currentArray[j];
			datas[j] = data[j][i];
		}
	}*/
	/*		
	for(i = 0; i < 3; i++) {
		d1[i]["value"] = currentArray[0];
		d2[i]["value"] = currentArray[1];
		d3[i]["value"] = currentArray[2];
		d4[i]["value"] = currentArray[3];
		d5[i]["value"] = currentArray[4];
		d6[i]["value"] = currentArray[5];
		d7[i]["value"] = currentArray[6];
		d8[i]["value"] = currentArray[7];
		datas[0] = d1[i];
		datas[1] = d2[i];
		datas[2] = d3[i];
		datas[3] = d4[i];
		datas[4] = d5[i];
		datas[5] = d6[i];
		datas[6] = d7[i];
		datas[7] = d8[i];
	}*/
	
	heatmap.setData({
	  min: 0,
	  max: MAX_AMP,
	  data: allData
	});
	
	previousArray = currentArray;
}

