"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useAuth } from 'react-oidc-context'

function Profile() {
    const auth = useAuth();
    const app = useRouter();

    const [studentDetail, setStudentDetail] = useState<any>(null)
    const fectStudentDetail = async () => {
        const result = await axios.get(`https://api-gateway.psu.ac.th/Test/regist/level2/StudentDetailCampus/01/token`, {
            headers: {
                credential: 'api_key=ARdj9JMA3UHQLwABr+Vv5JfuJCBZXr81',
                token: auth.user?.access_token
            }
        })
        setStudentDetail(result.data.data[0])
    }
    useEffect(() => {
        if (auth.isAuthenticated) {
            fectStudentDetail()
        }
    }, [])

    console.log(studentDetail);

    if (!auth.isAuthenticated) {
        return (
            <div>
                Please Login First
            </div>
        )
    }
    return (
        <div>หวัดดี {studentDetail ? studentDetail.studNameThai : '...'}</div>
    )
}

export default Profile