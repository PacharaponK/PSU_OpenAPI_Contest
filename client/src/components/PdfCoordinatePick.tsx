import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

function PdfCoordinatePick(props: any) {
	const [coord, setCoord] = useState<[number, number] | null>(null);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [numPages, setNumPages] = useState<number>(0);

	const handleMouseClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = ((event.clientX - rect.left) * 1.55).toFixed(2);
		console.log("🚀 ~ handleMouseClick ~ x:", x);
		const y = ((543.1548387096774 - (event.clientY - rect.top)) * 1.55).toFixed(
			2
		);
		console.log("🚀 ~ handleMouseClick ~ y:", y);
		setCoord([parseFloat(x), parseFloat(y)]);
		console.log(pageNumber);
		props.setFormData({
			...props.formData,
			posX: parseFloat(x),
			posY: parseFloat(y),
			page: pageNumber,
		});
	};

	const onDocumentSuccess = ({ numPages }: any) => {
		setNumPages(numPages);
	};

	const prevPage = () => {
		setPageNumber(pageNumber <= 1 ? 1 : pageNumber - 1);
	};

	const nextPage = () => {
		setPageNumber(pageNumber >= numPages ? pageNumber : pageNumber + 1);
	};

	return (
		<>
			<div className="flex flex-col justify-center items-center mx-auto outline outline-2 outline-gray-500 h-[543.1548387096774px] w-[384.0516129032258px]">
				<div className="flex justify-between items-center space-x-5">
					<div>
						<svg
							onClick={() => prevPage()}
							className={`w-9 h-9 ${
								pageNumber == 1
									? "text-white bg-white"
									: "text-black bg-gray-200"
							} rounded-full p-2 dark:text-white`}
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m15 19-7-7 7-7"
							/>
						</svg>
					</div>
					<Document
						className="cursor-pointer"
						file={props.file}
						onLoadSuccess={onDocumentSuccess}
					>
						<Page
							onClick={handleMouseClick}
							height={543.1548387096774}
							width={384.0516129032258}
							pageNumber={pageNumber}
							renderTextLayer={false}
							renderAnnotationLayer={false}
						></Page>
					</Document>
					<div>
						<svg
							onClick={() => nextPage()}
							className={`w-9 h-9 ${
								pageNumber == numPages
									? "text-white bg-white"
									: "text-black bg-gray-200"
							} rounded-full p-2 dark:text-white`}
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m9 5 7 7-7 7"
							/>
						</svg>
					</div>
				</div>
			</div>
		</>
	);
}

export default PdfCoordinatePick;
