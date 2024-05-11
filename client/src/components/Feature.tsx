import Image from "next/image";
import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const features = [
	"ระบบกรอกฟอร์มอัตโนมัติให้คุณ",
	"แนะนำฟอร์มที่เกี่ยวกับคุณ",
	"เว็บไซต์ที่รวบรวมแบบฟอร์มไว้",
];

interface FeatureProps {}

const Feature: React.FC<FeatureProps> = () => {
	const scrollAnimation = useMemo(() => getScrollAnimation(), []);

	return (
		<div
			className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
			id="feature"
		>
			<div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 py-8 my-12">
				<ScrollAnimationWrapper className="flex w-full justify-end">
					<motion.div className="h-full w-full p-4" variants={scrollAnimation}>
						<Image
							src={"/landing2.gif"}
							alt=""
							layout="responsive"
							quality={100}
							height={400}
							width={508}
						/>
					</motion.div>
				</ScrollAnimationWrapper>
				<ScrollAnimationWrapper>
					<motion.div
						className="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12"
						variants={scrollAnimation}
					>
						<h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
							เรามีฟีเจอร์หลากหลายให้คุณเลือกใช้
						</h3>
						<p className="my-2 text-black-500">
							คุณสามารถสนุกไปกับการสำรวจฟอร์มที่เรามีและมีฟังก์ชันของแต่ละฟอร์มได้เลย!
						</p>

						<ul className="text-black-500 self-start list-inside ml-8">
							{features.map((feature, index) => (
								<motion.li
									className="relative circle-check custom-list"
									custom={{ duration: 2 + index }}
									variants={scrollAnimation}
									key={feature}
									whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
								>
									<div className="inline-flex items-center">
										<img
											src={"/tickicon.png"}
											className="h-4 w-4 inline-block mr-2"
										/>
										{feature}
									</div>
								</motion.li>
							))}
						</ul>
					</motion.div>
				</ScrollAnimationWrapper>
			</div>
		</div>
	);
};

export default Feature;
