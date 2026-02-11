/* ===============================
   CONFIG
================================ */
const JUMLAH_SOAL = 50;
const DURASI = 120 * 60; // detik

/* ===============================
   STATE (PERSISTENT)
================================ */
let soal = [];
let index = parseInt(localStorage.getItem('pg_index')) || 0;
let jawaban = JSON.parse(localStorage.getItem('pg_jawaban')) || [];
let startTime = localStorage.getItem('pg_startTime');

/* ===============================
   PARAMETER
================================ */
const mapel = localStorage.getItem('mapel') || 'mapel';
const paket = localStorage.getItem('paket') || 'paket1';

/* ===============================
   FULLSCREEN HANDLER
================================ */
function requestFullscreen() {
  const el = document.documentElement;
  if (el.requestFullscreen) el.requestFullscreen();
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  else if (el.msRequestFullscreen) el.msRequestFullscreen();
}

document.addEventListener('click', () => {
  if (!document.fullscreenElement) requestFullscreen();
}, { once: true });

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    alert('Ujian harus dalam mode layar penuh!');
    requestFullscreen();
  }
});

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
   INIT START TIME (ANTI RESET)
================================ */
if (!startTime) {
  startTime = Date.now();
  localStorage.setItem('pg_startTime', startTime);
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

    /* ===============================
       🔥 SIMPAN DATA UNTUK REVIEW PG
       (DITAMBAHKAN DI SINI)
    ================================ */
    localStorage.setItem(
  'pg_soal',
  JSON.stringify(soal.map(s => String(s.q)))
);
     localStorage.setItem(
  'pg_opsi',
  JSON.stringify(
    soal.map(s => s.opsi.map(o => o.text))
  )
);
    localStorage.setItem(
      'pg_kunci',
      JSON.stringify(soal.map(s => s.kunci))
    );

    /* =============================== */

    initGrid();
    tampilSoal();
  });


/* ===============================
   TIMER REAL + WARNING
================================ */
let warning10 = false;
let warning5 = false;

setInterval(() => {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const sisa = DURASI - elapsed;

  if (sisa <= 0) {
    selesaiUjian(true);
    return;
  }

  if (sisa <= 600 && !warning10) {
    alert('⏰ Waktu tersisa 10 menit!');
    warning10 = true;
  }

  if (sisa <= 300 && !warning5) {
    alert('⏰ Waktu tersisa 5 menit!');
    warning5 = true;
  }

  const m = String(Math.floor(sisa / 60)).padStart(2, '0');
  const s = String(sisa % 60).padStart(2, '0');
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
   JAWAB (AUTO SAVE)
================================ */
function pilih(i) {
  jawaban[index] = i;
  localStorage.setItem('pg_jawaban', JSON.stringify(jawaban));

  document.querySelectorAll('.soal-grid button')[index]
    .classList.add('answered');

  if (index === soal.length - 1) {
    document.getElementById('btnSelesai').disabled = false;
  }
}

/* ===============================
   NAVIGASI (SAVE INDEX)
================================ */
function nextSoal() {
  if (index < soal.length - 1) {
    index++;
    localStorage.setItem('pg_index', index);
    tampilSoal();
  }
}

function prevSoal() {
  if (index > 0) {
    index--;
    localStorage.setItem('pg_index', index);
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
      localStorage.setItem('pg_index', index);
      tampilSoal();
    };
    if (jawaban[i] !== undefined) {
      b.classList.add('answered');
    }
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

  const hasil = {
    benar,
    total: soal.length,
    nilai: Math.round((benar / soal.length) * 100)
  };

  localStorage.setItem('hasilPG', JSON.stringify(hasil));
  localStorage.setItem('pg_done', 'true');

  document.exitFullscreen?.();
  window.location.href = '/cbt-web-app/pages/result.html';
}
