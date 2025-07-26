let data;

fetch("gregorian_hijri_2025.json")
  .then((response) => response.json())
  .then((json) => {
    data = json;
    displayToday();
  });

function convertToHijri() {
  const gDate = document.getElementById("gregDate").value;

  // --- Sebelum Maghrib ---
  const resultToday = data.gregorian_to_hijri[gDate];

  // --- Setelah Maghrib ---
  const dateObj = new Date(gDate);
  dateObj.setDate(dateObj.getDate() + 1);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const gDateTomorrow = `${year}-${month}-${day}`;
  const resultTomorrow = data.gregorian_to_hijri[gDateTomorrow];

  let output = "";

  if (resultToday) {
    const [hy, hm, hd] = resultToday.split("-");
    const hijriToday = `${parseInt(hd)} ${namaBulanHijri[parseInt(hm)]} ${hy}`;
    output += `Sebelum Maghrib: ${hijriToday}\n`;
  } else {
    output += `Sebelum Maghrib: Tanggal tidak ditemukan.\n`;
  }

  if (resultTomorrow) {
    const [hy2, hm2, hd2] = resultTomorrow.split("-");
    const hijriTomorrow = `${parseInt(hd2)} ${
      namaBulanHijri[parseInt(hm2)]
    } ${hy2}`;
    output += `Setelah Maghrib: ${hijriTomorrow}`;
  } else {
    output += `Setelah Maghrib: Tanggal tidak ditemukan.`;
  }

  document.getElementById("output").innerText = output;
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
  2: "Shafar",
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

// Basic UI logic for tab switching
const tabAfter = document.getElementById("tabSetelahMaghrib");
const tabBefore = document.getElementById("tabSebelumMaghrib");

function activateBeforeMaghribTab() {
  tabBefore.classList.add("active", "active-before-maghrib");
  tabBefore.classList.remove("inactive-before-maghrib");

  tabAfter.classList.remove("active", "active-after-maghrib");
  tabAfter.classList.add("inactive-after-maghrib");

  displayToday();
}

function activateAfterMaghribTab() {
  tabAfter.classList.add("active", "active-after-maghrib");
  tabAfter.classList.remove("inactive-after-maghrib");

  tabBefore.classList.remove("active", "active-before-maghrib");
  tabBefore.classList.add("inactive-before-maghrib");

  displayTomorrow();
}

tabBefore.addEventListener("click", activateBeforeMaghribTab);
tabAfter.addEventListener("click", activateAfterMaghribTab);

async function checkIfAfterSunset(callback) {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    const { latitude, longitude, timezone } = data;

    const now = new Date(
      new Date().toLocaleString("en-US", { timeZone: timezone })
    );
    const times = SunCalc.getTimes(now, latitude, longitude);
    const sunset = times.sunset;

    if (now > sunset) {
      callback();
    } else {
      console.log(
        `Not yet sunset. Current time: ${now.toLocaleTimeString()}, Sunset time: ${sunset.toLocaleTimeString()}`
      );
    }
  } catch (err) {
    console.error("Sunset check failed:", err);
  }
}

// Run after page loads
window.onload = () => {
  checkIfAfterSunset(activateAfterMaghribTab);
};
