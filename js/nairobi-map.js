
(function () {
  function initializeNairobiMap() {
    const mapElement = document.getElementById("nairobiDeliveryMap");

    if (!mapElement || typeof L === "undefined") {
      return;
    }

    // Prevent duplicate initialization.
    if (mapElement.dataset.mapInitialized === "true") {
      return;
    }

    mapElement.dataset.mapInitialized = "true";

    // Centre the map on Nairobi CBD.
    const map = L.map("nairobiDeliveryMap", {
      center: [-1.2864, 36.8172],
      zoom: 11,
      minZoom: 9,
      maxZoom: 19,
      scrollWheelZoom: true,
      zoomControl: true
    });

    // Real map tiles from OpenStreetMap.
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    // Approximate neighbourhood reference points.
    // These are not verified delivery boundaries.
    const areas = [
      {
        name: "Nairobi CBD",
        coords: [-1.2864, 36.8172]
      },
      {
        name: "Westlands",
        coords: [-1.2676, 36.8108]
      },
      {
        name: "Parklands",
        coords: [-1.2580, 36.8170]
      },
      {
        name: "Kilimani",
        coords: [-1.2921, 36.7830]
      },
      {
        name: "Kileleshwa",
        coords: [-1.2770, 36.7820]
      },
      {
        name: "Lavington",
        coords: [-1.2760, 36.7670]
      },
      {
        name: "Karen",
        coords: [-1.3190, 36.7070]
      },
      {
        name: "Runda",
        coords: [-1.2140, 36.8050]
      },
      {
        name: "Gigiri",
        coords: [-1.2320, 36.8060]
      },
      {
        name: "Roysambu",
        coords: [-1.2200, 36.8830]
      },
      {
        name: "Kasarani",
        coords: [-1.2220, 36.8970]
      },
      {
        name: "Embakasi",
        coords: [-1.3160, 36.9000]
      },
      {
        name: "South C",
        coords: [-1.3220, 36.8240]
      },
      {
        name: "Lang'ata",
        coords: [-1.3550, 36.7470]
      },
      {
        name: "Ngong Road",
        coords: [-1.3000, 36.7650]
      }
    ];

    areas.forEach(function (area) {
      L.marker(area.coords)
        .addTo(map)
        .bindPopup(
          "<strong>" + area.name + "</strong><br>" +
          "Contact Amarah Farms to confirm delivery availability."
        );
    });

    // Add a custom reset button.
    const ResetControl = L.Control.extend({
      options: {
        position: "topright"
      },

      onAdd: function () {
        const button = L.DomUtil.create(
          "button",
          "leaflet-bar"
        );

        button.type = "button";
        button.title = "Return to Nairobi overview";
        button.setAttribute("aria-label", "Reset map view");
        button.textContent = "⌂";

        button.style.width = "36px";
        button.style.height = "36px";
        button.style.background = "#ffffff";
        button.style.color = "#087d4d";
        button.style.border = "none";
        button.style.cursor = "pointer";
        button.style.fontSize = "23px";

        L.DomEvent.disableClickPropagation(button);

        L.DomEvent.on(button, "click", function () {
          map.setView([-1.2864, 36.8172], 11);
        });

        return button;
      }
    });

    map.addControl(new ResetControl());

    // Ensure correct dimensions when the section becomes visible.
    setTimeout(function () {
      map.invalidateSize();
    }, 200);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeNairobiMap
    );
  } else {
    initializeNairobiMap();
  }
})();

