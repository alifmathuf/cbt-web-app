/* ===============================
   CONFIG
================================ */
const DURASI = 30 * 60; // 30 menit
const MIN_KATA = 150;

/* ===============================
   DATA KASUS (4 MACAM)
================================ */
const kasus = [
  {
    judul: 'Kasus Media Pembelajaran',
    desc: 'Jelaskan kasus nyata terkait penggunaan media pembelajaran di kelas.'
  },
  {
    judul: 'Kasus Strategi Pembelajaran',
    desc: 'Jelaskan kasus nyata terkait strategi pembelajaran yang diterapkan.'
  },
  {
    judul: 'Kasus LKPD',
    desc: 'Jelaskan kasus nyata terkait penyusunan atau penggunaan LKPD.'
  },
  {
    judul: 'Kasus Penilaian',
    desc: 'Jelaskan kasus nyata terkait sistem penilaian pembelajaran.'
  }
];

/* ===============================
   STATE
================================ */
let index = 0;
let waktu = DURASI;
let jawaban = Array(4).fill(null).map(() => ({
  j1: '', j2: '', j3: '', j4: ''
}));

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
   RENDER
================================ */
function render() {
  const k = kasus[index];

  document.getElementById('judulKasus').innerText =
    `${k.judul} (${index + 1}/4)`;

  document.getElementById('deskripsiKasus').innerText = k.desc;

  document.getElementById('jawab1').value = jawaban[index].j1;
  document.getElementById('jawab2').value = jawaban[index].j2;
  document.getElementById('jawab3').value = jawaban[index].j3;
  document.getElementById('jawab4').value = jawaban[index].j4;

  updateProgress();
}

render();

/* ===============================
   SIMPAN JAWABAN
================================ */
function simpan() {
  jawaban[index] = {
    j1: jawab1.value,
    j2: jawab2.value,
    j3: jawab3.value,
    j4: jawab4.value
  };
}

/* ===============================
   VALIDASI 150 KATA
================================ */
function hitungKata(teks) {
  return teks.trim().split(/\s+/).filter(Boolean).length;
}

function validKasus(data) {
  return (
    hitungKata(data.j1) >= MIN_KATA &&
    hitungKata(data.j2) >= MIN_KATA &&
    hitungKata(data.j3) >= MIN_KATA &&
    hitungKata(data.j4) >= MIN_KATA
  );
}

/* ===============================
   NAVIGASI
================================ */
function nextKasus() {
  simpan();
  if (index < 3) {
    index++;
    render();
  }
  cekSelesai();
}

function prevKasus() {
  simpan();
  if (index > 0) {
    index--;
    render();
  }
}

/* ===============================
   PROGRESS
================================ */
function updateProgress() {
  const selesai = jawaban.filter(validKasus).length;
  document.getElementById('progressText').innerText =
    `${selesai} / 4`;
  document.getElementById('progressFill').style.width =
    `${(selesai / 4) * 100}%`;
}

function cekSelesai() {
  const semua = jawaban.every(validKasus);
  document.getElementById('btnSelesai').disabled = !semua;
}

/* ===============================
   SELESAI
================================ */
function selesaiUjian(auto = false) {
  simpan();

  if (!auto) {
    if (!confirm('Yakin ingin menyelesaikan studi kasus?')) return;
  }

  if (!jawaban.every(validKasus)) {
    alert('Semua jawaban harus minimal 150 kata.');
    return;
  }

  localStorage.setItem('hasilCase', JSON.stringify(jawaban));
  window.location.href = '/cbt-web-app/pages/result.html';
}
