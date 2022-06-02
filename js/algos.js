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

  const grenobleLatitude  = 	45.188529;
  const grenobleLongitude = 	5.724524;

  return  getDistanceFromLatLonInKm(grenobleLatitude, grenobleLongitude, city.latitude, city.longitude);
}

// Swap 2 values in array csvData
// i is the index of the first city
// j is the index of the second city
function swap(i,j) {
  displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)

  let k;

  k = csvData[j];
  csvData[j] = csvData[i];
  csvData[i] = k;
}

// Returns true if city with index i in csvData is closer to Grenoble than city with index j
// i is the index of the first city
// j is the index of the second city
function isLess(i, j) {
  displayBuffer.push(['compare', i, j]); // Do not delete this line (for display)

  if(csvData[i].dist < csvData[j].dist) {
    return true;
  }
  return false;
}

// -----------------------------------


function insertsort() {
  console.log("insertsort - ");

  for(let i = 1; i < csvData.length; i++) {
    let j = i;
    let k = j - 1;

    while(k >= 0 && isLess(j, k)) {
      swap(k, j);
      j--;
      k--;
    }
  }
}

// -----------------------------------

function selectionsort() {
  console.log("selectionsort - ");

  for (let i = 0; i < csvData.length - 1; i++) {
       let min = csvData[i];
       let iMin = i;

       for(let j = i + 1; j < csvData.length; j++) {
         if(isLess(j, iMin)) {
           min = csvData[j];
           iMin = j;
         }
       }
       swap(iMin, i)
  }
}

// -----------------------------------

function bubblesort(city) {
  console.log("bubblesort - ");

  let i, j;

  // isLess(1, 2);
  // swap(1, 2);
  for(i = 0; i < csvData.length - 1; i++) {
    for(j = i + 1; j < csvData.length; j++) {
      if(isLess(j, i)) {
        swap(i, j);
      }
    }
  }
}

// -----------------------------------

function shellsort() {
  console.log("shellsort - ");

  gaps = [1, 4, 10, 23, 57, 132, 301, 701];

  for(let sizeIndex = gaps.length-1; sizeIndex >= 0; sizeIndex--) {
    let gap = gaps[sizeIndex];

    for (let i = gap; i < csvData.length; i++) {

      let j = i;
      let k = j - gap;

      while(k >= 0 && isLess(j, k)) {
        swap(k, j);
        j = j - gap;
        k = k - gap;
      }
    }
  }

}

// -----------------------------------

function mergesort(start= 0, length = N) { // tri par fusion
  // console.log("mergesort - ");

  if(length > 1) {
    let half = Math.floor(length / 2); // Pour pouvoir gérer les array avec un nombre de cellules impaire

    mergesort(start, half);
    mergesort(start + half, length - half);

    merge(start, start + half, length);
  }
}

function merge(first, second, length) {
  // first = first number of first array part
  // second = first number of second array part
  let firstEmptyPart = first === second;
  let secondEmptyPart = second - first === length;

  if(firstEmptyPart || secondEmptyPart) {
    console.log("End")
    return;
  }

  if(isLess(first, second)) {
    console.log("isLess")
    merge(first + 1, second, length - 1);
  }

  else {
    console.log("Second > first !")
    // Move csvData[second] to csvData[first] by swapping (décalle tout le reste du tableau)
    for(let i = second; i >= first + 1; i--) {
      swap(i, i - 1);
    }
    merge(first + 1, second + 1, length - 1);
  }
}

// -----------------------------------

function heapsort() { // tri par tas
  console.log("heapsort - implement me !"); // TODO
}

// -----------------------------------

function quicksort(first = 0, last = csvData.length - 1) { // tri rapide
  //console.log("quicksort - ");

  if(first<last) {
    const pivot = partition(first, last, selectPivot(first, last));
    quicksort(first, pivot-1);
    quicksort(pivot+1, last);
  }
}

function selectPivot(first, last) {
  return last;
}

function partition(first, last, pivot) {
  swap(pivot, last);
  j = first;

  for(let i = first; i < last; i++) {
    if(isLess(i, last)) {
      swap(i, j);
      j++;
    }
  }
  swap(last, j);
  return j;
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
