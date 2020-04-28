var map;
function setMap(zones) {
    //<- initialize()
	var roads = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'});

    map = L.map('map', {
		center: [-12.9, -69.5],
		zoom: 7,
		minZoom: 9,
		layers: [roads],
		maxBounds: ([
			[-10.2,-73.5],
			[-17.2, -65.5]
		])

	});
	var hybrid  = L.gridLayer.googleMutant({
		type: 'hybrid'
	}) // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'})
	var earth = L.gridLayer.googleMutant({
		type: 'satellite' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
    }).addTo(map)
    L.control.sideBySide(roads, earth).addTo(map); 
}
$(document).ready(setMap);