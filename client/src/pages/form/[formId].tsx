import Navbar from '@/components/Navbar';
import conf from '@/conf/main';
import { Form } from '@/modules/form';
import { SingleForm } from '@/modules/singleForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function FormIdPage() {
    const router = useRouter();
    const formId = router.query.formId;
    
    const [form, setForm] = useState<SingleForm>();
    const fetchForm = async () => {
        try {
            const listForms = await axios.get(`${conf.urlPrefix}/forms/${formId}`);
            setForm(listForms.data);
        } catch (error) {
            console.error(error);
            
        }
    };

    useEffect(() => {
        fetchForm();
    }, [router.isReady])

    console.log(form);


    return (
        <div>
            <Navbar />
            <div className='h-screen background-image flex flex-col justify-center items-center'>
                <h1 className='p-3'>{form?.name}</h1>
                <div className='w-1/2 text-left'>
                    <span className='whitespace-pre-line'>{form?.detail}</span>
                </div>
            </div>
        </div>
    )
}

export default FormIdPage