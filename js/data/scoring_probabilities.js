define(['data/randomizer'], function(Randomizer) {
var data = {
   "1":{
      "FG":4.6,
      "TD":8.6,
      "Composite":-0.53
   },
   "2":{
      "FG":6,
      "TD":9.4,
      "Composite":-0.5
   },
   "3":{
      "FG":5.3,
      "TD":8.4,
      "Composite":-0.47
   },
   "4":{
      "FG":4.5,
      "TD":10.2,
      "Composite":-0.43
   },
   "5":{
      "FG":6.2,
      "TD":12.2,
      "Composite":-0.4
   },
   "6":{
      "FG":8.6,
      "TD":11.3,
      "Composite":-0.37
   },
   "7":{
      "FG":9.8,
      "TD":12.5,
      "Composite":-0.34
   },
   "8":{
      "FG":8.7,
      "TD":10.6,
      "Composite":-0.3
   },
   "9":{
      "FG":8.4,
      "TD":12.2,
      "Composite":-0.25
   },
   "10":{
      "FG":7.4,
      "TD":13.8,
      "Composite":-0.21
   },
   "11":{
      "FG":7.8,
      "TD":12.4,
      "Composite":-0.16
   },
   "12":{
      "FG":11.2,
      "TD":14.7,
      "Composite":-0.11
   },
   "13":{
      "FG":7.4,
      "TD":12.8,
      "Composite":-0.04
   },
   "14":{
      "FG":8.6,
      "TD":15,
      "Composite":-0.04
   },
   "15":{
      "FG":9,
      "TD":13.8,
      "Composite":0.11
   },
   "16":{
      "FG":8.1,
      "TD":14.3,
      "Composite":0.17
   },
   "17":{
      "FG":8.8,
      "TD":14.9,
      "Composite":0.22
   },
   "18":{
      "FG":8.9,
      "TD":15,
      "Composite":0.26
   },
   "19":{
      "FG":8.9,
      "TD":14.8,
      "Composite":0.3
   },
   "20":{
      "FG":10.5,
      "TD":15.1,
      "Composite":0.34
   },
   "21":{
      "FG":10.2,
      "TD":14.7,
      "Composite":0.38
   },
   "22":{
      "FG":10.3,
      "TD":16.4,
      "Composite":0.42
   },
   "23":{
      "FG":10.2,
      "TD":16.4,
      "Composite":0.46
   },
   "24":{
      "FG":10.1,
      "TD":15.5,
      "Composite":0.51
   },
   "25":{
      "FG":12.1,
      "TD":16.1,
      "Composite":0.58
   },
   "26":{
      "FG":10.3,
      "TD":18.4,
      "Composite":0.65
   },
   "27":{
      "FG":10.7,
      "TD":17.5,
      "Composite":0.72
   },
   "28":{
      "FG":11.5,
      "TD":19.1,
      "Composite":0.78
   },
   "29":{
      "FG":10.5,
      "TD":18.5,
      "Composite":0.85
   },
   "30":{
      "FG":11.5,
      "TD":16.6,
      "Composite":0.9
   },
   "31":{
      "FG":12.8,
      "TD":19.3,
      "Composite":0.95
   },
   "32":{
      "FG":11.9,
      "TD":18.6,
      "Composite":1
   },
   "33":{
      "FG":11.7,
      "TD":17.3,
      "Composite":1.05
   },
   "34":{
      "FG":13.9,
      "TD":18.5,
      "Composite":1.1
   },
   "35":{
      "FG":12.5,
      "TD":18.1,
      "Composite":1.15
   },
   "36":{
      "FG":14.9,
      "TD":19.2,
      "Composite":1.2
   },
   "37":{
      "FG":14.8,
      "TD":21.6,
      "Composite":1.25
   },
   "38":{
      "FG":15.9,
      "TD":20.4,
      "Composite":1.31
   },
   "39":{
      "FG":15.3,
      "TD":20.5,
      "Composite":1.37
   },
   "40":{
      "FG":15.7,
      "TD":20.3,
      "Composite":1.44
   },
   "41":{
      "FG":13.1,
      "TD":22.1,
      "Composite":1.51
   },
   "42":{
      "FG":15,
      "TD":22.9,
      "Composite":1.57
   },
   "43":{
      "FG":16.8,
      "TD":21.2,
      "Composite":1.63
   },
   "44":{
      "FG":15.8,
      "TD":24.9,
      "Composite":1.7
   },
   "45":{
      "FG":16.7,
      "TD":21.9,
      "Composite":1.77
   },
   "46":{
      "FG":15.6,
      "TD":23.2,
      "Composite":1.82
   },
   "47":{
      "FG":19,
      "TD":24.8,
      "Composite":1.87
   },
   "48":{
      "FG":19.5,
      "TD":25.7,
      "Composite":1.92
   },
   "49":{
      "FG":17.7,
      "TD":26,
      "Composite":1.98
   },
   "50":{
      "FG":17.7,
      "TD":26,
      "Composite":2.04
   },
   "51":{
      "FG":19.4,
      "TD":26.4,
      "Composite":2.11
   },
   "52":{
      "FG":18.3,
      "TD":26.3,
      "Composite":2.17
   },
   "53":{
      "FG":27.6,
      "TD":25.4,
      "Composite":2.23
   },
   "54":{
      "FG":22.3,
      "TD":23.6,
      "Composite":2.29
   },
   "55":{
      "FG":22.6,
      "TD":22.6,
      "Composite":2.36
   },
   "56":{
      "FG":23.2,
      "TD":26.3,
      "Composite":2.42
   },
   "57":{
      "FG":26.1,
      "TD":24.6,
      "Composite":2.49
   },
   "58":{
      "FG":22.4,
      "TD":27.4,
      "Composite":2.54
   },
   "59":{
      "FG":22.5,
      "TD":31.5,
      "Composite":2.6
   },
   "60":{
      "FG":22.3,
      "TD":31.5,
      "Composite":2.66
   },
   "61":{
      "FG":26.3,
      "TD":25.5,
      "Composite":2.72
   },
   "62":{
      "FG":21.3,
      "TD":35.1,
      "Composite":2.78
   },
   "63":{
      "FG":24.5,
      "TD":38,
      "Composite":2.84
   },
   "64":{
      "FG":32.7,
      "TD":29.2,
      "Composite":2.9
   },
   "65":{
      "FG":27.9,
      "TD":36.3,
      "Composite":2.96
   },
   "66":{
      "FG":32.7,
      "TD":30.2,
      "Composite":3.03
   },
   "67":{
      "FG":35.3,
      "TD":20.2,
      "Composite":3.1
   },
   "68":{
      "FG":31,
      "TD":40,
      "Composite":3.17
   },
   "69":{
      "FG":35.1,
      "TD":33.1,
      "Composite":3.24
   },
   "70":{
      "FG":35.2,
      "TD":32.8,
      "Composite":3.32
   },
   "71":{
      "FG":39.2,
      "TD":32.4,
      "Composite":3.39
   },
   "72":{
      "FG":36.1,
      "TD":35.5,
      "Composite":3.47
   },
   "73":{
      "FG":29.2,
      "TD":39.6,
      "Composite":3.55
   },
   "74":{
      "FG":36.6,
      "TD":35.2,
      "Composite":3.63
   },
   "75":{
      "FG":38,
      "TD":38,
      "Composite":3.71
   },
   "76":{
      "FG":35.1,
      "TD":43.5,
      "Composite":3.79
   },
   "77":{
      "FG":43.3,
      "TD":41.1,
      "Composite":3.86
   },
   "78":{
      "FG":32.7,
      "TD":40,
      "Composite":3.94
   },
   "79":{
      "FG":37.2,
      "TD":46.9,
      "Composite":4.01
   },
   "80":{
      "FG":31.4,
      "TD":41,
      "Composite":4.08
   },
   "81":{
      "FG":37.3,
      "TD":46.1,
      "Composite":4.14
   },
   "82":{
      "FG":41.3,
      "TD":37.6,
      "Composite":4.21
   },
   "83":{
      "FG":39.8,
      "TD":40.8,
      "Composite":4.27
   },
   "84":{
      "FG":31.1,
      "TD":53.3,
      "Composite":4.22
   },
   "85":{
      "FG":40.2,
      "TD":36.6,
      "Composite":4.39
   },
   "86":{
      "FG":40.2,
      "TD":44.3,
      "Composite":4.44
   },
   "87":{
      "FG":38.8,
      "TD":42.5,
      "Composite":4.5
   },
   "88":{
      "FG":31.8,
      "TD":50.6,
      "Composite":4.57
   },
   "89":{
      "FG":26.2,
      "TD":59.5,
      "Composite":4.65
   },
   "90":{
      "FG":33.3,
      "TD":50,
      "Composite":4.74
   },
   "91":{
      "FG":35,
      "TD":40,
      "Composite":4.83
   },
   "92":{
      "FG":25.4,
      "TD":61,
      "Composite":4.94
   },
   "93":{
      "FG":34.7,
      "TD":57.1,
      "Composite":5.08
   },
   "94":{
      "FG":25,
      "TD":72.5,
      "Composite":5.22
   },
   "95":{
      "FG":14.6,
      "TD":72.9,
      "Composite":5.37
   },
   "96":{
      "FG":26.7,
      "TD":56.7,
      "Composite":5.51
   },
   "97":{
      "FG":14,
      "TD":74.4,
      "Composite":5.66
   },
   "98":{
      "FG":10.3,
      "TD":74.4,
      "Composite":5.81
   },
   "99":{
      "FG":11.5,
      "TD":80.8,
      "Composite":5.96
   },
   "100": {
      "FG": 0,
      "TD": 100,
      "Composite": 7
   }
}

   return {
      data: data,
      get: function (yds) {
         if(!data[yds]) console.log(yds, "is not valid");
         var probFG = data[yds].FG;
         var probTD = probFG+data[yds].TD;
         var rand = Randomizer.getRandomInt(0, 100);

         if(rand <= probFG) return "FG";
         if(rand > probFG && rand <= probTD) return "TD";

         return false;
      }
   };
});


