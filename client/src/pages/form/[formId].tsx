import Navbar from '@/components/Navbar';
import conf from '@/conf/main';
import { Form } from '@/modules/form';
import { SingleForm } from '@/modules/singleForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib';
import React, { useEffect, useState } from 'react'
import fontkit from '@pdf-lib/fontkit';

function FormIdPage() {
    const router = useRouter();
    const formId = router.query.formId;

    const [form, setForm] = useState<SingleForm>();
    const fetchForm = async () => {
        try {
            const listForms = await axios.get(`${conf.urlPrefix}/forms/${formId}`);
            setForm(listForms.data);
        } catch (error) {
            console.error(error);

        }
    };

    // async function modifyPdf() {
    //     const url = 'https://raw.githubusercontent.com/PacharaponK/PSU_OpenAPI_Contest/main/uploads/THSarabunNew.ttf'
    //     const fontBytes = await fetch(url).then(res => res.arrayBuffer())

    //     const pdfDoc = await PDFDocument.create()

    //     pdfDoc.registerFontkit(fontkit)
    //     const customFont = await pdfDoc.embedFont(fontBytes)

    //     const page = pdfDoc.addPage()

    //     const text = 'พชรพล'
    //     const textSize = 35
    //     const textWidth = customFont.widthOfTextAtSize(text, textSize)
    //     const textHeight = customFont.heightAtSize(textSize)

    //     page.drawText(text, {
    //         x: 40,
    //         y: 450,
    //         size: textSize,
    //         font: customFont,
    //         color: rgb(0, 0.53, 0.71),
    //     })
    //     page.drawRectangle({
    //         x: 40,
    //         y: 450,
    //         width: textWidth,
    //         height: textHeight,
    //         borderColor: rgb(1, 0, 0),
    //         borderWidth: 1.5,
    //     })

    //     const pdfBytes = await pdfDoc.save()
    //     const blob = new Blob([pdfBytes], { type: "application/pdf" });
    //     const downloadURL = URL.createObjectURL(blob);
    //     const link = document.createElement("a");
    //     link.href = downloadURL;
    //     link.download = "modified_pdf.pdf";
    //     link.click();
    //     URL.revokeObjectURL(url);
        
    // }

    async function modifyPdf() {
        try {
            const url = 'http://localhost:1337/forms/posts/pdf/general_1713886455741.pdf'
            const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

            const pdfDoc = await PDFDocument.load(existingPdfBytes)
            const fontUrl = 'https://raw.githubusercontent.com/PacharaponK/PSU_OpenAPI_Contest/main/uploads/THSarabunNew.ttf'
            const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer())
    
            pdfDoc.registerFontkit(fontkit)
            const customFont = await pdfDoc.embedFont(fontBytes)

            const pages = pdfDoc.getPages()
            const modifyPage = pages[1]
            const { width, height } = modifyPage.getSize()
            console.log(width, height);
            
            modifyPage.drawText("พชรพล เกตุเเก้ว", {
                x: 237.56,
                y: (height/2)+95,
                size: 15,
                font: customFont,
                color: rgb(0, 0, 0),
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

    useEffect(() => {
        fetchForm();
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
            </div>
        </div>
    )
}

export default FormIdPage