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
    function onEachFEature(feature, layer) {
        
    }
}
