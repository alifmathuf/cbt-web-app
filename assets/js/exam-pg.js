/* ===============================
   CONFIG
================================ */
const JUMLAH_SOAL = 50;
const DURASI = 120 * 60; // 120 menit

/* ===============================
   STATE
================================ */
let soal = [];
let index = 0;
let jawaban = [];
let waktu = DURASI;

/* ===============================
   AMBIL PARAMETER
================================ */
const mapel = localStorage.getItem('mapel') || 'qurdist';
const paket = localStorage.getItem('paket') || 'paket1';

/* ===============================
   UTIL
================================ */
function shuffle(arr) {
  return arr
    .map(v => ({ v, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(x => x.v);
}

/* ===============================
   LOAD SOAL
================================ */
fetch(`/cbt-web-app/data/${mapel}/${paket}.json`)
  .then(r => r.json())
  .then(data => {
    soal = shuffle(data).slice(0, JUMLAH_SOAL).map(s => {
      const opsi = shuffle(
        s.o.map((text, i) => ({ text, i }))
      );

      return {
        q: s.q,
        opsi,
        kunci: opsi.findIndex(x => x.i === s.a)
      };
    });

    initGrid();
    tampilSoal();
  });

/* ===============================
   TIMER
================================ */
setInterval(() => {
  waktu--;
  if (waktu <= 0) selesaiUjian(true);

  const m = String(Math.floor(waktu / 60)).padStart(2, '0');
  const s = String(waktu % 60).padStart(2, '0');
  document.getElementById('timer').innerText = `${m}:${s}`;
}, 1000);

/* ===============================
   RENDER SOAL
================================ */
function tampilSoal() {
  const s = soal[index];
  document.getElementById('noSoal').innerText = `Soal ${index + 1}`;
  document.getElementById('pertanyaan').innerText = s.q;

  const wrap = document.getElementById('opsi');
  wrap.innerHTML = '';

  s.opsi.forEach((o, i) => {
    wrap.innerHTML += `
      <label>
        <input type="radio" name="opsi"
          ${jawaban[index] === i ? 'checked' : ''}
          onchange="pilih(${i})">
        ${o.text}
      </label>`;
  });

  updateProgress();
}

/* ===============================
   JAWAB
================================ */
function pilih(i) {
  jawaban[index] = i;
  document.querySelectorAll('.soal-grid button')[index]
    .classList.add('answered');

  if (index === soal.length - 1) {
    document.getElementById('btnSelesai').disabled = false;
  }
}

/* ===============================
   NAVIGASI
================================ */
function nextSoal() {
  if (index < soal.length - 1) {
    index++;
    tampilSoal();
  }
}

function prevSoal() {
  if (index > 0) {
    index--;
    tampilSoal();
  }
}

/* ===============================
   GRID
================================ */
function initGrid() {
  const grid = document.getElementById('soalGrid');
  grid.innerHTML = '';

  soal.forEach((_, i) => {
    const b = document.createElement('button');
    b.innerText = i + 1;
    b.onclick = () => {
      index = i;
      tampilSoal();
    };
    grid.appendChild(b);
  });
}

/* ===============================
   PROGRESS
================================ */
function updateProgress() {
  const done = jawaban.filter(v => v !== undefined).length;
  document.getElementById('progressText').innerText =
    `${done} / ${soal.length}`;
  document.getElementById('progressFill').style.width =
    `${(done / soal.length) * 100}%`;
}

/* ===============================
   SELESAI & SKOR
================================ */
function selesaiUjian(auto = false) {
  if (!auto && !confirm('Yakin ingin menyelesaikan ujian?')) return;

  let benar = 0;
  soal.forEach((s, i) => {
    if (jawaban[i] === s.kunci) benar++;
  });

  localStorage.setItem('hasilPG', JSON.stringify({
    benar,
    total: soal.length,
    nilai: Math.round((benar / soal.length) * 100)
  }));

  window.location.href = '/cbt-web-app/pages/result.html';
}
