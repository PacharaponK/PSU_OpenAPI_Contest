import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import React from 'react'

function FormIdPage() {
    const router = useRouter();

    return (
        <div>
            <Navbar />
            <div className='h-screen background-image flex justify-center items-center'>
                {router.query.formId}
            </div>
        </div>
    )
}

export default FormIdPage