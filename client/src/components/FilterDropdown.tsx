"use client";

import { Category, SingleCategory } from "@/modules/category";
import { Dropdown } from "flowbite-react";

interface PropsInterface {
	categories: any;
	categorySelected?: string;
	setCategorySelected: (category: string) => void;
}

export function FilterDropdown(props: PropsInterface) {
	console.log(props);

	return (
		<div className="md:text-2xl text-xl font-medium">
			<Dropdown label={props.categorySelected} inline placement="bottom">
				<Dropdown.Item
					onClick={() => props.setCategorySelected("ฟอร์มทั้งหมด")}
				>
					ฟอร์มทั้งหมด
				</Dropdown.Item>
				{props.categories.map((category: SingleCategory) => (
					<Dropdown.Item
						onClick={() => props.setCategorySelected(category.name)}
						key={category.id}
					>
						{category.name}
					</Dropdown.Item>
				))}
			</Dropdown>
		</div>
	);
}
