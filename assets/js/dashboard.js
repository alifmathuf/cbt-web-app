/* =========================
   CEK LOGIN
========================= */
const user = JSON.parse(localStorage.getItem('cbtUser'));
if (!user) {
  window.location.href = '/cbt-web-app/index.html';
}

/* =========================
   GREETING & USER INFO + AVATAR
========================= */
const userInfo = document.getElementById('userInfo');
const greetingEl = document.getElementById('greeting');

if (userInfo) {
  userInfo.innerText = `${user.nama} (${user.kelas})`;
}

if (greetingEl) {
  const hour = new Date().getHours();
  let waktu = 'pagi';
  if (hour >= 12 && hour < 15) waktu = 'siang';
  else if (hour >= 15 && hour < 18) waktu = 'sore';
  else if (hour >= 18 || hour < 6) waktu = 'malam';

  greetingEl.innerText = `Assalaamu'alaikum selamat ${waktu}`;
}

/* =========================
   PILIH MAPEL
========================= */
let selectedMapel = null;
let selectedPaket = null;

function pilihMapel(mapel) {
  selectedMapel = mapel;
  selectedPaket = null;

  localStorage.setItem('mapel', mapel);
  localStorage.removeItem('paket');

  document.querySelectorAll('.mapel-box')
    .forEach(btn => btn.classList.remove('active'));

  event.target.closest('.mapel-box')
    .classList.add('active');

  document.querySelectorAll('.paket-box')
    .forEach(btn => btn.classList.remove('active'));
}

/* =========================
   PILIH PAKET
========================= */
async function pilihPaket(p) {
  if (!selectedMapel) {
    alert("Silakan pilih Mapel terlebih dahulu.");
    return;
  }

  const paketName = `paket${p}`;
  const filePath = `/cbt-web-app/data/${selectedMapel}/${paketName}.json`;

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error("File tidak ditemukan");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error("Data kosong");
    }

    // Jika sampai sini berarti valid
    selectedPaket = paketName;
    localStorage.setItem('paket', selectedPaket);

    document.querySelectorAll('.paket-box')
      .forEach(btn => btn.classList.remove('active'));

    event.target.closest('.paket-box')
      .classList.add('active');

  } catch (error) {
    alert(".");
  }
}

/* =========================
   MULAI UJIAN
========================= */
function mulaiUjian() {
  const tipe = document.querySelector('input[name="tipe"]:checked');

  if (!selectedMapel || !selectedPaket || !tipe) {
    alert("Silakan pilih Mapel, Paket Soal, dan Tipe Ujian terlebih dahulu.");
    return;
  }

  const konfirmasi = confirm(
    `Anda akan mengerjakan:\n\nMapel: ${selectedMapel.toUpperCase()}\nPaket: ${selectedPaket}\nTipe: ${tipe.value.toUpperCase()}\n\nUjian tidak dapat diulang.\nLanjutkan?`
  );

  if (!konfirmasi) return;

  if (tipe.value === 'pg') {
    window.location.href = '/cbt-web-app/pages/exam-pg.html';
  } else {
    window.location.href = '/cbt-web-app/pages/exam-case.html';
  }
}
