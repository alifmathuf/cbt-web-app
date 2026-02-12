let selectedMapel = null;
let selectedPaket = null;
let selectedTipe = null;

function pilihMapel(mapel, el) {
  selectedMapel = mapel;

  document.querySelectorAll(".mapel-grid button")
    .forEach(b => b.classList.remove("active"));
  el.classList.add("active");

  nextStep(2);
}

function pilihPaket(p, el) {
  selectedPaket = "paket" + p;

  document.querySelectorAll(".paket-grid button")
    .forEach(b => b.classList.remove("active"));
  el.classList.add("active");

  nextStep(3);
}

function pilihTipe(tipe, el) {
  selectedTipe = tipe;

  document.querySelectorAll(".tipe-grid button")
    .forEach(b => b.classList.remove("active"));
  el.classList.add("active");

  // Jika Studi Kasus → skip paket
  if (tipe === "case") {
    selectedPaket = null;
  }
}

function nextStep(step) {
  document.querySelectorAll(".step")
    .forEach(s => s.classList.remove("active"));
  document.getElementById("step" + step)
    .classList.add("active");

  document.querySelectorAll(".step-panel")
    .forEach(p => p.classList.add("hidden"));

  if (step === 2) {
    document.getElementById("panel-paket").classList.remove("hidden");
  }
  if (step === 3) {
    document.getElementById("panel-tipe").classList.remove("hidden");
  }
}

function mulaiUjian() {
  if (!selectedMapel || !selectedTipe) {
    alert("Lengkapi pilihan terlebih dahulu.");
    return;
  }

  localStorage.setItem("mapel", selectedMapel);
  localStorage.setItem("paket", selectedPaket);
  localStorage.setItem("tipe", selectedTipe);

  if (selectedTipe === "pg") {
    window.location.href = "/cbt-web-app/pages/exam-pg.html";
  } else {
    window.location.href = "/cbt-web-app/pages/exam-case.html";
  }
}
