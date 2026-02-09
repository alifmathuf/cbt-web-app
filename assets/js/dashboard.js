const user = JSON.parse(localStorage.getItem('cbtUser'));

if (!user) {
  // ABSOLUTE PATH (AMAN GITHUB PAGES)
  window.location.href = '/cbt-web-app/index.html';
}

document.getElementById('userInfo').innerText =
  `Halo, ${user.nama} (${user.kelas})`;

function mulaiUjian() {
  const mapel = document.getElementById('mapel').value;
  const tipe = document.querySelector('input[name="tipe"]:checked');

  if (!tipe) {
    alert('Pilih tipe ujian');
    return;
  }

  localStorage.setItem('mapel', mapel);

  if (tipe.value === 'pg') {
    window.location.href = '/cbt-web-app/pages/exam-pg.html';
  } else {
    window.location.href = '/cbt-web-app/pages/exam-case.html';
  }
}
const hasilPG = JSON.parse(localStorage.getItem('hasilPG'));
const hasilCase = JSON.parse(localStorage.getItem('hasilCase'));

const rekap = document.getElementById('rekap');

if (hasilPG) {
  rekap.innerText = `PG: Nilai ${hasilPG.nilai}`;
}

if (hasilCase) {
  rekap.innerText += ` | Studi Kasus: ${hasilCase.jenis}`;
}
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const greetEl = document.getElementById('greeting');

  if (greetEl && user) {
    greetEl.textContent = `${greetingByTime()}, ${user.nama}`;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const greet = document.getElementById('greeting');

  if (user && greet) {
    greet.textContent = `${greetingByTime()}, ${user.nama}`;
  }
});
