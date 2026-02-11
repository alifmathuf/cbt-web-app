const jawabanUser = JSON.parse(localStorage.getItem('pg_jawaban') || '[]');
const soal = JSON.parse(localStorage.getItem('pg_soal') || '[]');
const kunci = JSON.parse(localStorage.getItem('pg_kunci') || '[]');

const tbody = document.getElementById('tabelJawaban');

if (jawabanUser.length === 0) {
  tbody.innerHTML = `
    <tr>
      <td colspan="5" style="text-align:center">
        Data jawaban tidak ditemukan
      </td>
    </tr>
  `;
} else {
  jawabanUser.forEach((jawab, i) => {
    const benar = kunci[i] === jawab;

    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${soal[i] || '-'}</td>
        <td>Opsi ${String.fromCharCode(65 + jawab)}</td>
        <td>${kunci[i] != null ? 'Opsi ' + String.fromCharCode(65 + kunci[i]) : '-'}</td>
        <td style="font-weight:700;color:${benar ? '#16a34a' : '#dc2626'}">
          ${benar ? 'Benar' : 'Salah'}
        </td>
      </tr>
    `;
  });
}
