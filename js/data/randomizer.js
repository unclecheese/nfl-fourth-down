define(function() {
	var Randomizer = {};

	Randomizer.getRandomInt = function (min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	};


	Randomizer.getRandomArrayValue = function (arr) {
		var min = 0;
		var max = (arr.length)-1;
		var rand = this.getRandomInt(min, max);

		return arr[rand];
	};
	

	return Randomizer;
})