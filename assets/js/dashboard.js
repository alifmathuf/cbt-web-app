/* =========================
   CEK LOGIN
========================= */
const user = JSON.parse(localStorage.getItem('cbtUser'));

if (!user) {
  window.location.href = '/cbt-web-app/index.html';
}

/* =========================
   GREETING & USER INFO
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

  greetingEl.innerText = `Assalaamualaikum, selamat ${waktu}`;
}

/* =========================
   PILIH MAPEL (DARI BOX)
========================= */
let selectedMapel = null;

function pilihMapel(mapel) {
  selectedMapel = mapel;
  localStorage.setItem('mapel', mapel);

  // efek aktif pada box mapel
  document.querySelectorAll('.mapel-box').forEach(btn => {
    btn.classList.remove('active');
  });

  const activeBtn = [...document.querySelectorAll('.mapel-box')]
    .find(b => b.textContent.toLowerCase().includes(mapel));

  if (activeBtn) activeBtn.classList.add('active');
}

/* =========================
   MULAI UJIAN
========================= */
function mulaiUjian() {
  const tipe = document.querySelector('input[name="tipe"]:checked');

  if (!selectedMapel) {
    alert('Pilih mata pelajaran terlebih dahulu');
    return;
  }

  if (!tipe) {
    alert('Pilih tipe ujian');
    return;
  }

  if (tipe.value === 'pg') {
    window.location.href = '/cbt-web-app/pages/exam-pg.html';
  } else {
    window.location.href = '/cbt-web-app/pages/exam-case.html';
  }
}

/* =========================
   REKAP HASIL TERAKHIR
========================= */
const hasilPG = JSON.parse(localStorage.getItem('hasilPG'));
const hasilCase = JSON.parse(localStorage.getItem('hasilCase'));
const rekap = document.getElementById('rekap');

if (rekap) {
  let teks = '';

  if (hasilPG) {
    teks += `PG: Nilai ${hasilPG.nilai}`;
  }

  if (hasilCase) {
    teks += `${teks ? ' | ' : ''}Studi Kasus selesai`;
  }

  rekap.innerText = teks || 'Belum ada hasil';
}
const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
const tbody = document.getElementById('leaderboardData');

if (leaderboard.length) {
  tbody.innerHTML = '';
  leaderboard
    .sort((a, b) => b.nilai - a.nilai)
    .slice(0, 5)
    .forEach((d, i) => {
      tbody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${d.nama}</td>
          <td>${d.nilai}</td>
        </tr>
      `;
    });
}
const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
const tbody = document.getElementById('leaderboardData');

if (leaderboard.length) {
  tbody.innerHTML = '';
  leaderboard
    .sort((a, b) => b.nilai - a.nilai)
    .slice(0, 5)
    .forEach((d, i) => {
      tbody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${d.nama}</td>
          <td>${d.nilai}</td>
        </tr>
      `;
    });
}
