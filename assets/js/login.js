import { State } from "./store/state.js";

document.getElementById("loginBtn").onclick = () => {
  const name = document.getElementById("name").value.trim();
  const kelas = document.getElementById("class").value.trim();

  if (!name || !kelas) {
    alert("Nama dan kelas wajib diisi");
    return;
  }

  const state = State.get();
  state.user = { name, kelas };
  State.set(state);

  window.location.href = "pages/dashboard.html";
};
