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
