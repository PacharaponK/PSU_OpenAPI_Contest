import Navbar from "@/components/Navbar";
import conf from "@/conf/main";
import { SingleForm } from "@/modules/singleForm";
import axios from "axios";
import { useRouter } from "next/router";
import { PDFDocument, rgb } from "pdf-lib";
import React, { useEffect, useState } from "react";
import fontkit from "@pdf-lib/fontkit";
import { useAuth } from "react-oidc-context";
import { Route } from "@/modules/routes";
import PreviewModal from "@/components/PreviewModal";
import Footer from "@/components/Footer";
import Stepper from "@/components/Stepper";
import { Carousel } from "flowbite-react";
import HomeCarousel from "@/components/Carousel";

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
      const modifyPage = pages[form.pageModified ?? 0]; // config

      form.modifiedConfig?.map((config: any) => {
        if (config?.type == "drawText") {
          modifyPage.drawText(eval(config?.data), {
            x: config.posX,
            y: config.posY,
            size: 15,
            font: customFont,
            color: rgb(0, 0, 0),
          });
        }
        if (config?.type == "drawCircle") {
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

      // let posX = 384.56;
      // for (let i = 0; i < studentDetail.studentId.length; i++) {
      //   modifyPage.drawText(studentDetail.studentId[i], {
      //     x: posX,
      //     y: 513.96,
      //     size: 15,
      //     font: customFont,
      //     color: rgb(0, 0, 0),
      //   });
      //   posX += 15.96; //config
      // }

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
  console.log(form?.picDetailURL);



  return (
    <div>
      <Navbar />
      {form?.picDetailURL.length == 0 ?
        <div className="h-screen background-image flex flex-col justify-center items-center">
          {/* <div className="flex p-5 bg-white w-3/4 mb-3 mt-8 rounded-3xl border-[#3f66ff] border-[3px] bg-opacity-70">
          </div> */}

          <div className="flex flex-col justify-start w-3/4 p-5 bg-white rounded-3xl shadow-2xl shadow-[#6ca4ee]">
            <h1 className="pl-4 font-bold text-3xl text-center mx-auto mb-1 pt-3">
              {form?.name}
            </h1>
            <div className="flex justify-center">
              <svg className="text-center w-6z h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z" clip-rule="evenodd" />
              </svg>
              <p className="font-medium text-lg text-center mb-5 text-gray-400">
                {form?.category.name}
              </p>
            </div>
            <Stepper formDetail={form.detail} />
            <PreviewModal
              pdfUrl={pdfUrl}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
            <div className="flex p-5 justify-between items-center mt-3 rounded-3xl">
              <div className="flex space-x-1">
                <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd" />
                </svg>
                <p className="text-gray-400">อัพเดทเมื่อ: {"22/12/2545"}</p>
              </div>
              <div className="space-x-2">
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  แจ้งปัญหา
                </button>
                <button
                  type="button"
                  onClick={() => modifyPdf(form)}
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  ดาวน์โหลดฟอร์ม
                </button>
              </div>
            </div>
          </div>
        </div>

        :

        <div className="h-auto background-image flex flex-col justify-center items-center">
          {/* <div className="flex p-5 bg-white w-3/4 mb-3 mt-8 rounded-3xl border-[#3f66ff] border-[3px] bg-opacity-70">
          </div> */}
          <div className="flex flex-col justify-start w-3/4 p-5 mb-10 mt-32 bg-white rounded-3xl shadow-2xl shadow-[#6ca4ee]">
            <h1 className="pl-4 font-bold text-3xl text-center mx-auto mb-1 pt-3">
              {form?.name}
            </h1>
            <div className="flex justify-center">
              <svg className="text-center w-6z h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z" clip-rule="evenodd" />
              </svg>
              <p className="font-medium text-lg text-center mb-5 text-gray-400">
                {form?.category.name}
              </p>
            </div>


            {/* <div className="flex justify-center">
              <img className='w-1/2' src={form?.picDetailURL[0]} alt="" />
            </div> */}
            
            <div className="lg:w-1/2 h-56 sm:h-64 mb-10 shadow-lg shadow-[#c3c6ca] xl:h-80 2xl:h-[30rem] flex mx-auto justify-center ">
              <Carousel>
                {form?.picDetailURL.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`${index + 1}`}
                  />
                ))}
              </Carousel>
            </div>
            <Stepper formDetail={form?.detail} />
            <PreviewModal
              pdfUrl={pdfUrl}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
            <div className="flex p-5 justify-between items-center mt-3 rounded-3xl">
              <div className="flex space-x-2">
                <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd" />
                </svg>
                <p className="text-gray-400">อัพเดทเมื่อ: {"22/12/2545"}</p>
              </div>
              <div className="space-x-3">
                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  แจ้งปัญหา
                </button>
                <button
                  type="button"
                  onClick={() => modifyPdf(form)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  ดาวน์โหลดฟอร์ม
                </button>

              </div>
            </div>
          </div>
        </div>

        // <> 
        // <div className="h-screen background-image bg-white flex flex-col justify-center items-center space-y-4 pt-32">
        //   <h1 className="pl-4 font-bold text-3xl">{form?.name}</h1>
        // {form?.picDetailURL && form.picDetailURL.length > 0 && (
        //   <div className="size-[50vh] flex justify-center items-center">
        // <Carousel className="h-1/2" indicators={false}>
        // {form.picDetailURL.map((url, index) => (
        //       <img
        //       key={index}
        //       src={url}
        //       alt={`${index + 1}`}
        //       />
        //       ))}
        //       </Carousel>
        //       </div>
        //     )}
        //   <div className="">
        //     <Stepper />
        //   </div>
        //   <div className="flex justify-center items-center w-1/2 bg-cyan-100 p-5 rounded-xl">
        //   <div className="text-left">
        //     ขั้นตอนดำเนินการ
        //     <p className="text-center text-xl pb-4"></p>
        //     <span className="whitespace-pre-line">{form?.detail}</span>
        //   </div>
        // </div>
        //   <button
        //     onClick={() => modifyPdf(form)}
        //     type="button"
        //     className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        //   >
        //     ดาวน์โหลดฟอร์ม
        //   </button>
        //   <PreviewModal
        //     pdfUrl={pdfUrl}
        //     openModal={openModal}
        //     setOpenModal={setOpenModal}
        //   />
        // </div>
        // </>
      }

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default FormIdPage;
