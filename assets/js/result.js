const user = JSON.parse(localStorage.getItem('cbtUser'));
const hasil = JSON.parse(localStorage.getItem('hasilPG'));

if (!user || !hasil) {
  window.location.href = '/cbt-web-app/index.html';
}

// TAMPILKAN DATA
document.getElementById('namaPeserta').innerText =
  `${user.nama} (${user.kelas})`;

document.getElementById('benar').innerText = hasil.benar;
document.getElementById('total').innerText = hasil.total;
document.getElementById('nilai').innerText = hasil.nilai;

const status =
  hasil.nilai >= 75
    ? '✅ LULUS'
    : '❌ BELUM LULUS';

document.getElementById('status').innerText = status;

// CHART
const ctx = document.getElementById('chartNilai');

new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Benar', 'Salah'],
    datasets: [{
      data: [
        hasil.benar,
        hasil.total - hasil.benar
      ]
    }]
  },
  options: {
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});

function kembali() {
  window.location.href = '/cbt-web-app/pages/dashboard.html';
}
