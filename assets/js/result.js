const user = JSON.parse(localStorage.getItem('cbtUser'));
const hasil = JSON.parse(localStorage.getItem('hasilPG'));

console.log('USER:', user);
console.log('HASIL:', hasil);

if (!user || !hasil) {
  alert('Data hasil tidak ditemukan. Silakan ulangi ujian.');
  window.location.href = '/cbt-web-app/index.html';
}

// TAMPILKAN USER
document.getElementById('namaPeserta').innerText =
  `${user.nama} (${user.kelas})`;

// TAMPILKAN NILAI
document.getElementById('benar').innerText = hasil.benar;
document.getElementById('total').innerText = hasil.total;
document.getElementById('nilai').innerText = hasil.nilai;

// STATUS
document.getElementById('status').innerText =
  hasil.nilai >= 75 ? '✅ LULUS' : '❌ BELUM LULUS';

// CHART
const ctx = document.getElementById('chartNilai');

new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Benar', 'Salah'],
    datasets: [{
      data: [hasil.benar, hasil.total - hasil.benar]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});

function kembali() {
  window.location.href = '/cbt-web-app/pages/dashboard.html';
}
