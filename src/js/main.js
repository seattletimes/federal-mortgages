// var paywall = require("./lib/paywall");
// setTimeout(() => paywall(12345678), 5000);

require("component-responsive-frame/child");
require("component-leaflet-map");

var data = require("../../data/buildings.sheet.json"),
	search_el = document.querySelector("#search-bar"),
	map_el = document.querySelector("leaflet-map"),
	L = map_el.leaflet,
	map = map_el.map;

data.forEach(function(d) {
	var icon = L.divIcon({className: 'map-dot'});
	var marker = L.marker([d.latitude, d.longitude], {
		icon: icon
	}).addTo(map);

	marker._icon.dataset.building = d.building_name;
	marker._icon.dataset.address = d.address;
});

var search = function() {
  var input, filter, table, row, dot, i, txtValue;
  input = document.getElementById("search-bar");
  filter = input.value.toUpperCase(),
  table = document.getElementById("table"),
  rows = table.getElementsByClassName("building"),
  map_dots = document.getElementsByClassName("map-dot");

  // Loop through all table rows; hide those that don't match the search query
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    if (row) {
      txtValue = row.textContent || row.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }

    dot = map_dots[i];
    dot_text = dot.dataset.building + " " + dot.dataset.address
    if (dot_text.toUpperCase().indexOf(filter) > -1) {
    	dot.style.display = ""
    } else {
    	dot.style.display = "none";
    }
  }
}

search_el.addEventListener("keyup", search);