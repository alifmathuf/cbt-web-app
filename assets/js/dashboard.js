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
