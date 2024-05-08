import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React from 'react'

function PostSelectionPage() {
    return (
        <div className='h-screen background-image'>
            <Navbar />
            <div className='h-screen flex justify-center items-center'>
                <div className='flex flex-col justify-start items-center w-11/12 md:w-2/6 p-5 bg-white rounded-3xl shadow-2xl shadow-[#6ca4ee]'>
                    <h1 className='text-center text-lg md:text-xl lg:text-2xl font-bold pb-5 pt-2'>เลือกข้อมูลที่ต้องการสร้าง</h1>
                    <div className='flex justify-center items-center space-x-5'>
                        <Link href={"/admin/category/post"}>
                            <div className='flex flex-col justify-center hover:cursor-pointer p-2  hover:shadow-2xl rounded-xl text-gray-800 hover:text-black items-center'>
                                <svg className="w-6 h-6 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M5 4a2 2 0 0 0-2 2v1h10.968l-1.9-2.28A2 2 0 0 0 10.532 4H5ZM3 19V9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm9-8.5a1 1 0 0 1 1 1V13h1.5a1 1 0 1 1 0 2H13v1.5a1 1 0 1 1-2 0V15H9.5a1 1 0 1 1 0-2H11v-1.5a1 1 0 0 1 1-1Z" clip-rule="evenodd" />
                                </svg>
                                <p className='text-base font-medium'>โพสต์หมวดหมู่</p>
                            </div>
                        </Link>
                        <Link href={"/admin/form/post"}>
                            <div className='flex flex-col justify-center hover:cursor-pointer p-2  hover:shadow-2xl rounded-xl text-gray-800 hover:text-black items-center'>
                                <svg className="w-6 h-6 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v6.41A7.5 7.5 0 1 0 10.5 22H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z" clip-rule="evenodd" />
                                    <path fill-rule="evenodd" d="M9 16a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm6-3a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z" clip-rule="evenodd" />
                                </svg>
                                <p className='text-base font-medium'>โพสต์หมวดหมู่</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PostSelectionPage