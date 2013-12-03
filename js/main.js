// require.config({
// 	baseUrl: "js",
// 	paths: {
// 		'jquery' : '//code.jquery.com/jquery-1.10.1.min'
// 	},
// 	packages: ["cydr"],
// 	urlArgs: "bust=" +  (new Date()).getTime()
// });

// define(function(require, exports, module) {
// 	var i, weight, Simulator, SimulationResult, App,

// 	$ = require("jquery"),
// 	Probabilities = require("data/probabilities"),
// 	Cydr = require("cydr");

// 	Simulator = Cydr.ViewModel.extend({

// 		properties: {

// 			"Strategy": "Text",

// 			"PuntToGoMin": "Int",
// 			"PuntToGoMax": "Int",
// 			"GoForItToGoMin": "Int",
// 			"GoForItToGoMax": "Int",
// 			"PuntPositionMin": "Int",
// 			"PuntPositionMax": "Int",
// 			"GoForItPositionMin": "Int",
// 			"GoForItPositionMax": "Int",

// 			"Simulations": "Int",

// 			"YourScore": "Int",
// 			"OppScore": "Int",

// 			"Loading": "Boolean"
// 		},


// 		has_many: {
// 			"Results": "SimulationResult"
// 		},


// 		defaults: {
// 			"Simulations": 100,
// 			"Strategy": "goforit",
// 			"YourScore": 0,
// 			"OppScore": 0
// 		},

// 		className: "Simulator",

// 		RunSimulation: function () {
// 			this.set("Loading", true);
// 			var self = this;
// 			window.setTimeout(function() {
// 				self.simulate();
// 			},0);
// 		},

// 		simulate: function () {
// 			var result, position, scoreField;
// 			for(var i = 0; i < this.get("Simulations"); i++) {
// 				var didScore, yourScore,
// 				startYds = Probabilities.Positions.get();
// 				result = new SimulationResult({
// 					OriginalYardLine: startYds
// 				});


// 				didScore = Probabilities.Scoring.get(startYds);


// 				if(didScore) {
// 					yourScore = this.get("YourScore");
// 					switch(didScore) {
// 						case "FG":
// 							result.set("ScoredFG", true);
// 							this.set("YourScore", yourScore+3);
// 						break;

// 						case "TD":
// 							result.set("ScoredTD", true);
// 							this.set("YourScore", yourScore+7);
// 						break;
// 					}

// 					this.get("Results").push(result);
// 					continue;
// 				}

// 				result.set("FourthDownYardLine", Probabilities.Drives.get());
// 				result.set("Togo", Probabilities.Togo.get());

// 				result.executeDecision(this.get("Strategy"));

// 				// If returned kick for TD, or going for it on 4th resulted in TD
// 				if(result.get("Score") > 0) {
// 					continue;
// 				}

// 				position = result.get("NewYardLine");

// 				if(result.get("Converted")) {
// 					scoreField = "YourScore";
// 				}
// 				else {
// 					scoreField = "OppScore";
// 				}
// 				score = Probabilities.Scoring.get(position);

// 				var current = this.get(scoreField);
// 				switch(score) {
// 					case "FG":
// 						this.set(scoreField, current+3);
// 						result.set("Score", 3);
// 					break;

// 					case "TD":
// 						this.set(scoreField, current+7);
// 						result.set("Score", 7);
// 					break;

// 					default:
// 						result.set("Score", 0);
// 					break;
// 				}

// 				this.get("Results").push(result);
// 			}

// 			this.set("Loading", false);
// 		},

// 		scoreForTeam: function(pts) {
// 			var current = this.get("YourScore");
// 			this.set("YourScore", current+pts);
// 		},

// 		scoreForOpp: function(pts) {
// 			var current = this.get("OppScore");
// 			this.set("OppScore", current+pts);
// 		}

// 	});


// 	SimulationResult = Cydr.Model.extend({

// 		properties: {
// 			"Togo": "Int",
// 			"Decision": "Text",
// 			"DecisionLabel": "Text",
// 			"Converted": "Boolean",
// 			"PuntDistance": "Int",
// 			"ScoredTD": "Boolean",
// 			"ScoredFG": "Boolean",
// 			"OriginalYardLine": "Int",
// 			"FourthDownYardLine": "Int",
// 			"FourthDownGain": "Int",
// 			"NewYardLine": "Int",
// 			"Score": "Int"
// 		},

// 		defaults: {
// 			"ScoredTD": false,
// 			"ScoredFG": false,
// 			"Score": 0,
// 			"Togo": 10
// 		},

// 		className: "SimulationResult",

// 		executeDecision: function(strategy) {
// 			switch(strategy) {
// 				case "punt":
// 					this.set("DecisionLabel", "Punt (always)");
// 					this.set("Decision", "punt");
// 					this.punt();
// 					break;
// 				case "goforit":
// 					this.set("DecisionLabel", "Go for it (always)");
// 					this.set("Decision", "goforit");
// 					this.goForIt();
// 					break;
// 				case "custom":
// 					if(togo >= this.get("PuntToGoMin") && togo <= this.get("PuntToGoMax")) {
// 						this.set("DecisionLabel", "Punt (within 'to go' range)");
// 						this.set("Decision", "punt");
// 						this.punt();
// 					}
// 					else if(togo >= this.get("GoForItToGoMin") && togo <= this.get("GoForItToGoMax")) {
// 						this.set("DecisionLabel", "Go for it (within 'to go' range)");
// 						this.set("Decision", "goforit");
// 						this.goForIt();
// 					}
// 					else if(fourthDownYardLine >= this.get("PuntPositionMin") && fourthDownYardLine <= this.get("PuntPositionMax")) {
// 						this.set("DecisionLabel", "Punt (within field position range)");
// 						this.set("Decision", "punt");
// 						this.punt();
// 					}
// 					else if(fourthDownYardLine >= this.get("GoForItPositionMin") && fourthDownYardLine <= this.get("GoForItPositionMax")) {
// 						this.set("DecisionLabel", "Go for it (within field position range)");
// 						this.set("Decision", "goforit");
// 						this.goForIt();
// 					}
// 					else {
// 						if(Math.random() < 0.5) {
// 							this.set("DecisionLabel", "Go for it (randomly chosen)");
// 							this.set("Decision", "goforit");
// 							this.goForIt();
// 						}
// 						else {
// 							this.set("DecisionLabel", "Punt (randomly chosen)");
// 							this.set("Decision", "punt");
// 							this.punt();
// 						}
// 					}
// 			}
// 		},

// 		getNiceYards: function (yd) {
// 			if(yd < 50) return "< " + yd;
// 			if(yd > 50) return (100-yd) + " >";
// 			return yd;
// 		},

// 		FourthDownYardLineNice: function () {
// 			return this.getNiceYards(this.get("FourthDownYardLine"));
// 		},

// 		FourthDownYardLineNice: function () {
// 			return this.getNiceYards(this.get("FourthDownYardLine"));
// 		},

// 		OriginalYardLineNice: function () {
// 			return this.getNiceYards(this.get("OriginalYardLine"));
// 		},

// 		NewYardLineNice: function () {
// 			return this.getNiceYards(this.get("NewYardLine"));
// 		},

// 		OriginalChanceOfFG: function () {
// 			var result = Probabilities.Scoring.data[this.get("OriginalYardLine")];
// 			return result ? result.FG : 0;
// 		},

// 		OriginalChanceOfTD: function () {
// 			var result = Probabilities.Scoring.data[this.get("OriginalYardLine")];
// 			return result ? result.TD : 0;

// 		},

// 		NewChanceOfFG: function () {
// 			var position = this.get("NewYardLine");
// 			var result = Probabilities.Scoring.data[position];
// 			return result ? result.FG : 0;
// 		},

// 		NewChanceOfTD: function () {
// 			var position = this.get("NewYardLine");
// 			var result = Probabilities.Scoring.data[position];
// 			return result ? result.TD : 0;
// 		},

// 		ChanceOfConversion: function () {
// 			var result = Probabilities.Converting.get(this.get("Togo"));
// 			return result ? result : 0;
// 		},

// 		FacedFourthDown: function () {
// 			return !this.get("ScoredTD") && !this.get("ScoredFG");
// 		},

// 		GaveUpPosession: function () {
// 			return (!this.get("Converted") && this.FacedFourthDown()) || this.get("Decision") === "punt";
// 		},

// 		punt: function () {
// 			var result = Probabilities.Punting.get(this.get("FourthDownYardLine"));
// 			this.set("Converted", false);
// 			if(result === "TD") {
// 				App.scoreForOpp(7);
// 				this.set("Score", 7);
// 				this.set("PuntDistance", "Returned for TD");
// 			}
// 			else if(result === "TB") {
// 				this.set("PuntDistance", "Touchback");
// 				this.set("NewYardLine", 20);
// 			}
// 			else {
// 				var pos = this.get("FourthDownYardLine")+result;
// 				this.set("PuntDistance", result);
// 				this.set("NewYardLine", (100-pos));
// 			}
// 		},

// 		goForIt: function() {
// 			var prob = this.ChanceOfConversion()*100;
// 			var gain = Probabilities.Gains.get(this.get("Togo"));
// 			var converted = gain >= this.get("Togo");
// 			var newYds = this.get("FourthDownYardLine")+gain;

// 			this.set("Converted", converted);
// 			this.set("FourthDownGain", gain);

// 			if(converted) {
// 				if(newYds > 99) {
// 					App.scoreForTeam(7);
// 					this.set("Score", 7);
// 				}
// 				this.set("NewYardLine", newYds);
// 			}
// 			else {
// 				this.set("NewYardLine", (100 - newYds));
// 			}
// 		}
// 	});


// 	App = new Simulator("#app");
// 	App.set("Simulations",100);


// /*
// 			"Togo": "Int",
// 			"Decision": "Text",
// 			"Converted": "Boolean",
// 			"PuntDistance": "Int",
// 			"ScoredTD": "Boolean",
// 			"ScoredFG": "Boolean",
// 			"OriginalYardLine": "Int",
// 			"NewYardLine": "Int",
// 			"Score": "Int"
// */


// });