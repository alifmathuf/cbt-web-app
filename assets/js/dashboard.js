import { State } from "./store/state.js";
import { avatar } from "./avatar.js";

const state = State.get();

document.getElementById("username").textContent =
  state.user?.name || "Peserta";

document.getElementById("avatar").src =
  avatar(state.user?.name || "User");

document.getElementById("pgCount").textContent =
  state.pg.score ? 1 : 0;

document.getElementById("kasusCount").textContent =
  state.kasus.selesai ? 1 : 0;

document.getElementById("avgScore").textContent =
  state.pg.score ?? "-";
