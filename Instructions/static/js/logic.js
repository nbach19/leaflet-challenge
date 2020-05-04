// store the json URL as variable jsonUrl
jsonUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// request data from URL using d3.json
d3.json(jsonUrl, function(data) {
    //send data.features object to the createFeatures function
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    // define a function to run fo reach feature in features array
    // give each feature a popup describing the time and place of earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    // create a geoJSON layer containing the features array on the earthquakeData object
    // run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

    // send earthquakes layer to createMap function
    createMap(earthquakes);
}

function createMap(earthquakes) {
    // define streetmap and darkmap layers
    var streetmap = L.titleLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken = API_KEY
    });

    var darkmap = L.titleLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken = API_KEY
    });
}