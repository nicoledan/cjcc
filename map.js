//Data source from DC Open Data
// UNCOMMENT BELOW TO FIX MAP //
// var wardGeoJsonUrl = "https://opendata.arcgis.com/datasets/0ef47379cbae44e88267c01eaec2ff6e_31.geojson"; //
//Replace with your own token
var accessToken = "pk.eyJ1Ijoibmljb2xlZGFuIiwiYSI6ImNpdmpwbnlwNTAxZGQyemxiejRkbDF4YWcifQ.mgWMXU8eZ31iIydjN1I6NA";
//sets map functions including turning off the standard zoom buttons
//and setting intial map focus point
var map = L.map('map', {
    center: [38.8929, -77.0252],
    zoom: 12,
    zoomControl: false
});
//Create map and load basemap tile layer
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    maxZoom: 17,
    minZoom: 9,
    accessToken: accessToken
}).addTo(map);
// Add our zoom control manually where we want to
var zoomControl = L.control.zoom({
    position: 'bottomleft'
});
map.addControl(zoomControl);
//set style of ward layer
function style(feature) {
    return {
        weight: 2,
        opacity: 0.8,
        color: 'blue',
        fillOpacity: 0.2
    };
}
//Add DC Ward geojson to map
$.getJSON(wardGeoJsonUrl, function (data) {
    var geojson = L.geoJson(data, {
        style: style,
        onEachFeature: function (feature, layer) {
            //create popup for each ward polygon
            layer.bindPopup(feature.properties.NAME + "<br>" + "Rep. " + feature.properties.REP_NAME + "," + "<br>" + feature.properties.REP_PHONE)
        }
    });
    geojson.addTo(map);
});
//open About This panel
function openAbout() {
    $("#about").show();
    return false;
}
//close About This panel
function closeAbout() {
    $("#about").hide();
    return false;
}
