// Initialize variables
let tasbih = 0;
const tasbihDisplay = document.getElementById("tasbih-count");
const tasbihAddButton = document.getElementById("tasbih-add");
const tasbihResetButton = document.getElementById("tasbih-reset");
const savedTasbih = localStorage.getItem("savedCount");
const sound = document.getElementById("tap-sound");

// Get local storage
if (savedTasbih !== null) {
  tasbihDisplay.textContent = Number(savedTasbih);
  tasbih = Number(savedTasbih);
} else {
  tasbih = 0;
}

// Function to add and reset, with updating local storage
function tasbihAdd() {
  if ("vibrate" in navigator) {
    navigator.vibrate(200);
  } else {
    if (sound) {
        sound.play().catch(e => console.warn("Audio play failed", e));
    }
  }
  tasbih = tasbih + 1;
  tasbihDisplay.textContent = tasbih;
  localStorage.setItem("savedCount", tasbih);
}
function tasbihReset() {
  if ("vibrate" in navigator) {
        navigator.vibrate(500); 
  } else {
    if (sound) sound.play().catch(e => console.warn("Audio fallback failed", e));
  }
  tasbih = 0;
  tasbihDisplay.textContent = tasbih;
  localStorage.setItem("savedCount", 0);
}

// Add event listeners to buttons
tasbihAddButton.addEventListener("click", tasbihAdd);
tasbihResetButton.addEventListener("click", tasbihReset);
