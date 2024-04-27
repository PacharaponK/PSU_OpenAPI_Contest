import Navbar from "@/components/Navbar";
import conf from "@/conf/main";
import { Form } from "@/modules/form";
import { SingleForm } from "@/modules/singleForm";
import axios from "axios";
import { useRouter } from "next/router";
import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";
import React, { useEffect, useState } from "react";
import fontkit from "@pdf-lib/fontkit";
import { useAuth } from "react-oidc-context";
import { Route } from "@/modules/routes";
import PreviewModal from "@/components/PreviewModal";
import Footer from "@/components/Footer";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import { string } from "zod";

function FormIdPage() {
  const router = useRouter();
  const auth = useAuth();
  const formId = router.query.formId;
  const [form, setForm] = useState<SingleForm>();
  const [studentDetail, setStudentDetail] = useState<any>(null);
  const [pdfUrl, setPdfUrl] = useState<string>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const fetchForm = async () => {
    try {
      const listForms = await axios.get(`${conf.urlPrefix}/forms/${formId}`);
      setForm(listForms.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fectStudentDetail = async () => {
    try {
      const result = await axios.get(
        `${conf.urlPrefix}/psu-api/studentDetail`,
        {
          headers: {
            token: auth.user?.access_token,
          },
        }
      );
      setStudentDetail(result.data.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  async function modifyPdf(form: any) {
    try {
      const url = `${conf.urlPrefix}/forms${form?.pdfURL}`;
      const existingPdfBytes = await fetch(url).then((res) =>
        res.arrayBuffer()
      );

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const fontUrl =
        "https://script-app.github.io/font/THSarabunNew.ttf";
      const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());

      pdfDoc.registerFontkit(fontkit);
      const customFont = await pdfDoc.embedFont(fontBytes);

      const pages = pdfDoc.getPages();
      const modifyPage = pages[form.modifiedPage]; // config

      form.modifiedConfig?.map((config: any) => {
        if (config.type == "drawText") {
          modifyPage.drawText(eval(config.data), {
            x: config.posX,
            y: config.posY,
            size: 15,
            font: customFont,
            color: rgb(0, 0, 0),
          });
        }
        if (config.type == "drawCircle") {
          modifyPage.drawCircle({
            x: config.posX,
            y: config.posY,
            size: 15,
            opacity: 0,
            borderOpacity: 1,
            borderColor: rgb(0, 0, 0),
          });
        }
      });

      let posX = 384.56;
      for (let i = 0; i < studentDetail.studentId.length; i++) {
        modifyPage.drawText(studentDetail.studentId[i], {
          x: posX,
          y: 513.96,
          size: 15,
          font: customFont,
          color: rgb(0, 0, 0),
        });
        posX += 15.96; //config
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const modifiedPdfUrl = URL.createObjectURL(blob);
      setPdfUrl(modifiedPdfUrl);
      setOpenModal(true);
      // const link = document.createElement("a");
      // link.href = modifiedPdfUrl;
      // link.download = "modified_pdf.pdf";
      // link.click();
      // URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchForm();
    fectStudentDetail();
  }, [router.isReady, auth.user?.access_token]);

  console.log(studentDetail);
  

  return (
    <div>
      <Navbar />
      <div className="h-screen background-image flex flex-col justify-center items-center space-y-4 pt-20">
        <h1 className="pl-4 font-bold text-3xl">{form?.name}</h1>
        {form?.picDetailURL && form.picDetailURL.length > 0 && (
          <div className="size-[50vh] flex justify-center items-center">
            <Carousel className="h-1/2" indicators={false}>
              {form.picDetailURL.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`${index + 1}`}
                />
              ))}
            </Carousel>
          </div>
        )}
        <div className="flex justify-center items-center w-1/2 bg-cyan-100 p-5 rounded-xl">
          <div className="text-left">
            ขั้นตอนดำเนินการ
            <p className="text-center text-xl pb-4"></p>
            <span className="whitespace-pre-line">{form?.detail}</span>
          </div>
        </div>
        <button
          onClick={() => modifyPdf(form)}
          type="button"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          ดาวน์โหลดฟอร์ม
        </button>
        <PreviewModal
          pdfUrl={pdfUrl}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default FormIdPage;
