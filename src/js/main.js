// var paywall = require("./lib/paywall");
// setTimeout(() => paywall(12345678), 5000);

require("component-responsive-frame/child");
require("component-leaflet-map");

var data = require("../../data/buildings.sheet.json"),
	search_el = document.querySelector("#search-bar"),
	map_el = document.querySelector("leaflet-map"),
	L = map_el.leaflet,
	map = map_el.map;

var search = function() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search-bar");
  filter = input.value.toUpperCase(),
  table = document.getElementById("table"),
  tr = table.getElementsByTagName("tr");
  // dots = map_el.getElements;

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
  }

  // Look through all dots; hide those that don't match search query

}

data.forEach(function(d) {
	if (d.latitutde != 0 && d.purchase_amount != 0) {
		var circle = L.circle([d.latitude, d.longitude], {
				fillColor: "#333333",
				fillOpacity: 0.6,
				radius: 300,
				stroke: false
			})
			.addTo(map);
	}
});

search_el.addEventListener("keyup", search);