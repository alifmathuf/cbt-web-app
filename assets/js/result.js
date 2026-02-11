const { jsPDF } = window.jspdf;

const user = JSON.parse(localStorage.getItem('cbtUser'));
const hasilPG = JSON.parse(localStorage.getItem('hasilPG'));
const hasilCase = JSON.parse(localStorage.getItem('hasilCase'));

if (!user || (!hasilPG && !hasilCase)) {
    alert('Data hasil tidak ditemukan');
    window.location.href = '/cbt-web-app/index.html';
}

// ================= USER =================
document.getElementById('namaPeserta').innerText = `${user.nama} (${user.kelas})`;

// ================= PG =================
let statusPG = "-";

if (hasilPG) {
    document.getElementById('benar').innerText = hasilPG.benar;
    document.getElementById('total').innerText = hasilPG.total;
    document.getElementById('nilai').innerText = hasilPG.nilai;

    statusPG = hasilPG.nilai >= 75 ? '✅ LULUS PG' : '❌ BELUM LULUS PG';
    document.getElementById('status').innerText = statusPG;

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
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// ================= STUDI KASUS =================
let totalKata = 0;
let totalKarakter = 0;
let jenisCase = "-";

if (hasilCase) {
    const wrap = document.getElementById('caseResult');
    jenisCase = hasilCase.jenis;

    hasilCase.jawaban.forEach(teks => {
        totalKarakter += teks.length;
        totalKata += teks.trim().split(/\s+/).filter(Boolean).length;
    });

    wrap.innerHTML = `
        <div class="card result-card">
            <h3 class="section-title">Hasil Studi Kasus</h3>
            <p>Jenis Soal: <b>${jenisCase}</b></p>
            <p>Total Kata: <b>${totalKata}</b></p>
            <p>Total Karakter: <b>${totalKarakter}</b></p>
        </div>
    `;
}
// ================= NAVIGASI =================
function kembali() {
    window.location.href = '/cbt-web-app/pages/dashboard.html';
}

function lihatJawabanPG() {
    window.location.href = '/cbt-web-app/pages/review-pg.html';
}

// ================= EXPORT PDF =================
function exportPDF() {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(16);
    doc.text("HASIL UJIAN CBT", 20, y);

    y += 10;
    doc.setFontSize(12);
    doc.text(`Nama: ${user.nama}`, 20, y);
    y += 8;
    doc.text(`Kelas: ${user.kelas}`, 20, y);

    // ===== PG =====
    if (hasilPG) {
        y += 15;
        doc.setFontSize(14);
        doc.text("Hasil Pilihan Ganda", 20, y);

        y += 8;
        doc.setFontSize(12);
        doc.text(`Jawaban Benar: ${hasilPG.benar}`, 20, y);
        y += 8;
        doc.text(`Total Soal: ${hasilPG.total}`, 20, y);
        y += 8;
        doc.text(`Nilai: ${hasilPG.nilai}`, 20, y);
        y += 8;
        doc.text(`Status: ${statusPG}`, 20, y);
    }

    // ===== STUDI KASUS =====
    if (hasilCase) {
        y += 15;
        doc.setFontSize(14);
        doc.text("Hasil Studi Kasus", 20, y);

        y += 8;
        doc.setFontSize(12);
        doc.text(`Jenis: ${jenisCase}`, 20, y);
        y += 8;
        doc.text(`Total Kata: ${totalKata}`, 20, y);
        y += 8;
        doc.text(`Total Karakter: ${totalKarakter}`, 20, y);
    }

    doc.save(`Hasil-${user.nama}.pdf`);
}

