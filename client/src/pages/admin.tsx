import React, { useMemo } from "react";
import Image from "next/image";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { motion, Variants } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import Link from "next/link";
import Head from "next/head";

interface User {
	name: string;
	number: string;
	icon: string;
}

interface HeroProps {
	listUser?: User[];
	signIn: () => void;
}

const Hero: React.FC<HeroProps> = () => {
	const scrollAnimation = useMemo(() => getScrollAnimation(), []);

	return (
		<div className="landing-background-image">
			<Head>
				<title>FormHub : ผู้ดูแล</title>
			</Head>
			<div className="max-w-screen-xl pt-24 px-8 xl:px-16 mx-auto" id="about">
				<ScrollAnimationWrapper>
					<motion.div
						className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
						variants={scrollAnimation}
					>
						<div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1">
							<h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
								<p>เฉพาะผู้ดูแลระบบ</p>
								<strong>PSUFormHub</strong>
							</h1>
							<p className="text-black-500 mt-4 mb-3">
								หากท่านไม่พบบัญชีผู้ใช้หรือต้องการลงทะเบียน
								กรุณาติดต่อสำนักงานเจ้าของระบบ
							</p>
							<Link
								href={"/admin/login"}
								className="bg-blue-900 hover:bg-blue-950 justify-center flex text-white font-bold rounded-xl p-4 w-50 w-4/6 mt-5"
							>
								<p className="text-center mx-auto">เข้าสู่ระบบ</p>
							</Link>
						</div>
						<div className="flex w-full">
							<motion.div className="h-full w-full" variants={scrollAnimation}>
								<Image
									src={"/landing.gif"}
									alt="animation.gif"
									quality={100}
									width={612}
									height={383}
									layout="responsive"
								/>
							</motion.div>
						</div>
					</motion.div>
				</ScrollAnimationWrapper>
				<div className="relative w-full flex">
					<div
						className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
						style={{ filter: "blur(114px)" }}
					></div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
