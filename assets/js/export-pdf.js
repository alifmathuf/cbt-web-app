export function exportPDF() {
  const element = document.querySelector(".result");

  html2pdf().from(element).set({
    margin: 10,
    filename: "hasil-ujian.pdf",
    html2canvas: { scale: 2 },
    jsPDF: { orientation: "portrait" }
  }).save();
}
