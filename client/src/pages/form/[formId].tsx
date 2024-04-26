import Navbar from '@/components/Navbar';
import conf from '@/conf/main';
import { Form } from '@/modules/form';
import { SingleForm } from '@/modules/singleForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib';
import React, { useEffect, useState } from 'react'
import fontkit from '@pdf-lib/fontkit';
import { useAuth } from 'react-oidc-context';
import { Route } from '@/modules/routes';
import PreviewModal from '@/components/PreviewModal';

function FormIdPage() {
    const router = useRouter();
    const auth = useAuth();
    const formId = router.query.formId;
    const [form, setForm] = useState<SingleForm>();
    const [studentDetail, setStudentDetail] = useState<any>(null);
    const [pdfUrl, setPdfUrl] = useState<string>()
    const [openModal, setOpenModal] = useState<boolean>(false);
    console.log(studentDetail);
    

    const fetchForm = async () => {
        try {
            const listForms = await axios.get(`${conf.urlPrefix}/forms/${formId}`);
            setForm(listForms.data);
        } catch (error) {
            console.error(error);

        }
    };

    const fectStudentDetail = async () => {
        const result = await axios.get(
            `${conf.urlPrefix}/psu-api/studentDetail`,
            {
                headers: {
                    token: auth.user?.access_token,
                },
            }
        );
        setStudentDetail(result.data.data[0]);
    }

        async function modifyPdf() {
            try {
                const url = `${conf.urlPrefix}/forms${form?.pdfURL}`;
                const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

                const pdfDoc = await PDFDocument.load(existingPdfBytes);
                const fontUrl = 'https://raw.githubusercontent.com/PacharaponK/PSU_OpenAPI_Contest/main/uploads/THSarabunNew.ttf';
                const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());

                pdfDoc.registerFontkit(fontkit);
                const customFont = await pdfDoc.embedFont(fontBytes);

                const pages = pdfDoc.getPages();
                const modifyPage = pages[1]; // config
                const { width, height } = modifyPage.getSize();

                modifyPage.drawText(studentDetail.titleNameThai+studentDetail.studNameThai+" "+studentDetail.studSnameThai, {
                    x: 237.56,
                    y: (height / 2) + 95,
                    size: 15,
                    font: customFont,
                    color: rgb(0, 0, 0),
                }); //config

                const pdfBytes = await pdfDoc.save()
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
        }, [router.isReady])

        console.log(form);


        return (
            <div>
                <Navbar />
                <div className='h-screen background-image flex flex-col justify-center items-center space-y-4'>
                    <h1 className='pl-4 font-bold text-3xl'>{form?.name}</h1>
                    <div className='flex justify-center items-center w-1/2 bg-cyan-100 p-5 rounded-xl'>
                        <div className='text-left'>
                            <p className='text-center text-xl pb-4'></p>
                            <span className='whitespace-pre-line'>{form?.detail}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => modifyPdf()}
                        type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        ดาวน์โหลดฟอร์ม
                    </button>
                    <PreviewModal pdfUrl={pdfUrl} openModal={openModal} setOpenModal={setOpenModal} />
                </div>
                <iframe title="pdfViewer" src={pdfUrl} width="100%" height="500px" frameBorder="0"></iframe>
            </div>
        )
    }

    export default FormIdPage