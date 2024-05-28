"use client";

import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

export default function ModalPdfGuide(props: any) {
	const [handleFeedbackChange, setHandleFeedbackChange] = useState<string>();
	const [coord, setCoord] = useState<any>();
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [file, setFile] = useState();
	const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
	const handleMouseMove = (event: any) => {
		setCoord([event.clientX, event.clientY]);
	};

	const onDocumentSuccess = ({ numPages }: any) => {
		setPageNumber(numPages);
	};

	// useEffect(() => {
	// 	const loadPdf = async () => {
	// 		const reader = new FileReader();
	// 		reader.onload = () => {
	// 			setPdfData(reader.result as ArrayBuffer);
	// 		};
	// 		reader.onerror = (error) => {
	// 			console.error("Error occurred while reading file:", error);
	// 		};
	// 		reader.readAsArrayBuffer(props.file);
	// 	};
	// 	loadPdf();
	// }, [props.file]);

	return (
		<>
			{/* <div className="h-full flex justify-center">
							<img
								src="/pdf-guide.png"
								className="h-auto w-auto"
								alt="pdf-guide"
							></img>
						</div> */}
			{/* <svg
							height={"841.89px"}
							width={"595.28px"}
							onMouseMove={(event) => handleMouseMove(event)}
						></svg> */}
			<h2>X: {coord ? coord[0] : ""}</h2>
			<h2>Y: {coord ? coord[1] : ""}</h2>
			<div className="">
				<div
					onMouseMove={(event) => handleMouseMove(event)}
					className="h-[841.89px] w-[595.28px] outline"
				>
					{/* <Document file={props.file} onLoadSuccess={onDocumentSuccess}>
								<Page
									height={841.89}
									width={595.28}
									pageNumber={pageNumber}
									renderTextLayer={false}
									renderAnnotationLayer={false}
								></Page>
							</Document> */}
				</div>
			</div>
		</>
	);
}
