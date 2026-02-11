const jawabanUser = JSON.parse(localStorage.getItem('pg_jawaban') || '[]');
const soal = JSON.parse(localStorage.getItem('pg_soal') || '[]');
const opsi = JSON.parse(localStorage.getItem('pg_opsi') || '[]');
const kunci = JSON.parse(localStorage.getItem('pg_kunci') || '[]');

const tbody = document.getElementById('tabelJawaban');

if (!jawabanUser.length) {
  tbody.innerHTML = `
    <tr>
      <td colspan="4" style="text-align:center">
        Data jawaban tidak ditemukan
      </td>
    </tr>
  `;
} else {
  jawabanUser.forEach((jawab, i) => {

    const benar = kunci[i] === jawab;

    const badge = benar
      ? `<span class="badge badge-success">✔ Benar</span>`
      : `<span class="badge badge-danger">✘ Salah</span>`;

    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${soal[i] || '-'}</td>
        <td>
          ${opsi[i] && jawab != null ? opsi[i][jawab] : '-'}
        </td>
        <td>
          ${badge}
        </td>
      </tr>
    `;
  });
}
