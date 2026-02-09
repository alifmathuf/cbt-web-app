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
function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem(
    'theme',
    document.body.classList.contains('dark') ? 'dark' : 'light'
  );
}

// LOAD SAAT AWAL
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}
