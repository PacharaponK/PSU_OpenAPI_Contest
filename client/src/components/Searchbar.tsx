import conf from "@/conf/main";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Searchbar() {
	const [showingItem, setShowingItem] = useState<string | null>("");
	const [form, setForm] = useState<any>();
	const [isFocused, setIsFocused] = useState(false);

	const fetchForm = async () => {
		try {
			const listForms = await axios.get(`${conf.urlPrefix}/forms`);
			setForm(listForms.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchForm();
	}, []);

	const data = form?.map((e: any) => ({
		...e,
		name: e.name.toLowerCase(),
		common_name: e.name,
	}));

	const handleShowing = (e: any) => {
		if (!e) {
			setShowingItem(null);
		} else {
			const item = data
				.filter((value: any) => value.name.includes(e))
				.map((value: any) => (
					<li key={value.id}>
						<Link
							href={`form/${value.id}`}
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							{value.common_name}
						</Link>
					</li>
				));

			setShowingItem(item);
		}
	};

	const handleSearchInput = (e: any) => {
		const data = e.toLowerCase();
		handleShowing(data);
	};

	return (
		<>
			<div className="mx-auto flex justify-center items-center">
				<form className="flex items-center justify-center relative">
					<label
						htmlFor="default-search"
						className="text-sm font-medium text-gray-900 sr-only dark:text-white"
					>
						Search
					</label>
					<div className="relative">
						<button className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer">
							<svg
								className="w-4 h-4 text-gray-500 dark:text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg>
						</button>
						<input
							required
							type="search"
							id="default-search"
							className="w-40 lg:w-60 p-2 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="ค้นหาฟอร์ม"
							onChange={(e) => handleSearchInput(e.target.value)}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
						/>
						<div
							id="dropdown"
							onBlur={() => setIsFocused(false)}
							className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full absolute top-full left-0 dark:bg-gray-700"
						>
							{isFocused && showingItem && (
								<ul
									id="style-1"
									style={{ maxHeight: "400px", overflowY: "scroll" }}
									className="py-2 text-sm text-gray-700 dark:text-gray-200"
									aria-labelledby="dropdownDefaultButton"
									onMouseDown={(e) => e.preventDefault()}
								>
									{showingItem}
								</ul>
							)}
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

export default Searchbar;
