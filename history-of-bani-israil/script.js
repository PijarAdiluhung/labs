/*
          Data model:
          ERAS = {
            "eraKey": {
              title: "Title shown in legend",
              color: "#hex",
              places: [
                { id: "ib1", title: "Ur of the Chaldees (example)", lat: 37. ..., lng: 44., date: "c. 2000 BCE", short: "Short blurb", long: "Long contextual note", image: "optional-url" }
              ]
            }
          }
          NOTE: coordinates used here are example anchors (Mecca, Harran, Canaan, Egypt, Jerusalem...) — adapt to your historical choices.
        */
          

const ERAS = {
  ibrahim: {
    title: "Ibrāhīm — Ismā‘īl — Isḥāq Era",
    color: "#c0392b",
    places: [
      {
        id: "ur",
        title: "Ur (traditional)",
        lat: 36.0,
        lng: 43.0,
        date: "c. 2000 BCE (approx.)",
        short: "Birthplace (traditional tradition)",
        long: "Ur — traditionally cited in Islamic and classical sources as the birthplace of Ibrāhīm. Exact historic location debated.",
        image: "",
      },
      {
        id: "harran",
        title: "Harran",
        lat: 36.861,
        lng: 39.017,
        date: "early life",
        short: "Family moved to Harran",
        long: "Harran is where the family is said to have migrated in many classical accounts. Some narratives place Ibrāhīm's confrontation with idolatry there.",
        image: "",
      },
      {
        id: "mecca",
        title: "Makkah (Mecca)",
        lat: 21.4225,
        lng: 39.8262,
        date: "Later life / pilgrimage",
        short: "Ibrāhīm visits and builds the Ka'bah with Ismā‘īl",
        long: "In Islamic tradition Ibrāhīm and Ismā‘īl rebuild the Ka'bah in Makkah; many rituals trace to their acts.",
        image: "",
      },
    ],
  },

  yaqub: {
    title: "Ya‘qūb — Yūsuf Era",
    color: "#f39c12",
    places: [
      {
        id: "cana",
        title: "Canaan (ancient)",
        lat: 31.5,
        lng: 35.0,
        date: "patriarchal period",
        short: "Ancestral homeland",
        long: "Land of the patriarchs — region where Ya‘qūb (Jacob) and his sons lived.",
        image: "",
      },
      {
        id: "beersheba",
        title: "Beersheba",
        lat: 31.252,
        lng: 34.791,
        date: "later patriarchal period",
        short: "Ya‘qūb travels and dwells",
        long: "Important patriarchal city in many Islamic narratives.",
        image: "",
      },
      {
        id: "egypt",
        title: "Egypt (land of Yūsuf)",
        lat: 26.8206,
        lng: 30.8025,
        date: "Yūsuf in Egypt",
        short: "Yūsuf rises to power in Egypt",
        long: "Yūsuf's time in Egypt is a major narrative — his interpretation of dreams, rise to vizier, and the family's migration.",
        image: "",
      },
    ],
  },

  between_yusuf_musa: {
    title: "Between Yūsuf and Mūsā — Settlement & Prosperity in Egypt",
    color: "#27ae60",
    places: [
      {
        id: "egypt-settle",
        title: "Egypt — settlement of Bani Isrā'īl",
        lat: 26.0,
        lng: 31.5,
        date: "after Yūsuf",
        short: "Growth in Egypt",
        long: "The descendants of Yūsuf settle and multiply in Egypt until changes in kingship lead to oppression.",
        image: "",
      },
    ],
  },

  musa: {
    title: "Mūsā — Hārūn Era",
    color: "#2980b9",
    places: [
      {
        id: "midian",
        title: "Midian (Madyan)",
        lat: 28.456,
        lng: 35.321,
        date: "Mūsā's exile and life",
        short: "Mūsā flees to Madyan",
        long: "Mūsā's flight to Madyan, marriage there, and return as a prophet to Pharaoh.",
        image: "",
      },
      {
        id: "nile",
        title: "Egypt — Court of Pharaoh",
        lat: 30.0444,
        lng: 31.2357,
        date: "Confrontation with Pharaoh",
        short: "Mūsā confronts Pharaoh",
        long: "The confrontation, signs, and the Exodus are central events.",
        image: "",
      },
      {
        id: "sinai",
        title: "Mount Ṭūr / Sinai",
        lat: 28.539,
        lng: 33.975,
        date: "Revelation / Taurat",
        short: "Mūsā receives revelation",
        long: "Mount Sinai / Ṭūr is where Mūsā receives the Taurat in Islamic tradition.",
        image: "",
      },
    ],
  },

  judges: {
    title: "Between Mūsā and Dāwūd — Judges",
    color: "#8e44ad",
    places: [
      {
        id: "canaan-judges",
        title: "Canaan (period of Judges)",
        lat: 31.8,
        lng: 35.2,
        date: "judges era",
        short: "Local leaders (judges)",
        long: "Periods of local judges and leaders before monarchy established by Ṣaul, then Dāwūd.",
        image: "",
      },
    ],
  },

  saul_david_solomon: {
    title: "Ṣaul — Dāwūd — Sulaymān (Saul, David, Solomon)",
    color: "#d35400",
    places: [
      {
        id: "gilboa",
        title: "Mount Gilboa / Israel",
        lat: 32.5,
        lng: 35.4,
        date: "monarchy founding",
        short: "Early monarchy",
        long: "Landmarks connected to early monarchy and key battles.",
        image: "",
      },
      {
        id: "jerusalem",
        title: "Bayt al-Maqdis / Jerusalem",
        lat: 31.7683,
        lng: 35.2137,
        date: "Dāwūd & Sulaymān",
        short: "Dāwūd establishes Jerusalem",
        long: "Dāwūd establishes Jerusalem as center; Sulaymān builds temple (in non-Islamic sources) — in Islamic tradition Sulaymān is favored and endowed with wisdom.",
        image: "",
      },
    ],
  },

  after_solomon: {
    title: "After Sulaymān — Kingdom splits, Prophetic activity",
    color: "#7f8c8d",
    places: [
      {
        id: "north-split",
        title: "Northern kingdom (Israel)",
        lat: 32.0,
        lng: 35.3,
        date: "post-Sulaymān",
        short: "Kingdom splits",
        long: "Political divide into northern and southern entities with prophets addressed to each.",
        image: "",
      },
      {
        id: "south-juda",
        title: "Judah (south)",
        lat: 31.7,
        lng: 35.2,
        date: "post-Sulaymān",
        short: "Southern kingdom",
        long: "The line of Dāwūd continued in the south until the exile.",
        image: "",
      },
    ],
  },

  leading_exile: {
    title: "Leading up to the Exile",
    color: "#2c3e50",
    places: [
      {
        id: "decline",
        title: "Decline & exile pressures",
        lat: 31.9,
        lng: 35.2,
        date: "centuries before exile",
        short: "Decline due to idolatry & politics",
        long: "Classical Islamic sources discuss decline caused by turning away from commandments, leading to conquest and exile.",
        image: "",
      },
    ],
  },

  exile_postexile: {
    title: "Exile and Post-Exile",
    color: "#16a085",
    places: [
      {
        id: "babylon",
        title: "Babylon (exile)",
        lat: 32.54,
        lng: 44.42,
        date: "Exile period",
        short: "Deportation to Babylon",
        long: "Exile of elite to Babylonic courts — a period of test and return in many accounts.",
        image: "",
      },
      {
        id: "return",
        title: "Return / Post-exile settlements",
        lat: 31.8,
        lng: 35.2,
        date: "Post-exile",
        short: "Return to homeland",
        long: "Return under permission of foreign rulers; rebuilding and reforms follow in later centuries.",
        image: "",
      },
    ],
  },

  eesa: {
    title: "‘Īsā (Eesa) — later period",
    color: "#9b59b6",
    places: [
      {
        id: "bethlehem",
        title: "Bethlehem / Nazareth region",
        lat: 31.705,
        lng: 35.202,
        date: "c. 1st century CE",
        short: "Birth / upbringing region",
        long: "Birth and upbringing region in later Judeo-Christian-Islamic narratives.",
        image: "",
      },
      {
        id: "galilee",
        title: "Galilee",
        lat: 32.7,
        lng: 35.3,
        date: "Ministry",
        short: "Ministry of ‘Īsā",
        long: "Place of many events associated with ‘Īsā's ministry in Islamic sources as well.",
        image: "",
      },
    ],
  },
};

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
  "type": "Feature",
  "properties": { "name": "Kingdom of Judah" },
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[35.21, 31.78], [35.25, 31.85], [35.35, 31.90], [35.40, 31.80], [35.21, 31.78]]]
  }
};

L.geoJSON(judah, {
  style: {
    color: "#2980b9",
    weight: 2,
    fillColor: "#3498db",
    fillOpacity: 0.3
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.name);
  }
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
