import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import { useAuth } from "react-oidc-context";
import axios from "axios";
import conf from "@/conf/main";
import { Category } from "@/modules/category";
import MultipleSwiper from "@/components/MultipleSlider";
import Image from "next/image";
import { Dropdown } from "flowbite-react";

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
                <Image className="max-md:hidden" src="/form_animation.gif" width={350} height={350} alt="..." />
            </div>
        </div>
    );
}

type DropdownState = {
    [key: string]: boolean;
};

function HomePage() {
    const auth = useAuth();
    const [categoryWithForms, setCategoryWithForms] = useState<Category>([]);
    const fetchFormsByCategory = async () => {
        const listForms = await axios.get(`${conf.urlPrefix}/categories`);
        setCategoryWithForms(listForms.data);
    };
    const [dropdownOpen, setDropdownOpen] = useState<DropdownState>({});

    const toggleDropdown = (categoryId: string) => {
        setDropdownOpen(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId]
        }));
    };

    useEffect(() => {
        fetchFormsByCategory();
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>
            {Landing()}
            <div className="p-5 bg-gradient-to-b from-[#70a3cf] via-white to-white">
                <h1 className="text-2xl md:text-3xl font-bold text-center">ฟอร์มเเนะนำ</h1>
                <MultipleSwiper />
            </div>
            <div className="flex bg-white h-full lg:px-10 pb-10 items-start">
                <div className="flex flex-col">
                    {categoryWithForms && categoryWithForms.map((category: any) => (
                        <div key={category.id} className="space-y-5">
                            <div className="pt-10 space-x-3 flex flex-row justify-between">
                                <div className="flex flex-row space-x-3">
                                    <div className="bg-opacity-65 bg-[#2372b5] w-[6vw] rounded-full max-lg:hidden"></div>
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9 7H7V9H9V7Z" fill="currentColor" />
                                        <path d="M7 13V11H9V13H7Z" fill="currentColor" />
                                        <path d="M7 15V17H9V15H7Z" fill="currentColor" />
                                        <path d="M11 15V17H17V15H11Z" fill="currentColor" />
                                        <path d="M17 13V11H11V13H17Z" fill="currentColor" />
                                        <path d="M17 7V9H11V7H17Z" fill="currentColor" />
                                    </svg>
                                    <span className="text-xl md:text-2xl font-semibold">{category.name}</span>
                                </div>
                                <div className="md:bg-opacity-65 md:bg-[#2371b5] md:w-[63vw] w-[15vw] rounded-full justify-end right flex items-center">
                                    <svg
                                        onClick={() => toggleDropdown(category.id)}
                                        className="mr-5 text-end w-6 h-6 text-black md:text-white hover:text-gray-300 dark:text-white"
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
                                            d="m19 9-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </div>
                            {dropdownOpen[category.id] && (
                                <div className="lg:px-24 flex flex-col flex-wrap space-y-4">
                                {category.forms.map((form: any) => (
                                        <div key={form.id} className="px-5 pb-1">
                                            <Link href={`form/${form.id}`} className="hover:text-gray-700 hover:font-bold flex flex-row items-center">
                                                <svg
                                                    width="30"
                                                    height="30"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M7 18H17V16H7V18Z" fill="currentColor" />
                                                    <path d="M17 14H7V12H17V14Z" fill="currentColor" />
                                                    <path d="M7 10H11V8H7V10Z" fill="currentColor" />
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                                <h1 className="text-sm md:text-base">{form.name}</h1>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default HomePage;
