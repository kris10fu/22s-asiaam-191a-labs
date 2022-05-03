// declare variables
let mapOptions = {'center': [34.052235,-118.243683],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,Location,message,message2){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${Location}</h2> <h3>${message}</h3> <h3>${message2}</h3>`)
    return message
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
        addMarker(data.lat,data.lng,data.Location,data.Diversity, data.Inclusion)
    })
}

loadData(dataUrl)


