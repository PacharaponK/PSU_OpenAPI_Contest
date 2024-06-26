"use client";

import { Modal } from "flowbite-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import PdfCoordinatePick from "./PdfCoordinatePick";

export default function AppendConfigModal(props: any) {
	const [formData, setFormData] = useState({
		type: {
			code: undefined,
			name: undefined,
		},
		posX: undefined,
		posY: undefined,
		page: undefined,
		data: {
			code: undefined,
			name: undefined,
			mock: undefined,
		},
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.name === "type") {
			const selectedType = props.postData.find(
				(type: any) => type.code === e.target.value
			);
			setFormData({
				...formData,
				[e.target.name]: selectedType,
			});
		}

		if (e.target.name === "data") {
			if (e.target.value == "") {
				setFormData({
					...formData,
					data: {
						name: undefined,
						code: undefined,
						mock: undefined,
					},
				});
			}

			const selectedData = props.studentData.find(
				(data: any) => data.code === e.target.value
			);
			setFormData({
				...formData,
				[e.target.name]: selectedData,
			});
		}
	};

	const handleSubmit = () => {
		if (!formData.type.code || !formData.posX || !formData.posY) {
			toast.error("กรุณากรอกข้อมูลให้ครบ");

			return;
		}
		props.onConfigChange(formData);
		setFormData({
			type: {
				code: undefined,
				name: undefined,
			},
			posX: undefined,
			posY: undefined,
			page: undefined,
			data: {
				code: undefined,
				name: undefined,
				mock: undefined,
			},
		});
		props.setOpenConfigModal(false);
	};

	const handleCloseModal = () => {
		setFormData({
			type: {
				code: undefined,
				name: undefined,
			},
			posX: undefined,
			posY: undefined,
			page: undefined,
			data: {
				code: undefined,
				name: undefined,
				mock: undefined,
			},
		});
		props.setOpenConfigModal(false);
	};

	return (
		<>
			<div>
				<Toaster />
			</div>

			<Modal
				show={props.openConfigModal}
				size={"2xl"}
				onClose={() => handleCloseModal()}
			>
				<Modal.Header>
					<h1>
						{formData.posX && formData.posY && formData.page
							? "เพิ่มรายละเอียดตั้งค่า"
							: "เลือกตำเเหน่งของรายละเอียด"}
					</h1>
				</Modal.Header>
				<Modal.Body className="px-8">
					{formData.posX && formData.posY && formData.page ? (
						<>
							<div className="relative mb-3">
								<form className="mx-auto">
									<label
										htmlFor="type"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										รูปแบบ :
									</label>
									<select
										id="type"
										name="type"
										value={formData.type.code}
										onChange={handleSelectChange}
										required
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									>
										<option
											className="text-gray-500"
											value={""}
											selected
											disabled
										>
											เลือกรูปแบบ
										</option>
										{props.postData.map((type: any) => (
											<option
												key={type.code}
												className="text-gray-900"
												value={type.code}
											>
												{type.name}
											</option>
										))}
									</select>
								</form>
							</div>
							<label
								htmlFor="page"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								หน้า :
							</label>
							<div className="relative mb-3">
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
									type="number"
									id="page"
									name="page"
									required
									value={formData.page}
									onChange={handleInputChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="1"
								/>
							</div>
							<label
								htmlFor="posX"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								ตำเเหน่งแกน X :
							</label>
							<div className="relative mb-3">
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
									type="number"
									id="posX"
									name="posX"
									required
									value={formData.posX}
									onChange={handleInputChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="สูงสุด 595.28"
								/>
							</div>
							<label
								htmlFor="posY"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								ตำเเหน่งแกน Y :
							</label>
							<div className="relative mb-3">
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
									type="number"
									id="posY"
									name="posY"
									value={formData.posY}
									required
									onChange={handleInputChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="สูงสุด 841.89"
								/>
							</div>
							{formData.type.name === "ข้อความ" ? (
								<div>
									<div className="relative mb-3">
										<form className="mx-auto">
											<label
												htmlFor="data"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												ข้อมูล :
											</label>
											<select
												id="data"
												name="data"
												value={formData.data.code}
												onChange={handleSelectChange}
												required
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											>
												<option
													className="text-gray-500"
													value={""}
													selected
													disabled
												>
													เลือกข้อมูล
												</option>
												{props.studentData?.map((data: any) => (
													<option key={data.code} value={data.code}>
														{data.name}
													</option>
												))}
											</select>
										</form>
									</div>
								</div>
							) : (
								<div>
									<div className="relative mb-3">
										<form className="mx-auto">
											<label
												htmlFor="data"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												ข้อมูล :
											</label>
											<select
												id="data"
												name="data"
												value={formData.data.code}
												onChange={handleSelectChange}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											>
												<option
													className="text-gray-500"
													value={""}
													selected
													disabled
												>
													เลือกข้อมูล
												</option>
												{props.studentData?.map((data: any) => (
													<option key={data.code} value={data.code}>
														{data.name}
													</option>
												))}
											</select>
										</form>
									</div>
								</div>
							)}
							<div className="flex justify-center w-full items-end mx-auto">
								<button
									type="button"
									onClick={handleSubmit}
									className="text-white bg-gradient-to-r w-full from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center mb-2"
								>
									บันทึก
								</button>
							</div>
						</>
					) : (
						<PdfCoordinatePick
							file={props.file}
							setFormData={setFormData}
							formData={formData}
						/>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
}
