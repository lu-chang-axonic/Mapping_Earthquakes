console.log("Step 1 working");

var greenmap = L.tileLayer(
 "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
 {
   attribution:
     "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
   tileSize: 512,
   maxZoom: 18,
   zoomOffset: -1,
   id: "mapbox/streets-v11",
   accessToken: API_KEY
 }
);
// We create the map object with options.
var map = L.map("mapid", {
 center: [
    39.5, -98.5 ],
 zoom: 3,
 //layers:[Street]
});
// Then we add our 'graymap' tile layer to the map.
//greenmap.addTo(map);

//  Add a marker to the map for Los Angeles, California.
//let marker = L.marker([34.0522, -118.2437]).addTo(map);

//Get data from cities.js
// let cityData=cities;

//   // Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
//     console.log(city)
//     L.circleMarker(city.location,{
//         radius:city.population/100000,
//         color:'purple',
//         fillCollar:'#ffffa1'
//     })
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//     .addTo(map);
//    });

//  L.circleMarker([34.0522, -118.2437], {
//     radius:300,
//     color:"black",
//     fillCollor:'#ffffa1'
//  }).addTo(map);

// Coordinates for each point to be used in the line.
let line = [
    [33.9416, -118.4085],
    [37.6213, -122.3790],
    [40.7899, -111.9791],
    [47.4502, -122.3088]
  ];

  // Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
    color: "red"
  }).addTo(map);

// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection",
// "features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// Grabbing our GeoJSON data.

// L.geoJson(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//       console.log(feature);
//       return L.marker(latlng)
//       .bindPopup("<h2>" + feature.properties.city + "</h2>");
//     }
// }).addTo(map);

// //onEach Function
// let coordinateData= sanFranAirport.features[0].geometry.coordinates;
// console.log(coordinateData);

// L.geoJson(sanFranAirport, {
//     onEachFeature: function(feature, layer) {
//       console.log(layer);
//       let marker = L.marker([coordinateData[1],coordinateData[0]]);
//         layer.bindPopup("<h2>" + "Airport code: " + feature.properties.faa+ "</h2> <hr> <h3> " + feature.properties.name + "</h3>");
//      }
// }).addTo(map);

// Accessing the airport GeoJSON URL
let earthData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grabbing our GeoJSON data.
d3.json(earthData).then(function(data) {
    console.log(data);

    // This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
    function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // This function determines the color of the circle based on the magnitude of the earthquake.
    function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }
    // This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }
  // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        color:"#ffffa1",
        weight:2,
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
          },
          // We set the style for each circleMarker using our styleInfo function.
          style:styleInfo,
          // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
          onEachFeature: function(feature, layer) {
            layer.bindPopup(
              "Maginitude: "
                + feature.properties.mag
                + "<br>Location: "
                + feature.properties.place);
          }
        }).addTo(earthquakes);

//Then we add the earthquake layer to our map.
        earthquakes.addTo(map);

});






//We create the dark view tile layer that will be an option for our map.
var dark = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/dark-v10",
      accessToken: API_KEY
    }
   );

// Create a base layer that holds both maps.
let baseMaps = {
    Street: greenmap,
    Dark: dark
  };


// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
    Earthquakes: earthquakes
  };


  // Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);


// Create a legend control object.
let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend.
legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    const magnitudes = [0, 1, 2, 3, 4, 5];
const colors = [
  "#98ee00",
  "#d4ee00",
  "#eecc00",
  "#ee9c00",
  "#ea822c",
  "#ea2c2c"
];

// Looping through our intervals to generate a label with a colored square for each interval.
for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
 }
  return div;
};

legend.addTo(map);

  

