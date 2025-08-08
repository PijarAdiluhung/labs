/* --- Load ERAS data from external JSON file --- */
let ERAS = {};

async function loadErasData() {
  try {
    const response = await fetch("eras.json");
    if (!response.ok) throw new Error("Failed to load eras.json");
    ERAS = await response.json();
    // After loading, re-run the logic that depends on ERAS
    initializeEras();
  } catch (e) {
    alert("Could not load eras.json: " + e.message);
  }
}

// Initialize legend buttons and default era after ERAS is loaded
function initializeEras() {
  const erasListEl = document.getElementById("erasList");
  erasListEl.innerHTML = "";
  let activeEraKey = null;
  Object.keys(ERAS).forEach((key, idx) => {
    const era = ERAS[key];
    const btn = document.createElement("div");
    btn.className = "era-btn";
    btn.dataset.key = key;
    btn.innerHTML = `<div class="era-dot" style="background:${era.color}"></div>
                                         <div style="flex:1"><strong style="font-size:13px">${era.title}</strong><div style="font-size:12px;color:#666">${era.places.length} place(s)</div></div>`;
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".era-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      showEra(key);
    });
    erasListEl.appendChild(btn);
    // activate first era by default
    if (idx === 0) {
      btn.classList.add("active");
      activeEraKey = key;
      setTimeout(() => showEra(key), 200);
    }
  });
}

// Call loadErasData on startup
loadErasData();

/* ---------- Map setup ---------- */
const map = L.map("map", { preferCanvas: true }).setView([27.0, 33.0], 4);
let currentInfoControl = null;

// OpenStreetMap tiles (default)
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
  {
    attribution: "&copy; CartoDB",
  }
).addTo(map);

/* Layers holder so we can clear and add */
let currentLayerGroup = L.layerGroup().addTo(map);
let currentDecorators = [];

/* Utility: clear previous era visuals */
function clearCurrent() {
  currentLayerGroup.clearLayers();
  currentDecorators.forEach((d) => {
    if (d && d.remove) d.remove();
  });
  currentDecorators = [];
}

/* Create legend buttons dynamically */
const erasListEl = document.getElementById("erasList");
let activeEraKey = null;
Object.keys(ERAS).forEach((key, idx) => {
  const era = ERAS[key];
  const btn = document.createElement("div");
  btn.className = "era-btn";
  btn.dataset.key = key;
  btn.innerHTML = `<div class="era-dot" style="background:${era.color}"></div>
                   <div style="flex:1"><strong style="font-size:13px">${era.title}</strong><div style="font-size:12px;color:#666">${era.places.length} place(s)</div></div>`;
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".era-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    showEra(key);
  });
  erasListEl.appendChild(btn);
  // activate first era by default
  if (idx === 0) {
    btn.classList.add("active");
    activeEraKey = key;
    setTimeout(() => showEra(key), 200);
  }
});

/* Legend toggle */
const legendEl = document.getElementById("legend");
const legendToggle = document.getElementById("legendToggle");

legendToggle.addEventListener("click", () => {
  legendEl.classList.toggle("collapsed");
});

/* Create numbered DivIcon */
function makeNumberedIcon(number, color) {
  const html = `<div class="num-marker" style="border-color:${color}; color:${color}">${number}</div>`;
  return L.divIcon({
    html,
    className: "",
    iconSize: [26, 26],
    iconAnchor: [13, 26],
  });
}

/* Draw an era */
function showEra(key) {
  clearCurrent();
  activeEraKey = key;
  const era = ERAS[key];
  if (!era) return;
  // build markers and polyline coordinates in chronological order
  const coords = [];
  era.places.forEach((p, i) => {
    coords.push([p.lat, p.lng]);
    const marker = L.marker([p.lat, p.lng], {
      icon: makeNumberedIcon(i + 1, era.color),
    });
    marker.addTo(currentLayerGroup);
    // small popup (quick)
    const popupHtml = `<div class="popup-title">${i + 1}. ${p.title}</div>
                       <div class="popup-date">${p.date || ""}</div>
                       <div style="font-size:13px">${p.short || ""}</div>
                       <div style="margin-top:8px"><button class="btn" style="padding:.35rem .6rem; border-radius:6px; background:${
                         era.color
                       }; color:#fff; border:none;" onclick="openModal('${key}','${
      p.id
    }')">More</button></div>`;
    marker.bindPopup(popupHtml, { maxWidth: 320 });

    // open popup on click and center a touch-friendly bit
    marker.on("click", () => {
      marker.openPopup();
    });
  });

  // draw polyline between points if more than one
  if (coords.length > 1) {
    const poly = L.polyline(coords, {
      color: era.color,
      weight: 3,
      opacity: 0.9,
    }).addTo(currentLayerGroup);
    // add arrowheads using polyline decorator
    try {
      const decorator = L.polylineDecorator(poly, {
        patterns: [
          {
            offset: 12,
            repeat: 40,
            symbol: L.Symbol.arrowHead({
              pixelSize: 8,
              polygon: false,
              pathOptions: { stroke: true, color: era.color },
            }),
          },
        ],
      }).addTo(map);
      currentDecorators.push(decorator);
    } catch (e) {
      // polyline decorator may not be available in some contexts - fail silently
      console.warn("polyline decorator error", e);
    }
    // fit bounds with padding
    map.fitBounds(poly.getBounds(), { padding: [60, 60] });
  } else if (coords.length === 1) {
    map.setView(coords[0], 6);
  }

  // add territory lines
  const judah = {
    type: "Feature",
    properties: { name: "Kingdom of Judah" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [35.21, 31.78],
          [35.25, 31.85],
          [35.35, 31.9],
          [35.4, 31.8],
          [35.21, 31.78],
        ],
      ],
    },
  };

  L.geoJSON(judah, {
    style: {
      color: "#2980b9",
      weight: 2,
      fillColor: "#3498db",
      fillOpacity: 0.3,
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.name);
    },
  }).addTo(map);

  // add a small legend entry at bottom of layer
  // Remove previous info control if it exists
  if (currentInfoControl) {
    map.removeControl(currentInfoControl);
    currentInfoControl = null;
  }
  const info = L.control({ position: "bottomleft" });
  info.onAdd = function () {
    const div = L.DomUtil.create("div", "era-info");
    div.style.background = "rgba(255,255,255,0.95)";
    div.style.padding = "6px 8px";
    div.style.borderRadius = "6px";
    div.style.boxShadow = "0 6px 18px rgba(10,20,30,0.12)";
    div.innerHTML = `<strong style="color:${era.color}">${era.title}</strong> <div style="font-size:12px;color:#444">${era.places.length} places — chronological route</div>`;
    return div;
  };
  info.addTo(map);
  currentInfoControl = info;
}

/* Modal logic - show richer contextual info */
const modalBackdrop = document.getElementById("modalBackdrop");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalImage = document.getElementById("modalImage");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

function openModal(eraKey, placeId) {
  const era = ERAS[eraKey];
  if (!era) return;
  const p = era.places.find((pp) => pp.id === placeId);
  if (!p) return;
  modalTitle.textContent = p.title;
  modalDate.textContent = p.date || "";
  if (p.image) {
    modalImage.src = p.image;
    modalImage.style.display = "block";
  } else {
    modalImage.style.display = "none";
  }
  modalBody.innerHTML = `<p style="margin-top:0">${p.long || p.short || ""}</p>
    <p style="font-size:13px;color:#444">Source notes: This map reflects classical Islamic narrative order. Coordinates are approximate anchors — you can refine locations in the data object.</p>
    <div style="margin-top:10px"><button class="btn btn-primary" onclick="closeModal()">Close</button></div>`;
  modalBackdrop.style.display = "flex";
  // stop map from panning when modal open on touch devices
  map.dragging.disable();
}

function closeModal() {
  modalBackdrop.style.display = "none";
  map.dragging.enable();
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (ev) => {
  if (ev.target === modalBackdrop) closeModal();
});

/* expose openModal globally so inline onclick in popup works */
window.openModal = openModal;
window.closeModal = closeModal;

/* Splash controls */
document.getElementById("enterBtn").addEventListener("click", () => {
  document.getElementById("splash").style.display = "none";
});
document.getElementById("howBtn").addEventListener("click", () => {
  alert(
    "To edit data: open this file in a text editor and edit the ERAS object near the top. Each era has a `places` array ordered chronologically. For each place give: id, title, lat, lng, date, short, long, image (optional)."
  );
});

/* Clean-up on load: if there is an active era, it was set earlier */
