define([
	'data/scoring_probabilities',
	'data/conversion_probabilities',
	'data/punting_outcomes',
	'data/field_positions',
	'data/gain_outcomes',
	'data/togo_probabilities',
	'data/drive_outcomes'
	], function(Scoring, Converting, Punting, Positions, Gains, Togo, Drives) {

		var Probabilities = {};

		Probabilities.Scoring = Scoring;
		Probabilities.Converting = Converting;
		Probabilities.Punting = Punting;
		Probabilities.Positions = Positions;
		Probabilities.Gains = Gains;
		Probabilities.Togo = Togo;
		Probabilities.Drives = Drives;

		return Probabilities;
	}
);