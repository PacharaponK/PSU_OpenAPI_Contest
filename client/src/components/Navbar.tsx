import { redirect, useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "react-oidc-context";

export const PSU: string =
    "https://cdn.discordapp.com/attachments/705005230944813076/1227656307041894472/5.png?ex=66293308&is=6616be08&hm=0fe6e1f656c261047f82ecc38a43c9f240af42f8ba2d8bd27697d111002d2e46&";

function Navbar() {
    const auth = useAuth();
    const app = useRouter();

    function Logout() {
        auth.signoutSilent();
        app.push('/');
    }

    if (auth.isAuthenticated) {
        return (
            <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
                <div className="px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex shrink-0">
                            <a aria-current="page" className="flex items-center" href="/">
                                <img className="h-10 w-auto" src={PSU} alt="" />
                                <p></p>
                            </a>
                        </div>
                        <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                            {/* <a aria-current="page"
                                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                                href="#">How it works</a>
                            <a className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                                href="#">Pricing</a> */}
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <a
                                className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                                href="/profile"
                            >
                                โปรไฟล์
                            </a>
                            <button
                                type="button"
                                onClick={() => Logout()}
                                className="inline-flex items-center justify-center rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                ออกจากระบบ
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
    if (!auth.isAuthenticated) {
        return (
            <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
                <div className="px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex shrink-0">
                            <a aria-current="page" className="flex items-center" href="/">
                                <img className="h-10 w-auto" src={PSU} alt="" />
                                <p></p>
                            </a>
                        </div>
                        <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                            {/* <a aria-current="page"
                                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                                href="#">How it works</a>
                            <a className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                                href="#">Pricing</a> */}
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <a
                                className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                                href="/login"
                            >
                                สำรวจฟอร์ม
                            </a>
                            <button
                                type="button"
                                onClick={() => auth.signinRedirect()}
                                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                เข้าสู่ระบบ
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

}




export default Navbar;
