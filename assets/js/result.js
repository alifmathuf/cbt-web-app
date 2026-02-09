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



function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 20;

  const user = JSON.parse(localStorage.getItem('user'));
  const hasilPG = JSON.parse(localStorage.getItem('hasilPG'));
  const hasilCase = JSON.parse(localStorage.getItem('hasilCase'));
  const soalPG = JSON.parse(localStorage.getItem('soalPG'));

  doc.setFontSize(14);
  doc.text('LAPORAN HASIL UJIAN CBT', 20, y); y += 10;

  doc.setFontSize(11);
  doc.text(`Nama: ${user.nama}`, 20, y); y += 6;
  doc.text(`Kelas: ${user.kelas}`, 20, y); y += 10;

  // ===== PG =====
  if (hasilPG && soalPG) {
    doc.text('A. PILIHAN GANDA', 20, y); y += 8;

    soalPG.forEach((s, i) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(`${i + 1}. ${s.q}`, 20, y); y += 6;

      s.o.forEach((opsi, idx) => {
        const prefix = idx === s.userAnswer ? '→ ' : '   ';
        doc.text(`${prefix}${String.fromCharCode(65 + idx)}. ${opsi}`, 25, y);
        y += 5;
      });

      y += 4;
    });
  }

  // ===== STUDI KASUS =====
  if (hasilCase) {
    doc.addPage();
    y = 20;

    doc.text('B. STUDI KASUS', 20, y); y += 8;
    doc.text(`Jenis: ${hasilCase.jenis}`, 20, y); y += 8;

    hasilCase.jawaban.forEach((j, i) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(`Jawaban ${i + 1}:`, 20, y); y += 6;
      doc.text(doc.splitTextToSize(j, 170), 20, y);
      y += 20;
    });
  }

  doc.save(`ujian_${user.nama}.pdf`);
}

  if (hasilPG) {
    doc.text('Pilihan Ganda', 20, y); y += 6;
    doc.text(`Nilai: ${hasilPG.nilai}`, 25, y); y += 10;
  }

  if (hasilCase) {
    let kata = 0;
    let karakter = 0;

    hasilCase.jawaban.forEach(t => {
      karakter += t.length;
      kata += t.trim().split(/\s+/).filter(Boolean).length;
    });

    doc.text('Studi Kasus', 20, y); y += 6;
    doc.text(`Jenis: ${hasilCase.jenis}`, 25, y); y += 6;
    doc.text(`Total Kata: ${kata}`, 25, y); y += 6;
    doc.text(`Total Karakter: ${karakter}`, 25, y);
  }

  doc.save(`hasil_${user?.nama || 'peserta'}.pdf`);
}
