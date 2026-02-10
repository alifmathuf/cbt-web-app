// ================================
// CHART HASIL UJIAN CBT
// ================================

export function renderResultChart(canvasId, benar, salah) {
  const ctx = document.getElementById(canvasId).getContext("2d");

  // destroy chart lama (kalau reload)
  if (window.resultChart) {
    window.resultChart.destroy();
  }

  window.resultChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Benar", "Salah"],
      datasets: [
        {
          data: [benar, salah],
          backgroundColor: [
            "#22c55e", // hijau premium
            "#ef4444"  // merah soft
          ],
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // 🔑 biar ikut ukuran card
      cutout: "65%",               // donut lebih tipis & elegan
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#e5e7eb",
            boxWidth: 14,
            padding: 16,
            font: {
              size: 12,
              weight: "500"
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function (ctx) {
              return `${ctx.label}: ${ctx.parsed}`;
            }
          }
        }
      }
    }
  });
}
