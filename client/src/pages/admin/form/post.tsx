import Navbar from '@/components/Navbar'
import PostProgressStep from '@/components/PostProgressStep';
import React, { useState, ChangeEvent } from 'react'

function PostFormPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [progressIndex, setProgessIndex] = useState<string>("1");


    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    }

    if (progressIndex === "1") {
        return (
            <div className="h-screen background-image">
                <Navbar />
                <div className="flex flex-col justify-center items-center h-screen w-screen mx-auto ">
                    <div className='w-96 sm:w-6/12'>
                        <PostProgressStep name={"1/3 - อัพโหลดฟอร์ม"} />
                        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-2xl">
                            <div className="mb-10 pt-7 text-center">
                                <h2 className="text-2xl font-semibold mb-2">อัพโหลดฟอร์ม</h2>
                                <p className="text-xs text-gray-500">ไฟล์ควรเป็นนามสกุล .pdf เท่านั้น</p>
                            </div>
                            <form action="#" className="relative w-4/5 h-48 max-w-xs mb-10 bg-gray-50 rounded-lg shadow-inner">
                                <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
                                <label htmlFor="file-upload" className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer">
                                    <p className="z-10 text-xs font-light text-center text-gray-500">{selectedFile ? selectedFile.name : "ลากและวางไฟล์ของคุณที่นี่"}</p>
                                    <svg className="z-10 w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                                    </svg>
                                </label>
                            </form>
                            {selectedFile && (
                                <div className="text-center">
                                    <p className="text-sm pb-5 text-gray-500">ไฟล์ที่เลือก: {selectedFile.name}</p>
                                </div>
                            )}
                        </div>
                        <div className='flex justify-center space-x-2 pt-2'>
                            {/* <svg className="w-9 h-9 text-black bg-white rounded-full p-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
                            </svg> */}
                            <svg onClick={() => setProgessIndex("2")} className="w-9 h-9 text-black bg-white rounded-full p-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (progressIndex === "2") {
        return (
            <div className="h-screen background-image">
                <Navbar />
                <div className="flex flex-col justify-center items-center h-screen w-screen mx-auto ">
                    <div className='w-96 sm:w-6/12'>
                        <PostProgressStep name={"2/3 - เพิ่มรายละเอียด"} />
                        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-2xl">
                            <div className="mb-10 pt-7 text-center">
                                <h2 className="text-2xl font-semibold mb-2">อัพโหลดฟอร์ม</h2>
                                <p className="text-xs text-gray-500">ไฟล์ควรเป็นนามสกุล .pdf เท่านั้น</p>
                            </div>
                            <form action="#" className="relative w-4/5 h-48 max-w-xs mb-10 bg-gray-50 rounded-lg shadow-inner">
                                <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
                                <label htmlFor="file-upload" className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer">
                                    <p className="z-10 text-xs font-light text-center text-gray-500">{selectedFile ? selectedFile.name : "ลากและวางไฟล์ของคุณที่นี่"}</p>
                                    <svg className="z-10 w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                                    </svg>
                                </label>
                            </form>
                            {selectedFile && (
                                <div className="text-center">
                                    <p className="text-sm pb-5 text-gray-500">ไฟล์ที่เลือก: {selectedFile.name}</p>
                                </div>
                            )}
                        </div>
                        <div className='flex justify-center space-x-2 pt-2'>
                            <svg onClick={() => setProgessIndex("1")} className="w-9 h-9 text-black bg-white rounded-full p-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
                            </svg>
                            <svg onClick={() => setProgessIndex("3")} className="w-9 h-9 text-black bg-white rounded-full p-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostFormPage;
