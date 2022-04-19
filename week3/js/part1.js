// declare the map
const map = L.map('the_map').setView([34.0709,-118.444], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

addMarker(34.039982,-118.452782,'Sawtelle','I love going to Sawtelle for the good Asian food')
addMarker(34.0357676437259, -118.53591863096922,'Will Rogers State Beach','I like going to this beach with my friends to just chill and hang out')
addMarker(34.024573513630024, -118.39379590896647,'Salt and Straw','I often go to this ice cream shop to try out the new flavors each month')
addMarker(34.11167077799467, -118.51032214271287,'Westridge-Canyonback Wilderness Park','This is a nice hiking trail with really great views of the city')

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    createButtons(lat,lng,title);
    return message
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); 
    })
    document.getElementById("contents").appendChild(newButton); 
}
