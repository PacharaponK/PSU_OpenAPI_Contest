import { useAuth } from "react-oidc-context";
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default function Home() {
  const auth = useAuth();

  async function modifyPdf() {

    const url = 'http://localhost:1337/posts/pdf/change_1713609515797.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    console.log("hahahah");

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    firstPage.drawText('This text was added with JavaScript!', {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45),
    })

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    // Create a URL for the Blob
    const downloadURL = URL.createObjectURL(blob);

    // Create a hidden anchor element
    const a = document.createElement("a");

    // Set the URL as the anchor's href
    a.href = downloadURL;

    // Set the download attribute with the desired filename
    a.download = "modified_pdf.pdf";

    // Trigger a click on the anchor element to initiate the download
    a.click();

    // Clean up by revoking the URL object
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={() => auth.signinRedirect()}
      >
        Log in
      </button>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={() => modifyPdf()}
      >
        Dowload
      </button>
    </div>
  );
}
