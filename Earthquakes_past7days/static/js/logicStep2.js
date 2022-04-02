// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets, 
    "Satellite" : satelliteStreets
};

 
// Create the map boject with center, zoom level and default layer. 
let map = L.map('mapid', {
    center:[39.5,-98.5],
    zoom: 3, 
    layers: [streets]
});

// pass our map layers into our layers control and add teh layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Add GeoJSON data.
let earthQuakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// grabbing our GeoJSON data
d3.json(earthQuakeData).then(function(data) {
    console.log(data);
    function styleInfo(feature) {
        return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: "#ffae42",
          color: "#000000",
          radius: getRadius(feature.properties.mag),
          stroke: true,
          weight: 0.5
        };
      }
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }
// creating a geoJSON layer with the retrieved data.
L.geoJSON(data, {
 // We turn each feature into a circleMarker on the map.
   
    pointToLayer: function(feature, latlng) { 
        console.log(data);
        return L.circleMarker(latlng);
    }, 
     // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo
}).addTo(map);
});