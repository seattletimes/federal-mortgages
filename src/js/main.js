// var paywall = require("./lib/paywall");
// setTimeout(() => paywall(12345678), 5000);

require("component-responsive-frame/child");
require("component-leaflet-map");

var data = require("../../data/buildings.sheet.json"),
	search_el = document.querySelector("#search-bar"),
	map_el = document.querySelector("leaflet-map"),
	L = map_el.leaflet,
	map = map_el.map;

var financing_classes = {
	"Financed with an FHA-insured loan": "fha",
	"Financed with a Fannie Mae-guaranteed loan": "fannie",
	"Financed with a Freddie Mac-guaranteed loan": "freddie",
	"Federally subsidized": "subsidized"
};

data.forEach(function(d) {
	var icon = L.divIcon({className: 'map-dot'});
	var marker = L.marker([d.latitude, d.longitude], {
		icon: icon
	}).addTo(map);

	// var popup_content = "<p><strong>" + d.building_name + "</strong></p>" + 
	// 	"<p>" + d.address + "</p>";
	// marker.bindPopup(popup_content).openPopup();

	// marker._icon.classList.add(financing_classes[d.financing]);
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
    dot_text = dot.dataset.building + " " + dot.dataset.address;
    if (dot_text.toUpperCase().indexOf(filter) > -1) {
    	dot.style.display = ""
    } else {
    	dot.style.display = "none";
    }
  }
}

search_el.addEventListener("keyup", search);