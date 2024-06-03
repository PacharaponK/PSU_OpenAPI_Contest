import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import conf from "@/conf/main";
import { Category, SingleCategory } from "@/modules/category";
import MultipleSwiper from "@/components/MultipleSlider";
import Image from "next/image";
import ax from "@/conf/ax";
import { adminRoute, Route } from "@/modules/routes";
import { FilterDropdown } from "@/components/FilterDropdown";
import Head from "next/head";
import ModalEditCategory from "@/components/ModalEditCategory";

export function Landing() {
	return (
		<div className="md:h-[60vh] h-[50vh] landing-image flex flex-col justify-center">
			<div className="lg:text-left text-center lg:pt-10 pt-20 max-md:p-5 flex max-md:flex-col justify-center items-center space-x-10">
				<div>
					<h1 className="text-white lg:text-3xl md:text-2xl sm:text-lg font-bold">
						ทำให้การกรอกเเบบฟอร์มเป็นเรื่องง่าย
					</h1>
					<p className="lg:text-xl md:text-lg text-white">
						ตัวช่วยในการกรอกเเบบฟอร์มของมหาวิทยาลัยสงขลานครินทร์
					</p>
					<button
						type="button"
						className="mt-6 max-md:hidden text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
					>
						ไปกันเลย !!
					</button>
				</div>
				<Image
					className="max-md:hidden"
					src="/form_animation.gif"
					width={350}
					height={350}
					alt="..."
				/>
			</div>
		</div>
	);
}

type DropdownState = {
	[key: string]: boolean;
};

function HomePage() {
	const [categoryWithForms, setCategoryWithForms] = useState<Category>([]);
	const [categorySelected, setCategorySelected] =
		useState<string>("ฟอร์มทั้งหมด");
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [type, setType] = useState<string>("");
	const [onEditCategory, setOnEditCategory] = useState<SingleCategory>();

	const fetchFormsByCategory = async () => {
		const listForms = await ax.get(`${conf.urlPrefix}/categories`);
		setCategoryWithForms(listForms.data);
	};

	const handleOpenModal = (type: string, category: SingleCategory) => {
		setOpenModal(true);
		setType(type);
		setOnEditCategory(category);
	};

	useEffect(() => {
		fetchFormsByCategory();
	}, []);

	return (
		<div>
			<Head>
				<title>FormHub : ฟอร์ม</title>
			</Head>
			<div>
				<Navbar />
			</div>
			{Landing()}
			<div className="">
				<div className="mt-5">
					<div className="flex max-md:flex-wrap px-5 space-x-5 justify-around items-center">
						<h1 className="text-2xl md:text-2xl font-medium ">
							หมวดหมู่ทั้งหมด
						</h1>
						<hr className="w-8/12 h-2 mx-auto my-4 bg-[#64b8fd] border-0 rounded md:my-10 dark:bg-gray-700" />
						<div className="relative text-gray-600 focus-within:text-gray-400">
							<span className="absolute inset-y-0 left-0 flex items-center pl-2">
								<button
									type="submit"
									className="p-1 focus:outline-none focus:shadow-outline"
								>
									<svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										strokeWidth="2"
										viewBox="0 0 24 24"
										className="w-6 h-6"
									>
										<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
									</svg>
								</button>
							</span>
							<input
								type="search"
								name="q"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="py-2 text-sm max-md:w-11/12  bg-white text-black rounded-full pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
								placeholder="ค้นหาหมวดหมู่"
							/>
						</div>
					</div>
					<div className="grid lg:grid-cols-5 md:grid-cols-3 gap-5 px-20">
						{categoryWithForms.map((category) => (
							<div
								key={category.id}
								className="relative bg-gradient-to-b from-gray-100 to-blue-400 h-64 w-64 mx-auto px-5 mt-5 py-8 group rounded-3xl overflow-hidden shadow-xl"
							>
								<img
									src={
										category.icon
											? `${conf.categoryUrlPrefix}${category.icon}`
											: "/mostViewIcon.png"
									}
									alt={category.name}
									className="p-16 absolute w-full h-full inset-0 object-cover"
								/>
								<div className="absolute inset-0 w-full h-full rounded-3xl bg-black bg-opacity-0 transition duration-500 backdrop-filter group-hover:bg-opacity-20 group-hover:backdrop-blur"></div>
								<div className="absolute inset-x-5 text-white">
									<h2 className="text-xl text-black font-semibold mb-2">
										{category.name}
									</h2>
									<p className="hidden group-hover:block text-sm font-medium uppercase tracking-wider mb-6">
										เฉพาะนักศึกษา: {category.criterion ?? "ไม่ระบุ"}
									</p>
								</div>
								<button
									onClick={() => handleOpenModal("ลบหมวดหมู่", category)}
									className="text-white absolute inset-x-5 bottom-16 py-3 rounded-2xl font-semibold bg-red-500 shadow-lg hidden transition duration-200 hover:bg-red-700 group-hover:block"
								>
									ลบ
								</button>
								<button
									onClick={() => handleOpenModal("แก้ไขหมวดหมู่", category)}
									className="absolute inset-x-5 bottom-3 py-3 rounded-2xl font-semibold bg-white shadow-lg hidden transition duration-200 hover:bg-gray-300 group-hover:block"
								>
									แก้ไข
								</button>
							</div>
						))}
					</div>
					<ModalEditCategory
						openModal={openModal}
						setOpenModal={setOpenModal}
						type={type}
						category={onEditCategory}
					/>
				</div>
				<div className="flex-col bg-white h-full px-4 py-10 items-start">
					<div className="flex max-md:flex-wrap px-5 space-x-5 justify-around items-center">
						{/* <h1 className="text-2xl md:text-3xl font-bold w-full">ฟอร์มทั้งหมด</h1> */}
						<FilterDropdown
							categories={categoryWithForms}
							categorySelected={categorySelected}
							setCategorySelected={setCategorySelected}
						/>
						<hr className="w-8/12 h-2 mx-auto my-4 bg-[#64b8fd] border-0 rounded md:my-10 dark:bg-gray-700" />
						<div className="relative text-gray-600 focus-within:text-gray-400">
							<span className="absolute inset-y-0 left-0 flex items-center pl-2">
								<button
									type="submit"
									className="p-1 focus:outline-none focus:shadow-outline"
								>
									<svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										strokeWidth="2"
										viewBox="0 0 24 24"
										className="w-6 h-6"
									>
										<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
									</svg>
								</button>
							</span>
							<input
								type="search"
								name="q"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="py-2 text-sm max-md:w-11/12  bg-white text-black rounded-full pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
								placeholder="ค้นหาฟอร์ม"
							/>
						</div>
					</div>
					<div className="p-2 px-3 flex flex-wrap items-center justify-center">
						{categoryWithForms &&
							categoryWithForms.map((category: SingleCategory) =>
								category.forms.map((form: any) => {
									if (
										(category.name === categorySelected ||
											categorySelected === "ฟอร์มทั้งหมด") &&
										(form.name
											.toLowerCase()
											.includes(searchQuery.toLowerCase()) ||
											category.name
												.toLowerCase()
												.includes(searchQuery.toLowerCase()))
									) {
										return (
											<Link
												href={adminRoute.form.formDetail(form.id)}
												key={form.id}
											>
												<div
													key={form.id}
													className="p-1 flex flex-wrap items-center justify-center"
												>
													<div
														className="flex-shrink-0 m-4 relative hover:scale-105 transition duration-500 cursor-pointer overflow-hidden bg-blue-400 rounded-lg max-w-xs shadow-lg"
														style={{ width: "250px", height: "350px" }}
													>
														<svg
															className="absolute bottom-0 left-0 mb-8"
															viewBox="0 0 375 283"
															fill="none"
															style={{
																transform: "scale(1.5)",
																opacity: "0.1",
															}}
														>
															<rect
																x="159.52"
																y="175"
																width="152"
																height="152"
																rx="8"
																transform="rotate(-45 159.52 175)"
																fill="white"
															/>
															<rect
																y="107.48"
																width="152"
																height="152"
																rx="8"
																transform="rotate(-45 0 107.48)"
																fill="white"
															/>
														</svg>
														<div className="relative pt-10 px-10 flex items-center justify-center">
															<div
																className="block absolute md:w-40 md:h-40 w-20 h-20 bottom-0 left-0 -mb-24 ml-3"
																style={{
																	background:
																		"radial-gradient(black, transparent 60%)",
																	transform:
																		"rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
																	opacity: "0.2",
																}}
															></div>
															<img
																className="relative md:w-28 w-20"
																src={
																	category.icon
																		? `${conf.categoryUrlPrefix}${category.icon}`
																		: "/mostViewIcon.png"
																}
																alt={category.name}
															/>
														</div>
														<div className="relative text-white it px-6 pb-6 mt-6">
															<span className="block opacity-75 -mb-1">
																{category.name}
															</span>
															<div className="flex justify-between">
																<span className="block font-semibold text-xl">
																	{form.name.length > 70
																		? `${form.name.slice(0, 70)}........`
																		: form.name}
																</span>
															</div>
														</div>
													</div>
												</div>
											</Link>
										);
									} else {
										return null; // ไม่แสดงฟอร์มที่ไม่ตรงกับ category ที่ถูกเลือก หรือไม่ตรงกับคำค้นหา
									}
								})
							)}
					</div>
				</div>
				<div className="p-5">
					{/* <h1 className="text-2xl md:text-3xl font-bold text-center">ฟอร์มเเนะนำ</h1> */}
					<MultipleSwiper />
				</div>
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
}

export default HomePage;
