import { AuthContext, ContextProvider } from '@/contexts/Auth.context';
import React, { useContext, useState } from 'react';

export default function LoginPage() {
    // สร้าง state สำหรับเก็บค่า email และ password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authContext = useContext(AuthContext);
    console.log("🚀 ~ LoginPage ~ authContext:", authContext)
    
    const { login = () => {} } = authContext || {}; 

    const handleEmailChange = (e: string) => {
        setEmail(e);
    }

    const handlePasswordChange = (e: string) => {
        setPassword(e);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        console.log(email, password);
        login(email, password);

        // try {
        //     const response = await fetch('loginendpoint', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ email, password })
        //     });

        //     // ตรวจสอบสถานะของ response
        //     if (response.ok) {
        //         // หากสำเร็จ ทำอะไรต่อไปนั้นอยู่ในส่วนของคุณ
        //         console.log('Login successful');
        //     } else {
        //         // หากไม่สำเร็จ ทำอะไรต่อไปนั้นอยู่ในส่วนของคุณ
        //         console.error('Login failed');
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        // }
    }

    return (
        <ContextProvider>
            <div className="landing-background-image flex justify-center items-center h-screen">
                {/* Left: Image */}
                <div className="w-1/2 h-screen hidden lg:block">
                    <img src="/loginPic.png" alt="Placeholder Image" className="object-cover w-full h-full" />
                </div>
                {/* Right: Login Form */}
                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 className="text-2xl font-semibold mb-4">ระบบฐานข้อมูล PSUFormHubs</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Username Input */}
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-600">อีเมลล์</label>
                            <input required type="text" id="username" name="username" value={email} onChange={(e) => handleEmailChange(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
                        </div>
                        {/* Password Input */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600">รหัสผ่าน</label>
                            <input required type="password" id="password" name="password" value={password} onChange={(e) => handlePasswordChange(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
                        </div>
                        {/* Forgot Password Link */}
                        <div className="mb-6 text-gray-500 flex space-x-1">
                            <svg className="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd" />
                            </svg>
                            <p className="">กรณีไม่มีบัญชีหรือลืมรหัสผ่าน กรุณาติดต่อสำนักงานเจ้าของระบบ</p>
                        </div>
                        {/* Login Button */}
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">เข้าสู่ระบบ</button>
                    </form>
                </div>
            </div>
        </ContextProvider>
    )
}
