/* =========================
   CEK LOGIN
========================= */
const user = JSON.parse(localStorage.getItem('cbtUser'));

if (!user) {
  window.location.href = '/cbt-web-app/index.html';
}

/* =========================
   PILIH MAPEL
========================= */
let selectedMapel = null;

function pilihMapel(mapel) {
  selectedMapel = mapel;

  document
    .querySelectorAll('.mapel')
    .forEach(el => el.classList.remove('active'));

  const aktif = [...document.querySelectorAll('.mapel')]
    .find(el => el.innerText.toLowerCase().includes(mapel));

  if (aktif) aktif.classList.add('active');
}

/* =========================
   MULAI UJIAN
========================= */
function mulaiUjian() {
  if (!selectedMapel) {
    alert('Pilih mata pelajaran terlebih dahulu');
    return;
  }

  const tipe = document.querySelector('input[name="tipe"]:checked');

  if (!tipe) {
    alert('Pilih tipe ujian');
    return;
  }

  localStorage.setItem('mapel', selectedMapel);

  if (tipe.value === 'pg') {
    window.location.href = '/cbt-web-app/pages/exam-pg.html';
  } else {
    window.location.href = '/cbt-web-app/pages/exam-case.html';
  }
}

/* =========================
   REKAP HASIL
========================= */
const rekap = document.getElementById('rekap');
let teks = [];

const hasilPG = JSON.parse(localStorage.getItem('hasilPG'));
if (hasilPG) {
  teks.push(`PG: Nilai ${hasilPG.nilai}`);
}

const hasilCase = JSON.parse(localStorage.getItem('hasilCase'));
if (hasilCase) {
  teks.push(`Studi Kasus: ${hasilCase.jenis}`);
}

if (rekap) {
  rekap.innerText = teks.length
    ? teks.join(' | ')
    : 'Belum ada hasil';
}
