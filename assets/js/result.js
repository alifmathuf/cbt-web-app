const user = JSON.parse(localStorage.getItem('cbtUser'));
const hasilPG = JSON.parse(localStorage.getItem('hasilPG'));
const hasilCase = JSON.parse(localStorage.getItem('hasilCase'));

if (!user || (!hasilPG && !hasilCase)) {
  alert('Data hasil tidak ditemukan');
  window.location.href = '/cbt-web-app/index.html';
}

// USER
document.getElementById('namaPeserta').innerText =
  `${user.nama} (${user.kelas})`;

// ===== PG =====
if (hasilPG) {
  document.getElementById('benar').innerText = hasilPG.benar;
  document.getElementById('total').innerText = hasilPG.total;
  document.getElementById('nilai').innerText = hasilPG.nilai;
  document.getElementById('status').innerText =
    hasilPG.nilai >= 75 ? '✅ LULUS PG' : '❌ BELUM LULUS PG';

  const ctx = document.getElementById('chartNilai');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Benar', 'Salah'],
      datasets: [{
        data: [hasilPG.benar, hasilPG.total - hasilPG.benar]
      }]
    },
    options: {
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

// ===== STUDI KASUS =====
if (hasilCase) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <h3>Studi Kasus</h3>
    <p><b>Jenis:</b> ${hasilCase.jenis}</p>
    <p>Jawaban berhasil disimpan.</p>
  `;
  document.querySelector('.container').appendChild(div);
}

function kembali() {
  window.location.href = '/cbt-web-app/pages/dashboard.html';
}

function exportPDF() {
  alert('Export PDF akan diaktifkan di step berikutnya');
}
