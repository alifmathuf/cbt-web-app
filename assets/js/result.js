import { State } from "./store/state.js";

const state = State.get();

document.getElementById("userName").textContent =
  state.user?.name || "Peserta";

document.getElementById("pgScore").textContent =
  state.pg.score ?? "Belum dinilai";

const kasusDiv = document.getElementById("kasusSummary");

if (state.kasus.jawaban) {
  Object.entries(state.kasus.jawaban).forEach(([jenis, isi]) => {
    const el = document.createElement("div");
    el.innerHTML = `
      <h4>${jenis}</h4>
      <p>${isi.substring(0, 200)}...</p>
    `;
    kasusDiv.appendChild(el);
  });
}
