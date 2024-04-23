import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import { useAuth } from "react-oidc-context";
import axios from "axios";
import conf from "@/conf/main";
import { Category } from "@/modules/category";

export function Landing() {
    return (
        <div className="h-[60vh] landing-image flex flex-col justify-center">
            <div className="text-left lg:pt-10 flex flex-row justify-center items-center space-x-10">
                <div>
                    <h1 className="text-white lg:text-3xl md:text-2xl sm:text-lg font-bold">
                        ทำให้การกรอกเเบบฟอร์มเป็นเรื่องง่าย
                    </h1>
                    <p className="lg:text-xl md:text-lg text-white">
                        ตัวช่วยในการกรอกเเบบฟอร์มของมหาวิทยาลัยสงขลานครินทร์
                    </p>
                    <button
                        type="button"
                        className="mt-6 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        ไปกันเลย !!
                    </button>
                </div>
                <Carousel />
            </div>
        </div>
    );
}

function HomePage() {
    const auth = useAuth();
    const [categoryWithForms, setCategoryWithForms] = useState<Category>([]);
    const fetchFormsByCategory = async () => {
        const listForms = await axios.get(`${conf.urlPrefix}/categories`);
        setCategoryWithForms(listForms.data);
    };

    useEffect(() => {
        fetchFormsByCategory();
    }, [])

    const displayForms = () => {

    }

    return (
        <div>
            <div>
                <Navbar />
            </div>
            {Landing()}
            <div className="flex background-image h-full lg:px-10 lg:pb-10 items-start">
                <div className="flex flex-col">
                {(categoryWithForms) ?
                        categoryWithForms.map((category) => <>
                            <div className="space-y-7">
                                <div className="pt-10 space-x-3 flex flex-row">
                                    <div className="flex space-x-3">
                                        <div className="bg-cyan-600 w-[7vw] rounded-full max-lg:hidden"></div>
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
                                        <span className="text-2xl font-semibold">{category.name}</span>
                                        <div className="bg-cyan-600 w-[70vw] rounded-full"></div>
                                    </div>
                                </div>
                                {category.forms.map((form) =>
                                    <>
                                        <div className="lg:px-24 flex flex-col flex-wrap space-x-5">
                                            <div className="ml-10 pb-1">
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
                                                    <h1>{form.name}</h1>
                                                </Link>
                                            </div>
                                        </div>
                                    </>)}
                                    
                            </div>
                        </>)
                        : <></>}
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default HomePage;
