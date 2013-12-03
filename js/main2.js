require.config({
	baseUrl: "js",
	//packages: ["cydr"],
	urlArgs: "bust=" +  (new Date()).getTime()
});

define(['cydr/dist/cydr-dist', 'data/probabilities'], function(Cydr, Probabilities) {
	var i, weight, Simulator, SimulationResult, App;

	Simulator = Cydr.ViewModel.extend({

		properties: {

			"Strategy": "Text",

			"PuntToGoMin": "Int",
			"PuntToGoMax": "Int",
			"GoForItToGoMin": "Int",
			"GoForItToGoMax": "Int",
			"PuntPositionMin": "Int",
			"PuntPositionMax": "Int",
			"GoForItPositionMin": "Int",
			"GoForItPositionMax": "Int",

			"Simulations": "Int",

			"YourScore": "Float",

			"Loading": "Boolean"
		},


		has_many: {
			"Results": "SimulationResult"
		},


		defaults: {
			"Simulations": 100,
			"Strategy": "goforit",
			"YourScore": 0,
			"PuntToGoMin": 1,
			"PuntToGoMax": 10,
			"GoForItToGoMin": 1,
			"GoForItToGoMax": 10,
			"PuntPositionMin": 1,
			"PuntPositionMax": 99,
			"GoForItPositionMin": 1,
			"GoForItPositionMax": 99,

		},

		className: "Simulator",

		RunSimulation: function () {
			this.set("Loading", true);
			var self = this;
			window.setTimeout(function() {
				self.simulate();
			},0);
		},


		ResetSimulation: function () {
			this.get("Results").removeAll();
			this.set("YourScore", 0);
		},

		simulate: function () {
			var result, net = 0, i;
			for(i = 0; i < this.get("Simulations"); i++) {
				net = 0;
				result = new SimulationResult({
					FourthDownYardLine: Probabilities.Drives.get(),
					Togo: Probabilities.Togo.get(),
				});

				result.tryPunt();
				result.tryGoForIt();

				this.executeDecision(result);

				if(result.get("Decision") === "punt") {
					net -= result.get("CostOfPunting");
					// If going for it would have resulted in a conversion, apply the inverse cost/benefit
					net -= result.get("CostBenefitOfAttempt");

				}

				else if(result.get("Decision") === "goforit") {
					net += result.get("CostOfPunting");
					net += result.get("CostBenefitOfAttempt");
				}

				this.score(net);
				result.set("Net", net.toFixed(2));

				this.get("Results").push(result);
			}

			this.set("Loading", false);
		},

		score: function(pts) {
			var current = this.get("YourScore");
			var total = current+pts;
			this.set("YourScore", total.toFixed(2));
		},


		executeDecision: function(result) {

			var strategy 		= this.get("Strategy"),
				puntTogoMin 	= this.get("PuntToGoMin"),
				puntTogoMax 	= this.get("PuntToGoMax"),
				goTogoMin 		= this.get("GoForItToGoMin"),
				goTogoMax 		= this.get("GoForItToGoMax"),
				puntLineMin 	= this.get("PuntPositionMin"),
				puntLineMax 	= this.get("PuntPositionMax"),
				goLineMin 		= this.get("GoForItPositionMin"),
				goLineMax 		= this.get("GoForItPositionMax")
				togo 			= result.get("Togo"),
				line 			= result.get("FourthDownYardLine")
			;

			switch(strategy) {
				case "punt":
					result.set("DecisionLabel", "Punt (always)");
					result.set("Decision", "punt");
					//return result.punt();
					break;
				case "goforit":
					result.set("DecisionLabel", "Go for it (always)");
					result.set("Decision", "goforit");
					//return result.goForIt();
					break;
				case "custompunt":
					if(togo >= puntTogoMin && togo <= puntTogoMax && line >= puntLineMin && line <= puntLineMax) {
						//console.log(togo, "is between",puntTogoMin, " and", puntTogoMax, " and ", line, "is between", puntLineMin, "and",puntLineMax);
						result.set("DecisionLabel", "Punt (custom)");
						result.set("Decision", "punt");
						//return result.punt();
					}
					else {
						result.set("DecisionLabel", "Go for it (custom)");
						result.set("Decision", "goforit");
						//return result.punt();
					}

				case "customgoforit":
					if(togo >= goTogoMin && togo <= goTogoMax && line >= goLineMin && line <= goLineMax) {
						//console.log(togo, "is between",goTogoMin, " and", goTogoMax, " and ", line, "is between", goLineMin, "and",goLineMax);
						result.set("DecisionLabel", "Go for it (custom)");
						result.set("Decision", "goforit");
						//return result.goForIt();
					}
					else {
						result.set("DecisionLabel", "Punt (custom)");
						result.set("Decision", "punt");
						//return this.punt();
					}
			}
		},



	});


	SimulationResult = Cydr.Model.extend({

		properties: {
			"Togo": "Int",
			"Decision": "Text",
			"DecisionLabel": "Text",
			"Converted": "Boolean",
			"PuntingDistance": "Text",
			"FourthDownYardLine": "Int",
			"FourthDownGain": "Int",
			"NewYardLine": "Int",
			"CostOfPunting": "Float",
			"PuntingYardLine": "Int",
			"CostBenefitOfAttempt": "Float",
			"Net": "Float"

		},

		defaults: {
			"Togo": 10,
			"FourthDownGain": 0
		},

		className: "SimulationResult",


		getNiceYards: function (yd) {
			if(yd < 50) return "<i class='glyphicon glyphicon-chevron-left'></i> " + yd;
			if(yd > 50) return (100-yd) + " <i class='glyphicon glyphicon-chevron-right'></i>";
			return yd;
		},

		FourthDownYardLineNice: function () {
			return this.getNiceYards(this.get("FourthDownYardLine"));
		},


		PuntingYardLineNice: function () {
			return this.getNiceYards(this.get("PuntingYardLine"));
		},


		PuntingDistanceNice: function () {
			if(this.get("PuntingDistance") == "TD") {
				return "TOUCHDOWN";
			}
			else if(this.get("PuntingDistance") == "TB") {
				return "TOUCHBACK";
			}

			return this.get("PuntingDistance") + " yards";
		},

		NewYardLineNice: function () {
			return this.getNiceYards(this.get("NewYardLine"));
		},

		ChanceOfFGAfter4th: function () {
			var position = this.get("NewYardLine");
			var result = Probabilities.Scoring.data[position];
			return result ? result.FG : 0;
		},

		ChanceOfTDAfter4th: function () {
			var position = this.get("NewYardLine");
			var result = Probabilities.Scoring.data[position];
			return result ? result.TD : 0;
		},


		ChanceOfFGAfterPunt: function () {
			var position = this.get("PuntingYardLine");
			var result = Probabilities.Scoring.data[100-position];
			return result ? result.FG : 0;
		},

		ChanceOfTDAfterPunt: function () {
			var position = this.get("PuntingYardLine");
			var result = Probabilities.Scoring.data[100-position];
			return result ? result.TD : 0;
		},

		ChanceOfConversion: function () {
			var result = Probabilities.Converting.get(this.get("Togo"));
			return result ? result : 0;
		},

		tryPunt: function () {
			this.set("PuntingDistance", Probabilities.Punting.get(this.get("FourthDownYardLine")));
			if(this.get("PuntingDistance") == "TD") {
				this.set("CostOfPunting", 7);
				this.set("PuntingYardLine", "N/A");
			}
			else {
				if(this.get("PuntingDistance") == "TB") {
					this.set("PuntingYardLine", 20);
				}
				else {
					this.set("PuntingYardLine", this.get("FourthDownYardLine") + this.get("PuntingDistance"));
				}
				this.set("CostOfPunting", Probabilities.Scoring.data[100-this.get("PuntingYardLine")].Composite.toFixed(2));
			}

		},

		tryGoForIt: function() {
			var gain = Probabilities.Gains.get(this.get("Togo")),
				converted = gain >= this.get("Togo"),
				newYds = this.get("FourthDownYardLine")+gain
			;

			if(newYds < 1) {
				newYds = 1;
			}

			this.set("Converted", converted);
			this.set("FourthDownGain", gain);

			if(converted) {
				if(newYds > 99) {
					this.set("CostBenefitOfAttempt", 7);
					this.set("NewYardLine", 100);
				}
				else {
					this.set("CostBenefitOfAttempt", Probabilities.Scoring.data[newYds].Composite.toFixed(2));
					this.set("NewYardLine", newYds);
				}
			}
			else {
				this.set("CostBenefitOfAttempt", Probabilities.Scoring.data[(100-newYds)].Composite.toFixed(2)*-1);
				this.set("NewYardLine", 100-newYds);
			}

		}
	});


	App = new Simulator("#app");


/*
			"Togo": "Int",
			"Decision": "Text",
			"Converted": "Boolean",
			"PuntDistance": "Int",
			"ScoredTD": "Boolean",
			"ScoredFG": "Boolean",
			"OriginalYardLine": "Int",
			"NewYardLine": "Int",
			"Score": "Int"
*/


});