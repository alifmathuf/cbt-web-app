function login() {
  const nama = document.getElementById('nama').value.trim();
  const kelas = document.getElementById('kelas').value.trim();

  if (!nama || !kelas) {
    alert('Nama dan kelas wajib diisi');
    return;
  }

  localStorage.setItem('cbtUser', JSON.stringify({
    nama,
    kelas
  }));

  // ABSOLUTE PATH
  window.location.href = '/cbt-web-app/pages/dashboard.html';
}
function logout() {
  if (confirm('Yakin ingin keluar?')) {
    localStorage.clear();
    window.location.href = '../index.html';
  }
}
