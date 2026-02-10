export function scoreChart(ctx, data) {
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map(d => d.label),
      datasets: [{
        data: data.map(d => d.value),
        tension: .3
      }]
    },
    options: {
      plugins: { legend: false },
      responsive: true
    }
  });
}
/* =========================
   RESULT BUTTONS – FIX
========================= */
.result-actions {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.result-actions button {
  min-width: 220px;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.35);
  background: linear-gradient(135deg, #0f172a, #0891b2);
  color: #ffffff;
  cursor: pointer;
  transition: all .25s ease;
}

/* Hover → hijau premium */
.result-actions button:hover {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  transform: translateY(-2px);
}
/* =========================
   RESULT – CHART FIX
========================= */
.result-chart {
  max-width: 260px;          /* <<< ukuran ideal */
  margin: 0 auto 16px;
}

.result-chart canvas {
  width: 100% !important;
  height: auto !important;
}
