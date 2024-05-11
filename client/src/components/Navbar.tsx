"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { useAuth } from "react-oidc-context";
import { AuthContext, ContextProvider } from "@/contexts/Auth.context";
import Image from "next/image";
import { useStudentContext } from "../contexts/StudentContext";
import Link from "next/link";
import PSU from "../../public/PSU_Logo.png";
import Searchbar from "./Searchbar";

function Navbar() {
	const router = useRouter();
	const authContext = useContext(AuthContext);
	const { studentImage } = useStudentContext();
	const auth = useAuth();
	const app = useRouter();

	const adminLogout = () => {
		authContext?.logout();
		router.push("/admin/login");
	};

	function Logout() {
		auth.signoutSilent();
		app.push("/");
	}

	if (authContext?.state.isLoggedIn) {
		return (
			<header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
				<div className="px-4">
					<div className="flex items-center justify-between">
						<div className="flex shrink-0">
							<Link
								aria-current="page"
								className="flex items-center"
								href="/admin/form"
							>
								<Image className="h-7 w-auto" src={PSU} alt="" />
							</Link>
						</div>
						<div className="hidden md:flex md:items-center md:justify-center md:gap-5"></div>
						<div className="flex items-center justify-end gap-3">
							<Link
								className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
								href={"/admin/form/post-selection"}
							>
								โพสต์
							</Link>
							<Link
								className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
								href={"/admin/form/feedback"}
							>
								การตอบกลับ
							</Link>
							<button
								type="button"
								onClick={() => adminLogout()}
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

	if (auth.isAuthenticated) {
		return (
			<header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
				<div className="px-4">
					<div className="flex items-center justify-between">
						<div className="flex shrink-0">
							<Link
								aria-current="page"
								className="flex items-center"
								href="/form"
							>
								<Image className="h-7 w-auto" src={PSU} alt="" />
								<p></p>
							</Link>
						</div>
						<div className="hidden md:flex md:items-center md:justify-center md:gap-5"></div>
						<div className="flex items-center justify-end gap-3">
							<div className="max-sm:hidden">
								<Searchbar />
							</div>
							<Link
								className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
								href="/profile"
							>
								โปรไฟล์
							</Link>
							<button
								type="button"
								onClick={() => Logout()}
								className="inline-flex items-center justify-center rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
							>
								ออกจากระบบ
							</button>
							<div className="h-10 w-10 relative">
								{studentImage && studentImage.pictureBase64 && (
									<Image
										src={`data:image/png;base64,${studentImage.pictureBase64}`}
										alt=""
										layout="fill"
										className="rounded-full"
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}

	if (!auth.isAuthenticated) {
		return (
			<ContextProvider>
				<header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
					<div className="px-4">
						<div className="flex items-center justify-between">
							<div className="flex shrink-0">
								<Link
									aria-current="page"
									className="flex items-center"
									href="/form"
								>
									<Image className="h-7 w-auto" src={PSU} alt="" />
									<p></p>
								</Link>
							</div>
							<div className="hidden md:flex md:items-center md:justify-center md:gap-5">
								{/* <a aria-current="page"
                                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                                href="#">How it works</a>
                            <a className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                                href="#">Pricing</a> */}
							</div>
							<div className="max-sm:hidden">
								<Searchbar />
							</div>
							<div className="flex items-center justify-end gap-3">
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
			</ContextProvider>
		);
	}
}

export default Navbar;
