// Converts from degrees to radians.
function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}


// Calculates the distance between Grenoble and the given city
function distanceFromGrenoble(city) {
  // console.log(city);
  const grenobleLatitude  = 	45.188529;
  const grenobleLongitude = 	5.724524;

  // debugger;

  // city.latitude;
  // city.longitude;
  // nom_commune
  // console.log(city.nom_commune + " : " + city.latitude + " / " + city.longitude);
  // console.log(distance + " km.");
  return distance = getDistanceFromLatLonInKm(grenobleLatitude, grenobleLongitude, city.latitude, city.longitude);
}

// Swap 2 values in array csvData
// i is the index of the first city
// j is the index of the second city
function swap(i,j) {
  displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)

  console.log("swap - implement me !");
}

// Returns true if city with index i in csvData is closer to Grenoble than city with index j
// i is the index of the first city
// j is the index of the second city
function isLess(i, j) {
  displayBuffer.push(['compare', i, j]); // Do not delete this line (for display)
  console.log("isLess - implement me !");
}

// -----------------------------------


function insertsort() {
  console.log("insertsort - implement me !");
}

// -----------------------------------

function selectionsort() {
  console.log("selectionsort - implement me !");
}

// -----------------------------------

function bubblesort() {
  console.log("bubblesort - implement me !");
}

// -----------------------------------

function shellsort() {
  console.log("shellsort - implement me !");
}

// -----------------------------------

function mergesort(start=0, length=N) {
  console.log("mergesort - implement me !");
}

// -----------------------------------

function heapsort() {
  console.log("heapsort - implement me !");
}

// -----------------------------------

function quicksort() {
  console.log("quicksort - implement me !");
  if(first<last) {
    const pivot = partition(first, last, selectPivot(first, last));
    quicksort(first, pivot-1);
    quicksort(pivot+1, last);
  }
}

// -----------------------------------

function sort(algo)
{
  console.time(algo)
  switch (algo)
  {
    case 'insert': insertsort();break;
    case 'select': selectionsort();break;
    case 'bubble': bubblesort();break;
    case 'shell': shellsort();break;
    case 'merge': mergesort();break;
    case 'heap': heapsort();break;
    case 'quick': quicksort();break;
    default: throw 'Invalid algorithm ' + algo;
  }
  console.timeEnd(algo);
  console.log("Comparaison : ", countOp("compare"));
  console.log("Permutation : ", countOp("swap"));
}

function countOp(opName) {
  return displayBuffer.reduce(
    (count, op) => (op[0]===opName? count+1 : count),
    0
  );
}
