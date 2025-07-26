let data;

fetch("gregorian_hijri_2025.json")
  .then((response) => response.json())
  .then((json) => {
    data = json;
    displayToday();
  });

function convertToHijri() {
  const gDate = document.getElementById("gregDate").value;
  const result = data.gregorian_to_hijri[gDate];

  if (result) {
    const [hy, hm, hd] = result.split("-");
    const output = `${parseInt(hd)} ${namaBulanHijri[parseInt(hm)]} ${hy}`;
    document.getElementById("output").innerText = `Tanggal Hijriah: ${output}`;
  } else {
    document.getElementById("output").innerText =
      "Tanggal tidak ditemukan (Hanya 2025).";
  }
}

function getLocalISODate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // e.g., 2025-07-25
}

function displayToday() {
  const today = new Date();
  const gToday = getLocalISODate(); // instead of toISOString().split('T')[0]
  const gLocale = today.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  document.getElementById("gregToday").innerText = gLocale;

  const hijri = data.gregorian_to_hijri[gToday];
  if (hijri) {
    const [hy, hm, hd] = hijri.split("-");
    document.getElementById("hijriToday").innerText = `${parseInt(hd)} ${
      namaBulanHijri[parseInt(hm)]
    } ${hy}`;
  } else {
    document.getElementById("hijriToday").innerText =
      "Tanggal Hijriah tidak ditemukan.";
  }
}

function displayTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Add 1 day

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");
  const gTomorrow = `${year}-${month}-${day}`;

  const hijri = data.gregorian_to_hijri[gTomorrow];
  if (hijri) {
    const [hy, hm, hd] = hijri.split("-");
    document.getElementById("hijriToday").innerText = `${parseInt(hd)} ${
      namaBulanHijri[parseInt(hm)]
    } ${hy}`;
  } else {
    document.getElementById("hijriToday").innerText =
      "Tanggal Hijriah tidak ditemukan.";
  }
}


const namaBulanHijri = {
  1: "Muharram",
  2: "Safar",
  3: "Rabi'ul Awal",
  4: "Rabi'ul Akhir",
  5: "Jumadil Awal",
  6: "Jumadil Akhir",
  7: "Rajab",
  8: "Sya'ban",
  9: "Ramadhan",
  10: "Syawwal",
  11: "Dzulqa'dah",
  12: "Dzulhijjah",
};

// Basic UI logic for tab switching (can be expanded with actual date logic later)
document
  .getElementById("tabSebelumMaghrib")
  .addEventListener("click", function () {
    this.classList.add("active", "active-before-maghrib");
    this.classList.remove("inactive-before-maghrib");
    document
      .getElementById("tabSetelahMaghrib")
      .classList.remove("active", "active-after-maghrib");
    document
      .getElementById("tabSetelahMaghrib")
      .classList.add("inactive-after-maghrib");
    displayToday(); // Refresh the display for "Sebelum Maghrib"
  });

document
  .getElementById("tabSetelahMaghrib")
  .addEventListener("click", function () {
    this.classList.add("active", "active-after-maghrib");
    this.classList.remove("inactive-after-maghrib");
    document
      .getElementById("tabSebelumMaghrib")
      .classList.remove("active", "active-before-maghrib");
    document
      .getElementById("tabSebelumMaghrib")
      .classList.add("inactive-before-maghrib");
    displayTomorrow(); // Refresh the display for "Setelah Maghrib"
  });

