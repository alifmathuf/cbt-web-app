const user = JSON.parse(localStorage.getItem('cbtUser'));

if (!user) {
  window.location.href = '../index.html';
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
    window.location.href = './exam-pg.html';
  } else {
    window.location.href = './exam-case.html';
  }
}
