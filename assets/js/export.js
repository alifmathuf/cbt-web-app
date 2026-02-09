import jsPDF from "jspdf";

export function exportPDF(data) {
  const pdf = new jsPDF();
  pdf.text("Hasil CBT", 10, 10);
  pdf.text(JSON.stringify(data, null, 2), 10, 20);
  pdf.save("hasil.pdf");
}
