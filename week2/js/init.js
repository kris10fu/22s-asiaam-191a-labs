let zoomLevel=1.5;
const mapCenter=[51.507351, -0.127758];
const map=L.map('the_map').setView(mapCenter, zoomLevel);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 

//JavaScript let variable declaration to create a marker

function my_first_function(){
    console.log('hi from function')
}

my_first_function()

//add markers
function add_circlemarker(lat,lng, popup, photoname){
        L.circleMarker([lat, lng], {"radius": 8, "color": "#FC77B1", "weight": 3, "opacity": 1}).addTo(map).bindPopup(`<h3>${popup}</h3> 
        <img class="big" src=${photoname}>`)
}

add_circlemarker(41.902782,12.496365, 'Rome: I went to Rome with my family in 2019', 'images/rome.jpg')
add_circlemarker(35.689487,139.691711, 'Tokyo: I went to Tokyo with my friends after graduating from high school', 'images/tokyo.png')
add_circlemarker(37.774929,-122.419418, 'San Francisco: I recently went to San Francisco for spring break', 'images/sf.jpg')
add_circlemarker(51.507351,-0.127758, 'London: I went to London with my family in 2015', 'images/london.jpg')
add_circlemarker(34.341576,108.939774, 'Xian: I went to Xian in the summer of 2020', 'images/xian.jpg')
add_circlemarker(21.306944,-157.858337, 'Honolulu: I went to Honolulu with my family when I was little', 'images/honolulu.jpg')
