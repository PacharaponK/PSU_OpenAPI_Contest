import Navbar from "@/components/Navbar";
import PostProgressStep from "@/components/PostProgressStep";
import ax from "@/conf/ax";
import conf from "@/conf/main";
import { Category } from "@/modules/category";
import Link from "next/link";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";
import React, { useState, ChangeEvent, useEffect } from "react";
import PreviewModal from "@/components/PreviewModal";
import { ConfigFormTable } from "@/components/ConfigFormTable";
import AppendConfigModal from "@/components/AppendConfigModal";

interface FormData {
	name?: string;
	detail?: string;
	updateDate?: string;
	picDetailURL?: string;
	modifiedConfig?: {
		type?: string;
		posX?: number;
		posY?: number;
		gap?: number;
		data?: string;
	}[];
	category: {
		id?: number;
	};
}

interface PostDataType {
	name?: string;
	code?: string;
}

const postData: PostDataType[] = [
	{
		name: "ข้อความ",
		code: "drawText",
	},
	{
		name: "วงกลม",
		code: "drawCircle",
	},
];

interface StudentDataType {
	name?: string;
	code?: string;
	mock?: string;
}

const studentData: StudentDataType[] = [
	{
		name: "ไม่ระบุ",
		code: "",
		mock: "",
	},
	{
		name: "ชื่อ-นามสกุล",
		code: "studentDetail.studNameThai+' '+studentDetail.studSnameThai",
		mock: "สกุลกร ทะลน",
	},
	{
		name: "คำนำหน้ากับชื่อ-นามสกุล",
		code: "studentDetail.titleNameThai+studentDetail.studNameThai+' '+studentDetail.studSnameThai",
		mock: "นายสกุลกร ทะลน",
	},
	{
		name: "ชื่อ",
		code: "studentDetail.studNameThai",
		mock: "สกุลกร",
	},
	{
		name: "สกุล",
		code: "studentDetail.studSNameThai",
		mock: "ทะลน",
	},
	{
		name: "รหัสนักศึกษา",
		code: "studentDetail.studentId",
		mock: "5910500000",
	},
	{
		name: "วิทยาเขต",
		code: "studentDetail.campusNameThai",
		mock: "วิทยาเขตหาดใหญ่",
	},
	{
		name: "สาขาวิชา",
		code: "studentDetail.majorNameThai",
		mock: "ทันตแพทยศาสตร์",
	},
	{
		name: "คณะที่ศึกษา",
		code: "studentDetail.deptNameThai",
		mock: "คณะทันตแพทยศาสตร์",
	},
	{
		name: "ที่อยู่",
		code: "studentDetail.address",
		mock: "17/4 หมู่ 5 ถนนบำรุงราษฎร์ ตำบลพิบูลสงคราม อำเภอเมือง กรุงเทพมหานคร 10400",
	},
	{
		name: "หอพัก",
		code: "studentDetail.dorm",
		mock: "หอพักนักศึกษาในกำกับอาคาร 10",
	},
	{
		name: "ทุนการศึกษา",
		code: "studentDetail.scholarship",
		mock: "กยศ.",
	},
	{
		name: "เบอร์โทรศัพท์",
		code: "studentDetail.phone",
		mock: "0812345678",
	},
	{
		name: "อีเมล",
		code: "studentDetail.email",
		mock: "mock@psu.ac.th",
	},
];

interface ConfigDataType {
	type?: {
		name?: string;
		code?: string;
	};
	posX?: number;
	posY?: number;
	page?: number;
	gap?: number;
	size?: number;
	data?: {
		name?: string;
		code?: string;
		mock?: string;
	};
}

function PostFormPage() {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [progressIndex, setProgessIndex] = useState<string>("3");
	const [categories, setCategories] = useState<Category>();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [openConfigModal, setOpenConfigModal] = useState<boolean>(false);
	const [pdfUrl, setPdfUrl] = useState<string>();
	const [modifiedConfig, setModifiedConfig] = useState<ConfigDataType[]>([]);
	console.log("🚀 ~ PostFormPage ~ modifiedConfig:", modifiedConfig);

	const handleConfigChange = (newText: any) => {
		console.log(newText);
		setModifiedConfig((prevModifiedConfig) => [...prevModifiedConfig, newText]);
	};

	const updateConfig = (form: any, index: number) => {
		console.log(modifiedConfig);

		const newModifiedConfig = [...modifiedConfig];
		newModifiedConfig[index] = form;
		setModifiedConfig(newModifiedConfig);

		console.log(modifiedConfig);
	};

	const [formData, setFormData] = useState<FormData>({
		name: "",
		detail: "",
		updateDate: "",
		picDetailURL: "",
		modifiedConfig: [
			{
				type: "",
				posX: 0,
				posY: 0,
				gap: 0,
				data: "",
			},
		],
		category: {
			id: undefined,
		},
	});

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		console.log("🚀 ~ PostFormPage ~ value:", value);
		console.log("🚀 ~ PostFormPage ~ name:", name);
		if (name === "detail" || (name === "picDetailURL" && value != "")) {
			setFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		} else if (value == "") {
			setFormData((prevData) => ({
				...prevData,
				[name]: undefined,
			}));
		} else {
			setFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		}
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);
		}
	};

	const fetchCategories = async () => {
		try {
			const response = await ax.get(`${conf.categoryUrlPrefix}`);
			setCategories(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData((prevData) => ({
			...prevData,
			category: {
				id: Number(e.target.value),
			},
		}));
	};

	async function modifyPdf() {
		try {
			if (selectedFile) {
				console.log(selectedFile);

				const existingPdfBytes = await selectedFile.arrayBuffer();
				const pdfDoc = await PDFDocument.load(existingPdfBytes);
				const fontUrl = "https://script-app.github.io/font/THSarabunNew.ttf";
				const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());

				pdfDoc.registerFontkit(fontkit);
				const customFont = await pdfDoc.embedFont(fontBytes);

				const pages = pdfDoc.getPages();
				if (modifiedConfig) {
					modifiedConfig?.map((config: any) => {
						const modifyPage = pages[Number(config?.page)];
						if (config?.type.code == "drawText") {
							modifyPage.drawText(config?.data.mock, {
								x: Number(config.posX),
								y: Number(config.posY),
								size: 15,
								font: customFont,
								color: rgb(0, 0, 0),
							});
						}
						if (config?.type.code == "drawCircle") {
							modifyPage.drawCircle({
								x: Number(config.posX),
								y: Number(config.posY),
								size: Number(config.size),
								opacity: 0,
								borderOpacity: 1,
								borderColor: rgb(0, 0, 0),
							});
						}
					});
				}

				const pdfBytes = await pdfDoc.save();
				const blob = new Blob([pdfBytes], { type: "application/pdf" });
				const modifiedPdfUrl = URL.createObjectURL(blob);
				setPdfUrl(modifiedPdfUrl);
				setOpenModal(true);
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchCategories();
	}, []);

	if (progressIndex === "3") {
		return (
			<div className="h-screen background-image">
				<Navbar />
				<div className="flex flex-col justify-center items-center h-screen w-screen mx-auto ">
					<div className="w-96 sm:w-8/12 md:pt-7 px-2">
						<PostProgressStep name={"3/3 - ตั้งค่าฟอร์ม"} />
						<div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-2xl">
							<div className="mb-1 pt-5 text-center">
								<h2 className="text-2xl font-semibold mb-2">ตั้งค่าฟอร์ม</h2>
								{/* <p className="text-xs text-gray-500">
									ไฟล์ควรเป็นนามสกุล .pdf เท่านั้น
								</p> */}
							</div>
							<div className="w-full mb-5 p-5">
								<ConfigFormTable
									configData={modifiedConfig}
									studentData={studentData}
									postData={postData}
									onUpdateConfig={updateConfig}
								/>
							</div>
							<div className="pb-5 pt-2 flex justify-end w-full px-10 space-x-2">
								<button
									type="button"
									onClick={() => setOpenConfigModal(true)}
									className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
								>
									เพิ่มการตั้งค่า
								</button>
								<button
									type="button"
									onClick={() => modifyPdf()}
									className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
								>
									พรีวิวฟอร์ม
								</button>
							</div>
							<PreviewModal
								pdfUrl={pdfUrl}
								openModal={openModal}
								setOpenModal={setOpenModal}
							/>
							<AppendConfigModal
								openConfigModal={openConfigModal}
								setOpenConfigModal={setOpenConfigModal}
								studentData={studentData}
								postData={postData}
								onConfigChange={handleConfigChange}
							/>
						</div>
						<div className="flex justify-center space-x-2 pt-2">
							<svg
								onClick={() => setProgessIndex("2")}
								className="w-9 h-9 text-black bg-white rounded-full p-2 dark:text-white"
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
							<svg
								onClick={() => setProgessIndex("3")}
								className="w-9 h-9 text-black bg-white rounded-full p-2 dark:text-white"
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
			</div>
		);
	}

	if (progressIndex === "1") {
		return (
			<div className="h-screen background-image">
				<Navbar />
				<div className="flex flex-col justify-center items-center h-screen w-screen mx-auto ">
					<div className="w-96 sm:w-6/12">
						<PostProgressStep name={"1/3 - อัพโหลดฟอร์ม"} />
						<div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-2xl">
							<div className="mb-10 pt-7 text-center">
								<h2 className="text-2xl font-semibold mb-2">อัพโหลดฟอร์ม</h2>
								<p className="text-xs text-gray-500">
									ไฟล์ควรเป็นนามสกุล .pdf เท่านั้น
								</p>
							</div>
							<form
								action="#"
								className="relative w-4/5 h-48 max-w-xs mb-10 bg-gray-50 rounded-lg shadow-inner"
							>
								<input
									type="file"
									id="file-upload"
									className="hidden"
									onChange={handleFileChange}
								/>
								<label
									htmlFor="file-upload"
									className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
								>
									<p className="z-10 text-xs font-light text-center text-gray-500">
										{selectedFile
											? selectedFile.name
											: "ลากและวางไฟล์ของคุณที่นี่"}
									</p>
									<svg
										className="z-10 w-8 h-8 text-indigo-400"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
									</svg>
								</label>
							</form>
							{selectedFile && (
								<div className="text-center">
									<p className="text-sm pb-5 text-gray-500">
										ไฟล์ที่เลือก: {selectedFile.name}
									</p>
								</div>
							)}
						</div>
						<div className="flex justify-center space-x-2 pt-2">
							{/* <svg className="w-9 h-9 text-black bg-white rounded-full p-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
                            </svg> */}
							<svg
								onClick={() => setProgessIndex("2")}
								className="w-9 h-9 text-black bg-white rounded-full p-2 dark:text-white"
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
			</div>
		);
	}

	if (progressIndex === "2") {
		return (
			<div className="h-screen background-image">
				<Navbar />
				<div className="flex flex-col justify-center items-center h-screen w-screen mx-auto ">
					<div className="w-96 sm:w-6/12 md:pt-7 px-2">
						<PostProgressStep name={"2/3 - เพิ่มรายละเอียด"} />
						<div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-2xl">
							<div className="mb-1 pt-5 text-center">
								<h2 className="text-2xl font-semibold mb-2">รายละเอียดฟอร์ม</h2>
								{/* <p className="text-xs text-gray-500">
									ไฟล์ควรเป็นนามสกุล .pdf เท่านั้น
								</p> */}
							</div>
							<div className="w-full md:px-10 px-5 py-2">
								<label
									htmlFor="name"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									ชื่อฟอร์ม :
								</label>
								<div className="relative mb-6">
									<div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
										<svg
											className="w-4 h-4 text-gray-800 dark:text-white"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="none"
											viewBox="0 0 24 24"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"
											/>
										</svg>
									</div>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="คำร้องขอใช้ห้องปฎิบัติการ......"
										required
									/>
								</div>
								<label
									htmlFor="detail"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									รายละเอียด :
								</label>
								<div className="relative mb-6">
									<div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
										<svg
											className="w-4 h-4 text-gray-500 dark:text-white"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												fillRule="evenodd"
												d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<input
										type="text"
										id="detail"
										name="detail"
										value={formData.detail}
										onChange={handleInputChange}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="คณะวิทยาศาสตร์......"
									/>
									<button className="absolute inset-y-0 end-0 flex items-center px-4 bg-gray-200 dark:bg-gray-800 rounded-r-lg">
										คู่มือ
									</button>
								</div>
								<label
									htmlFor="picDetailURL"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									ลิงค์รูปภาพ :
								</label>
								<div className="relative mb-6">
									<div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
										<svg
											className="w-4 h-4 text-gray-500 dark:text-white"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												fillRule="evenodd"
												d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<input
										type="text"
										id="picDetailURL"
										name="picDetailURL"
										value={formData.picDetailURL}
										onChange={handleInputChange}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="https://reg.psu.ac.th/main/wp-content.jpg"
									/>
									<button className="absolute inset-y-0 end-0 flex items-center px-4 bg-gray-200 dark:bg-gray-800 rounded-r-lg">
										คู่มือ
									</button>
								</div>
								<div className="relative mb-6">
									<form className="mx-auto">
										<label
											htmlFor="id"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											หมวดหมู่ :
										</label>
										<select
											id="id"
											name="category"
											onChange={handleCategoryChange}
											value={formData.category.id}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										>
											<option className="text-gray-500" selected disabled>
												เลือกหมวดหมู่
											</option>
											{categories?.map((category) => (
												<option
													className="text-gray-900"
													key={category.id}
													value={category.id}
												>
													{category.name}
												</option>
											))}
										</select>
										<p className="px-1 text-end text-sm pt-1.5 text-gray-500">
											กรณีไม่มีหมวดหมู่สามารถโพสต์หมวดหมู่ได้{" "}
											<Link
												className="underline text-blue-500"
												href={"/admin/category/post"}
											>
												ที่นี่
											</Link>
										</p>
									</form>
								</div>
							</div>
						</div>
						<div className="flex justify-center space-x-2 pt-2">
							<svg
								onClick={() => setProgessIndex("1")}
								className="w-9 h-9 text-black bg-white rounded-full p-2 dark:text-white"
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
							<svg
								onClick={() => setProgessIndex("3")}
								className="w-9 h-9 text-black bg-white rounded-full p-2 dark:text-white"
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
			</div>
		);
	}
}

export default PostFormPage;
