let jadwal = [];

async function loadSheet() {
  const url = document.getElementById('sheetUrl').value;
  const res = await fetch(url);
  const text = await res.text();
  jadwal = text.split('\n').map(r => r.split(','));
  alert("Jadwal berhasil dimuat: " + jadwal.length + " baris");
}

async function generateAll() {
  const { jsPDF } = window.jspdf;
  const zip = new JSZip();

  for(let i=1;i<=44;i++){
    const doc = new jsPDF({format:"a6"});
    doc.text("KARTU PENGAWAS", 20, 10);
    doc.text("Pengawas #" + i, 20, 20);

    const qr = qrcode(0, 'M'); 
    qr.addData("PENGAWAS_"+i);
    qr.make();
    const qrImg = qr.createDataURL();
    doc.addImage(qrImg, "PNG", 20, 30, 60, 60);

    const pdfBlob = doc.output("blob");
    zip.file("pengawas_"+i+".pdf", pdfBlob);
  }

  const content = await zip.generateAsync({type:"blob"});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(content);
  a.download = "kartu_pengawas.zip";
  a.click();
}
