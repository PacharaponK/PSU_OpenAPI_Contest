import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

export default function ModalPdfGuide(props: any) {
	const [coord, setCoord] = useState<[number, number] | null>(null);
	const [pageNumber, setPageNumber] = useState<number>(1);

	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = (event.clientX - rect.left).toFixed(2);
		const y = (841.89 - (event.clientY - rect.top)).toFixed(2);
		setCoord([parseFloat(x), parseFloat(y)]);
	};

	const onDocumentSuccess = ({ numPages }: any) => {
		setPageNumber(numPages);
	};

	return (
		<>
			<Modal
				show={props.openModal}
				size={"3xl"}
				onClose={() => props.setOpenModal(false)}
			>
				<Modal.Header>
					<h1>คู่มือการตั้งค่า</h1>
				</Modal.Header>
				<Modal.Body className="p-8">
					<h2>X: {coord ? coord[0] : ""}</h2>
					<h2>Y: {coord ? coord[1] : ""}</h2>
					<div
						onMouseMove={handleMouseMove}
						className="flex flex-col justify-center items-center align-middle outline h-[841.89px] w-[595.28px]"
					>
						<Document file={props.file} onLoadSuccess={onDocumentSuccess}>
							<Page
								height={841.89}
								width={595.28}
								pageNumber={pageNumber}
								renderTextLayer={false}
								renderAnnotationLayer={false}
							></Page>
						</Document>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}
