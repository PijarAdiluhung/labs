let data;

fetch('gregorian_hijri_2025.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    displayToday();
  });

function convertToHijri() {
  const gDate = document.getElementById("gregDate").value;
  const result = data.gregorian_to_hijri[gDate];

  if (result) {
    const [hy, hm, hd] = result.split('-');
    const output = `${parseInt(hd)} ${namaBulanHijri[parseInt(hm)]} ${hy}`;
    document.getElementById("output").innerText = `Tanggal Hijriah: ${output}`;
  } else {
    document.getElementById("output").innerText = "Tanggal tidak ditemukan (Hanya 2025).";
  }
}

function displayToday() {
  const today = new Date();
  const gToday = today.toISOString().split('T')[0];
  const gLocale = today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  document.getElementById("gregToday").innerText = gLocale;

  const hijri = data.gregorian_to_hijri[gToday];
  if (hijri) {
    const [hy, hm, hd] = hijri.split('-');
    document.getElementById("hijriToday").innerText = `${parseInt(hd)} ${namaBulanHijri[parseInt(hm)]} ${hy}`;
  } else {
    document.getElementById("hijriToday").innerText = "Tanggal Hijriah tidak ditemukan.";
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
  12: "Dzulhijjah"
};
