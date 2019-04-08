function panneau() {
	console.log("Dans script_panneau.js");
	// Récupération des données du slider pour l'instant
	var sliderCuisine = document.getElementById("cuisine");
	var sliderSalon = document.getElementById("salon");
	var sliderSalleBain = document.getElementById("salleBain");
	var sliderChambre1 = document.getElementById("chambre1");
	var sliderChambre2 = document.getElementById("chambre2");
	var slider6 = document.getElementById("slider6");
	var slider7 = document.getElementById("slider7");
	var slider8 = document.getElementById("slider8");

	// create a heatmap instance
	var heatmap = h337.create({
	  container: document.getElementById('heatmapContainer'),
	  maxOpacity: .5,
	  radius: 50,
	  blur: .75,
	});

	// boundaries for data generation
	var width = (+window.getComputedStyle(document.body).width.replace(/px/,''));
	var height = (+window.getComputedStyle(document.body).height.replace(/px/,''));

	var d1 = new Array(3);
	d1[0] = {x:200, y:30, value:0};
	d1[1] = {x:225, y:30, value:0};
	d1[2] = {x:250, y:30, value:0};
	
	var d2 = new Array(3);
	d2[0] = {x:200, y:95, value:0};
	d2[1] = {x:225, y:95, value:0};
	d2[2] = {x:250, y:95, value:0};
	
	var d3 = new Array(3);
	d3[0] = {x:200, y:152, value:0};
	d3[1] = {x:225, y:152, value:0};
	d3[2] = {x:250, y:152, value:0};
	
	var d4 = new Array(3);
	d4[0] = {x:200, y:214, value:0};
	d4[1] = {x:225, y:214, value:0};
	d4[2] = {x:250, y:214, value:0};
	
	var d5 = new Array(3);
	d5[0] = {x:200, y:270, value:0};
	d5[1] = {x:225, y:270, value:0};
	d5[2] = {x:250, y:270, value:0};
	
	var d6 = new Array(3);
	d6[0] = {x:200, y:325, value:0};
	d6[1] = {x:225, y:325, value:0};
	d6[2] = {x:250, y:325, value:0};
	
	var d7 = new Array(3);
	d7[0] = {x:200, y:380, value:0};
	d7[1] = {x:225, y:380, value:0};
	d7[2] = {x:250, y:380, value:0};
	
	var d8 = new Array(3);
	d8[0] = {x:200, y:442, value:0};
	d8[1] = {x:225, y:442, value:0};
	d8[2] = {x:250, y:442, value:0};

	var i = 0;
	var datas = [];
	
	sliderCuisine.oninput = function() {
		datas = [];
		for(i=0; i < 3; i++) {
			d1[i]["value"] = sliderCuisine.value;
			datas.push(d1[i]);
			datas.push(d2[i]);
			datas.push(d3[i]);
			datas.push(d4[i]);
			datas.push(d5[i]);
			datas.push(d6[i]);
			datas.push(d7[i]);
			datas.push(d8[i]);
		}
		
		heatmap.setData({
		  min: 0,
		  max: 100,
		  data: datas
		});
	}

	sliderSalon.oninput = function() {
		datas = [];
		for(i=0; i < 3; i++) {
			console.log(d2[i]);
			d2[i]["value"] = sliderSalon.value;
			datas.push(d1[i]);
			datas.push(d2[i]);
			datas.push(d3[i]);
			datas.push(d4[i]);
			datas.push(d5[i]);
			datas.push(d6[i]);
			datas.push(d7[i]);
			datas.push(d8[i]);
		}
		
		heatmap.setData({
		  min: 0,
		  max: 100,
		  data: datas
		});
	}

	sliderSalleBain.oninput = function() {
		datas = [];
		for(i=0; i < 3; i++) {
			console.log(d2[i]);
			d3[i]["value"] = sliderSalleBain.value;
			datas.push(d1[i]);
			datas.push(d2[i]);
			datas.push(d3[i]);
			datas.push(d4[i]);
			datas.push(d5[i]);
			datas.push(d6[i]);
			datas.push(d7[i]);
			datas.push(d8[i]);
		}
		
		heatmap.setData({
		  min: 0,
		  max: 100,
		  data: datas
		});
	}

	sliderChambre1.oninput = function() {
		datas = [];
		for(i=0; i < 3; i++) {
			console.log(d2[i]);
			d4[i]["value"] = sliderChambre1.value;
			datas.push(d1[i]);
			datas.push(d2[i]);
			datas.push(d3[i]);
			datas.push(d4[i]);
			datas.push(d5[i]);
			datas.push(d6[i]);
			datas.push(d7[i]);
			datas.push(d8[i]);
		}
		
		heatmap.setData({
		  min: 0,
		  max: 100,
		  data: datas
		});
	}

	sliderChambre2.oninput = function() {
		datas = [];
		for(i=0; i < 3; i++) {
			console.log(d2[i]);
			d5[i]["value"] = sliderChambre2.value;
			datas.push(d1[i]);
			datas.push(d2[i]);
			datas.push(d3[i]);
			datas.push(d4[i]);
			datas.push(d5[i]);
			datas.push(d6[i]);
			datas.push(d7[i]);
			datas.push(d8[i]);
		}
		
		heatmap.setData({
		  min: 0,
		  max: 100,
		  data: datas
		});
	}

	slider6.oninput = function() {
		datas = [];
		for(i=0; i < 3; i++) {
			console.log(d2[i]);
			d6[i]["value"] = slider6.value;
			datas.push(d1[i]);
			datas.push(d2[i]);
			datas.push(d3[i]);
			datas.push(d4[i]);
			datas.push(d5[i]);
			datas.push(d6[i]);
			datas.push(d7[i]);
			datas.push(d8[i]);
		}
		
		heatmap.setData({
		  min: 0,
		  max: 100,
		  data: datas
		});
	}

	slider7.oninput = function() {
		datas = [];
		for(i=0; i < 3; i++) {
			console.log(d2[i]);
			d7[i]["value"] = slider7.value;
			datas.push(d1[i]);
			datas.push(d2[i]);
			datas.push(d3[i]);
			datas.push(d4[i]);
			datas.push(d5[i]);
			datas.push(d6[i]);
			datas.push(d7[i]);
			datas.push(d8[i]);
		}
		
		heatmap.setData({
		  min: 0,
		  max: 100,
		  data: datas
		});
	}

	slider8.oninput = function() {
		datas = [];
		for(i=0; i < 3; i++) {
			console.log(d2[i]);
			d8[i]["value"] = slider8.value;
			datas.push(d1[i]);
			datas.push(d2[i]);
			datas.push(d3[i]);
			datas.push(d4[i]);
			datas.push(d5[i]);
			datas.push(d6[i]);
			datas.push(d7[i]);
			datas.push(d8[i]);
		}
		
		heatmap.setData({
		  min: 0,
		  max: 100,
		  data: datas
		});
	}
	
}
