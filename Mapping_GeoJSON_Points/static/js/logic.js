// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets, 
    Dark: dark
};

// Create the map boject with center, zoom level and default layer. 
let map = L.map('mapid', {
    center:[30,30],
    zoom: 2, 
    layers: [streets]
})

// pass our map layers into our layers control and add teh layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Add GeoJSON data.
let airportData = "https://raw.githubusercontent.com/aikopsidas/Mapping_Earthquakes/main/majorAirports.json";

// grabbing our GeoJSON data
d3.json(airportData).then(function(data){
    console.log(data);
// creating a geoJSON layer with the retrieved data.
L.geoJSON(data, ).addTo(map);
});