import React, { useState } from 'react';

export const items = [
    {
        title: 'ขั้นตอนที่ 1',
        description: 'แบบฟอร์มคำร้องทั่วไป ใช้ในกรณีพิเศษ ที่นอกเหนือจากคำร้องที่มีอยู่แล้ว เช่น การลงทะเบียนเรียนสาย และเพิ่ม - ถอนวิชาเรียน กรณีพิเศษ เป็นต้น',
    },
    {
        title: 'ขั้นตอนที่ 2',
        description: 'รับแบบฟอร์มคำร้องทั่วไป จากตู้แบบฟอร์มฝ่ายทะเบียนและประมวลผล หรือดาวน์โหลดจาก Website: http://reg.psu.ac.th',
    },
    {
        title: 'ขั้นตอนที่ 3',
        description: 'รายละเอียดการกรอกและขั้นตอนการดำเนินการ (3.1 กรอกรายละเอียดให้ครบถ้วน ชัดเจนและถูกต้อง 3.2 ติดต่ออาจารย์ที่ปรึกษา เพื่อให้ความเห็นชอบ 3.3 ยื่นคำร้อง ที่ฝ่ายทะเบียนและประมวลผล 3.4 ติดต่อผลตามระยะเวลาที่กำหนด)',
    },
]

export default function Stepper() {
    return (
        <div>
            <div className='flex flex-col space-y-6 justify-start px-10'>
                <div>
                    <div className='flex space-x-3 items-start'>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm14 18a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4ZM5 11a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H5Zm14 2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4Z" />
                        </svg>
                        <p className='font-bold text-lg text-gray-800'>ขั้นตอนที่ 1</p>
                    </div>
                    <p className='text-gray-700 pr-14'>แบบฟอร์มคำร้องทั่วไป ใช้ในกรณีพิเศษ ที่นอกเหนือจากคำร้องที่มีอยู่แล้ว เช่น การลงทะเบียนเรียนสาย และเพิ่ม - ถอนวิชาเรียน กรณีพิเศษ เป็นต้น</p>
                </div>
                <div>
                    <div className='flex space-x-3 items-start'>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm14 18a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4ZM5 11a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H5Zm14 2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4Z" />
                        </svg>
                        <p className='font-bold text-lg text-gray-800'>ขั้นตอนที่ 2</p>
                    </div>
                    <p className='text-gray-700 pr-14'>รับแบบฟอร์มคำร้องทั่วไป จากตู้แบบฟอร์มฝ่ายทะเบียนและประมวลผล หรือดาวน์โหลดจาก Website: http://reg.psu.ac.th</p>
                </div>
                <div>
                    <div className='flex space-x-3 items-start'>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm14 18a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4ZM5 11a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H5Zm14 2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4Z" />
                        </svg>
                        <p className='font-bold text-lg text-gray-800'>ขั้นตอนที่ 3</p>
                    </div>
                    <p className='text-gray-700 pr-14'>รายละเอียดการกรอกและขั้นตอนการดำเนินการ (3.1 กรอกรายละเอียดให้ครบถ้วน ชัดเจนและถูกต้อง 3.2 ติดต่ออาจารย์ที่ปรึกษา เพื่อให้ความเห็นชอบ 3.3 ยื่นคำร้อง ที่ฝ่ายทะเบียนและประมวลผล 3.4 ติดต่อผลตามระยะเวลาที่กำหนด)</p>
                </div>
            </div>

        </div>
    )
}