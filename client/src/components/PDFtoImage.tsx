import React, { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import html2canvas from "html2canvas";

interface PdfToImageProps {
	file: File;
}

const PdfToImage: React.FC<PdfToImageProps> = ({ file }) => {
	const [images, setImages] = useState<string[]>([]);

	useEffect(() => {
		const renderPDF = async () => {
			const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file));
			const pdf = await loadingTask.promise;
			const pages: string[] = [];

			for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
				const page = await pdf.getPage(pageNum);
				const viewport = page.getViewport({ scale: 1.5 });
				const canvas = document.createElement("canvas");
				const context = canvas.getContext("2d");

				if (!context) {
					continue;
				}

				canvas.height = viewport.height;
				canvas.width = viewport.width;

				const renderContext = {
					canvasContext: context,
					viewport: viewport,
				};

				await page.render(renderContext).promise;

				const image = await html2canvas(canvas).then((canvas) =>
					canvas.toDataURL()
				);
				pages.push(image);
			}

			setImages(pages);
		};

		renderPDF();
	}, [file]);

	return (
		<div>
			{images.map((img, idx) => (
				<img key={idx} src={img} alt={`page ${idx + 1}`} />
			))}
		</div>
	);
};

export default PdfToImage;
