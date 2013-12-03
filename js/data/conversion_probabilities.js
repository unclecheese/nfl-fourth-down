
define(function() {
	var data = {
		1: 0.72,
		2: 0.55,
		3: 0.51,
		4: 0.47,
		5: 0.41,
		6: 0.42,
		7: 0.39,
		8: 0.43,
		9: 0.44,
		10: 0.37,
		11: 0.41,
		12: 0.31,
		13: 0.14,
		14: 0.28,
		15: 0.22,
		16: 0.22,
		17: 0.25,
		18: 0.29,
		19: 0.21,
		20: 0.10
	};
	return {
		data: data,
		get: function (togo) {
			if(togo > 20) return 0.05;
			var result = data[togo];
			return result ? result : console.error(togo," doesn't exist");
		}
	};
});