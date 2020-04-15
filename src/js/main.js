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
});

var search = function() {
  var input, filter, table, tr, td, dot, i, txtValue;
  input = document.getElementById("search-bar");
  filter = input.value.toUpperCase(),
  table = document.getElementById("table"),
  tr = table.getElementsByTagName("tr"),
  map_dots = document.getElementsByClassName("map-dot");

  // Loop through all table rows; hide those that don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }

    dot = map_dots[i];
    dot_text = dot.dataset.building
    if (dot_text.toUpperCase().indexOf(filter) > -1) {
    	dot.style.display = ""
    } else {
    	dot.style.display = "none";
    }
  }
}

search_el.addEventListener("keyup", search);