import React, { useState } from 'react';

export default function Stepper({ formDetail }: { formDetail?: string[] }) {
    console.log("🚀 ~ Stepper ~ formDetail:", formDetail)

    return (
        <div>
            <div className='flex flex-col space-y-6 justify-start px-5'>
                <div className='flex space-x-3 items-start'>
                    <svg className="w-6 h-6 text-blue-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd" />
                    </svg>
                    <p className='text-blue-400'>ดาวน์โหลดฟอร์มด้านขวาล่างและดำเนินการขั้นตอน กรณีฟอร์มไม่ถูกต้องหรืออื่นๆให้กดปุ่มเเจ้งปัญหา</p>
                </div>
                {formDetail?.map((detail, index) => (
                    <div key={index}>
                        <div className='flex space-x-3 items-start px-5'>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M5 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm14 18a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4ZM5 11a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H5Zm14 2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4Z" />
                            </svg>
                            <p className='font-bold text-lg text-gray-800'>ขั้นตอนที่ {index + 1}</p>
                        </div>
                        <p className='text-gray-700 pr-14 px-5'>{detail}</p>
                    </div>
                ))}

            </div>
        </div>
    )
}