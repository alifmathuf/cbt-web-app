async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  const res = await fetch(file);
  el.innerHTML = await res.text();
}

loadComponent("app-header", "components/header.html");
loadComponent("app-footer", "components/footer.html");
