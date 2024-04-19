"use client"

import { useParams, useRouter } from 'next/navigation';
import React from 'react'

function page() {
    const router: {} = useParams()
    console.log(router);

    return (
        <div>page</div>
    )
}

export default page