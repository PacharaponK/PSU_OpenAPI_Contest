import { useAuth } from "react-oidc-context";
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import Image from "next/image";

export default function Home() {
  const auth = useAuth();

  async function modifyPdf() {
    try {
      const url = 'http://localhost:1337/posts/pdf/change_1713609515797.pdf'
      const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

      const pdfDoc = await PDFDocument.load(existingPdfBytes)
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

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
      const downloadURL = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadURL;
      link.download = "modified_pdf.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen background-image flex flex-col space-y-4 justify-center items-center">
      <Image src={'/animation.gif'} alt='Home Page' width={'100'} height={'500'} />
      <div>
        <h1 className="text-black lg:text-3xl md:text-2xl sm:text-lg font-bold">
          ทำให้การกรอกเเบบฟอร์มเป็นเรื่องง่าย
        </h1>
      </div>
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
          Download
        </button>
      </div>
    </div>
  );
}
