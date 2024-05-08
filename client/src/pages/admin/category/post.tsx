import React, { useState, ChangeEvent, useRef } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import ax from "@/conf/ax";
import conf from "@/conf/main";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
	categoryName: string | undefined;
	criterion: string | undefined;
	image: File | null;
}

export default function PostCategoryPage() {
	const [formData, setFormData] = useState<FormData>({
		categoryName: undefined,
		criterion: undefined,
		image: null,
	});

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		if (value == "") {
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

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		setFormData((prevData) => ({
			...prevData,
			image: file || null,
		}));
	};

	const createCategory = async (formData: FormData) => {
		try {
			const response = await ax.post(`${conf.urlPrefix}/categories`, {
				name: formData.categoryName,
				criterion: formData.criterion,
			});
			console.log(response);
			if (formData.image) {
				const onSendFormData = new FormData();
				onSendFormData.append("file", formData.image);
				onSendFormData.append("id", response.data.id);
				const updatePicResponse = await ax.post(
					`${conf.urlPrefix}/categories/upload-icon-category`,
					onSendFormData
				);
				console.log(updatePicResponse);
			}
			toast.success("บันทึกสำเร็จ!!");
		} catch (error) {
			toast.error("บันทึกไม่สำเร็จ!!");
			return error;
		}
	};

	const handleSubmit = async () => {
		createCategory(formData);
	};

	return (
		<div className="h-screen background-image">
			<Navbar />
			<div>
				<Toaster />
			</div>
			<div className="h-screen flex justify-center items-center">
				<div className="flex flex-col items-center w-11/12 lg:w-3/6 p-5 bg-white rounded-3xl shadow-2xl shadow-[#6ca4ee]">
					<h1 className="text-center text-lg md:text-xl lg:text-2xl font-bold pb-1 pt-3">
						โพสต์หมวดหมู่
					</h1>
					<div className="w-full px-5 py-5">
						<label
							htmlFor="name"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							ชื่อหมวดหมู่ :
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
								name="categoryName"
								value={formData.categoryName}
								onChange={handleInputChange}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="ฟอร์มคณะ......"
								required
							/>
						</div>
						<label
							htmlFor="criterion"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							เฉพาะนักเรียน :
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
								id="criterion"
								name="criterion"
								value={formData.criterion}
								onChange={handleInputChange}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="คณะวิทยาศาสตร์......"
							/>
						</div>
						<label
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							htmlFor="file_input"
						>
							อัพโหลดรูปภาพ :
						</label>
						<input
							className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
							id="file_input"
							type="file"
							onChange={handleImageChange}
						/>
					</div>
					<div className="flex justify-end w-full items-end px-3">
						<button
							type="button"
							onClick={handleSubmit}
							className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
						>
							บันทึก
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
