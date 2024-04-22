import { useRouter } from 'next/router';
import React from 'react'

function FormIdPage() {
    const router = useRouter();
    console.log(router);
    

    return (
        <div>{router.query.formId}</div>
    )
}

export default FormIdPage