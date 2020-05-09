// store the json URL as variable jsonUrl
jsonUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// request data from URL using d3.json
d3.json(jsonUrl, function(data) {
    //send data.features object to the createFeatures function
    createFeatures(data.features);
});

// function to change marker size depending on magnitude
function markerSize(magnitude) {
    return magnitude * 25000;
};

// function to assign colors depending on mag value
function getColor(mag) {
    return mag > 5 ? '#ff0000':
        mag > 4 ? '#ff8000':
        mag > 3 ? '#ffbf00':
        mag > 2 ? '#ffff00':
        mag > 1 ? '#bfff00':
        '#00ff40';   
}


function createFeatures(earthquakeData) {
// lines 28-33 for map markers to test map is functioning properly and are commented out. 
// lines 36-53 for circles to scale based on magnitude
    // // define a function to run fo reach feature in features array
    // // give each feature a popup describing the time and place of earthquake
    // function onEachFeature(feature, layer) {
    //     layer.bindPopup("<h3>" + feature.properties.place +
    //     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    // }

    // create a geoJSON layer containing the features array on the earthquakeData object
    // run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        // give each feature a popup describing the place and time of the earthquake
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>" + "Magnitude: " + feature.properties.mag + "</h3><hr><h4>" + feature.properties.place + "</h4><hr><p>" + new Date(feature.properties.time) + "</p>");
        },
        // create markers depending on magnitudes
        pointToLayer: function(feature, latlng) {
            return new L.circle(latlng, {
                radius: markerSize(feature.properties.mag),
                fillColor: getColor(feature.properties.mag),
                fillOpacity: 0.5,
                color: 'red',
                weight: 0.5
            })
        }
    });

    // send earthquakes layer to createMap function
    createMap(earthquakes);
}

function createMap(earthquakes) {
    // define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
    });

    // define a baseMaps opbject to hold base layers
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap
    };

    // create overlay object to hold overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes
    };

    // create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [streetmap, earthquakes]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}