require.config({
    baseUrl: "js",
    urlArgs: "bust=" +  (new Date()).getTime()
});

define(['cydr/dist/cydr-dist', 'data/probabilities'], function(Cydr, Probabilities) {
    var i, weight, Simulator, SimulationResult, App;

    Simulator = Cydr.ViewModel.extend({

        properties: {

            "Strategy": "Text",
            "Simulations": "Int",
            "YourScore": "Float",
            "Loading": "Boolean",
            "State": "Text"
        },


        has_many: {
            "Results": "SimulationResult",
            "PuntingCriteria": "SimulationCriterion",
            "GoForItCriteria": "SimulationCriterion"
        },


        defaults: {
            "Simulations": 100,
            "Strategy": "goforit",
            "YourScore": 0,
            "State": "configure"
        },

        className: "Simulator",


        RunSimulation: function () {
            this.set("Loading", true);
            var self = this;
            window.setTimeout(function() {
                self.simulate();
            },300);
        },


        ResetSimulation: function () {
            this.get("Results").removeAll();
            this.set("YourScore", 0);
            this.set("State","configure")
        },


        AddPuntingCriterion: function () {
            this.get("PuntingCriteria").push(new SimulationCriterion());
        },

        AddGoForItCriterion: function () {
            this.get("GoForItCriteria").push(new SimulationCriterion());
        },

        simulate: function () {
            var result, net = 0, results = [], i;
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
                results.push(result);

            }
            this.get("Results").pushMany(results);
            this.set("Loading", false);
            this.set("State", "results")
        },

        score: function(pts) {
            var current = this.get("YourScore");
            var total = current+pts;
            this.set("YourScore", total.toFixed(2));
        },


        executeDecision: function(result) {

            var strategy        = this.get("Strategy"),
                togo            = result.get("Togo"),
                line            = result.get("FourthDownYardLine"),
                match           = true
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
                    match = false;
                    this.get("PuntingCriteria").each(function(criterion) {
                        match = match || (togo >= criterion.get("ToGoMin") && togo <= criterion.get("ToGoMax") && line >= criterion.get("PositionMin") && line <= criterion.get("PositionMax"))
                    });
                    if(match) {
                        result.set("DecisionLabel", "Punt (criteria match)");
                        result.set("Decision", "punt");
                    }
                    else {
                        result.set("DecisionLabel", "Go for it (criteria don't match)");
                        result.set("Decision", "goforit");
                    }
                    break;

                case "customgoforit":
                    match = false;
                    this.get("GoForItCriteria").each(function(criterion) {
                        match = match || (togo >= criterion.get("ToGoMin") && togo <= criterion.get("ToGoMax") && line >= criterion.get("PositionMin") && line <= criterion.get("PositionMax"))
                    });
                    if(match) {
                        result.set("DecisionLabel", "Go for it (criteria match)");
                        result.set("Decision", "goforit");
                    }
                    else {
                        result.set("DecisionLabel", "Punt (criteria don't match)");
                        result.set("Decision", "punt");
                    }
                    break;
            }
        },



    });

    SimulationCriterion = Cydr.Model.extend({

        properties: {
            "ToGoMin": "Int",
            "ToGoMax": "Int",
            "PositionMin": "Int",
            "PositionMax": "Int"
        },

        defaults: {
            "ToGoMin": 1,
            "ToGoMax": 100,
            "PositionMin": 1,
            "PositionMax": 100
        }
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
            var yds = this.get("Converted") ? this.get("NewYardLine") : 100-this.get("NewYardLine");
            return this.getNiceYards(yds);
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
                    this.set("PuntingYardLine", 80);
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



    var App = new Simulator("#app");
    App.get("PuntingCriteria").push(new SimulationCriterion());
    App.get("GoForItCriteria").push(new SimulationCriterion());



});