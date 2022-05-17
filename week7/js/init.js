// declare variables
let mapOptions = {'center': [34.052235,-118.243683],'zoom':5}

let badRating = L.featureGroup();
let goodRating = L.featureGroup();

let layers = {
    "Bad Rating": badRating,
    "Good Rating": goodRating
}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
});
Esri_WorldGrayCanvas.addTo(map);

L.control.layers(null,layers).addTo(map)

// create a function to add markers
function addMarker(data){
    if(data.Rating <= "5"){
        badRating.addLayer(L.circleMarker([data.lat,data.lng],
            {
                radius: 10,
                fillColor: "#ff5252",
                color: "#ff5252",
                weight: 3,
                opacity: 500,  
            }).addTo(map).bindPopup(`<h2>Bad Rating: ${data.Rating}</h2> <h2>${data.Location}</h2> <h3>${data.Diversity}</h3> <h3>${data.Inclusion}</h3>`
        )
        )
        createButtons(data.lat,data.lng,data.Location)
    } else{
        goodRating.addLayer(L.circleMarker([data.lat,data.lng],
            {
                radius: 10,
                fillColor: "#2e8b57",
                color: "#2e8b57",
                weight: 3,
                opacity: 500,
            }).addTo(map).bindPopup(`<h2>Good Rating: ${data.Rating}</h2>  <h2>${data.Location}</h2> <h3>${data.Diversity}</h3> <h3>${data.Inclusion}</h3>`))
        createButtons(data.lat,data.lng,data.Location)
    } 
    return   
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons'); //this adds the button to our page.
    spaceForButtons.appendChild(newButton);
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9W4iyzco7YwMKtYcsFrMYP3Rco--qwSQuA8qKjSTHnuSz3lCKSvo-3KINAYjS4PW-HKCUeigOg85c/pub?output=csv"

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
    })
    badRating.addTo(map)
    goodRating.addTo(map)
    let allLayers = L.featureGroup([badRating,goodRating]);
    map.fitBounds(allLayers.getBounds());
}

loadData(dataUrl)