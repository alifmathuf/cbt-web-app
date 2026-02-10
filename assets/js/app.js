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

  window.location.href = './pages/dashboard.html';
}
