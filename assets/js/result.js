// Gunakan satu kunci yang konsisten: 'cbtUser'
const userData = JSON.parse(localStorage.getItem('cbtUser'));
const hasilPG = JSON.parse(localStorage.getItem('hasilPG'));
const hasilCase = JSON.parse(localStorage.getItem('hasilCase'));

// Validasi data
if (!userData) {
  alert('Data user tidak ditemukan, silakan login kembali');
  window.location.href = '/cbt-web-app/index.html';
}

// 1. MENAMPILKAN NAMA (Pastikan ID di HTML adalah 'namaPeserta')
if (document.getElementById('namaPeserta')) {
  document.getElementById('namaPeserta').innerText = `${userData.nama} (${userData.kelas})`;
}

// 2. UPDATE SKOR PG
if (hasilPG) {
  const nilaiAngka = hasilPG.nilai || 0;
  
  // Update teks skor
  if(document.getElementById('nilai')) document.getElementById('nilai').innerText = nilaiAngka;
  if(document.getElementById('benar')) document.getElementById('benar').innerText = hasilPG.benar;
  if(document.getElementById('total')) document.getElementById('total').innerText = hasilPG.total;

  // UPDATE RING SKOR SECARA DINAMIS
  const ringElement = document.querySelector('.ring');
  if (ringElement) {
    // Mengubah background conic-gradient sesuai nilai
    ringElement.style.background = `conic-gradient(#22c55e 0% ${nilaiAngka}%, rgba(255,255,255,.15) ${nilaiAngka}%)`;
  }

  // Status Lulus
  const statusEl = document.getElementById('status');
  if(statusEl) {
    statusEl.innerText = nilaiAngka >= 75 ? '✅ LULUS PG' : '❌ BELUM LULUS PG';
  }
}

// Fungsi Export PDF (Sudah disamakan kuncinya)
function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(14);
  doc.text('HASIL UJIAN CBT', 20, y);
  y += 10;

  // Gunakan 'userData' yang sudah diambil di atas
  doc.setFontSize(11);
  doc.text(`Nama: ${userData?.nama || '-'}`, 20, y); y += 6;
  doc.text(`Kelas: ${userData?.kelas || '-'}`, 20, y); y += 10;

  if (hasilPG) {
    doc.text('Pilihan Ganda', 20, y); y += 6;
    doc.text(`Nilai: ${hasilPG.nilai}`, 25, y); y += 10;
  }
  
  doc.save(`hasil_${userData?.nama || 'peserta'}.pdf`);
}
