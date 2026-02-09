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

// ===== STUDI KASUS (RINGKAS) =====
if (hasilCase) {
  const wrap = document.getElementById('caseResult');

  let totalKata = 0;
  let totalKarakter = 0;

  hasilCase.jawaban.forEach(teks => {
    totalKarakter += teks.length;
    totalKata += teks.trim().split(/\s+/).filter(Boolean).length;
  });

  wrap.innerHTML = `
    <div class="card">
      <h3>Hasil Studi Kasus</h3>
      <p><b>Jenis:</b> ${hasilCase.jenis}</p>
      <p><b>Total Kata:</b> ${totalKata}</p>
      <p><b>Total Karakter:</b> ${totalKarakter}</p>
    </div>
  `;
}

function kembali() {
  window.location.href = '/cbt-web-app/pages/dashboard.html';
}

function exportPDF() {
  alert('Export PDF akan diaktifkan di step berikutnya');
}
