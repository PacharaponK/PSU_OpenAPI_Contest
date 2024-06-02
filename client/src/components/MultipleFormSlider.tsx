import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "swiper/swiper-bundle.css";

// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import Link from "next/link";
import { FormWithCategory } from "@/modules/formWithCategory";
import conf from "@/conf/main";
import { Route } from "@/modules/routes";

export default function MultipleFormSwiper({
	forms,
}: {
	forms: FormWithCategory | undefined;
}) {
	return (
		<>
			<>
				<Swiper
					initialSlide={2}
					autoplay={{
						delay: 2500,
					}}
					autoHeight={true}
					centeredSlides={true}
					pagination={{
						clickable: true,
					}}
					breakpoints={{
						640: {
							slidesPerView: 1,
						},
						768: {
							slidesPerView: 3,
						},
						1024: {
							slidesPerView: 4,
						},
						1280: {
							slidesPerView: 5,
						},
					}}
					centeredSlidesBounds={true}
					modules={[Autoplay, Pagination]}
					className="mySwiper"
				>
					<div className="flex justify-center items-center align-middles">
						{forms?.map((form) => (
							<SwiperSlide key={form.id}>
								<Link href={Route.form.formDetail(form.id)}>
									<div
										key={form.id}
										className="p-1 mb-7 flex flex-wrap items-center justify-center"
									>
										<div
											className="flex-shrink-0 m-4 relative hover:scale-105 transition duration-500 cursor-pointer overflow-hidden bg-blue-400 rounded-lg max-w-xs shadow-lg"
											style={{ width: "250px", height: "300px" }}
										>
											<svg
												className="absolute bottom-0 left-0 mb-8"
												viewBox="0 0 375 283"
												fill="none"
												style={{ transform: "scale(1.5)", opacity: "0.1" }}
											>
												<rect
													x="159.52"
													y="175"
													width="152"
													height="152"
													rx="8"
													transform="rotate(-45 159.52 175)"
													fill="white"
												/>
												<rect
													y="107.48"
													width="152"
													height="152"
													rx="8"
													transform="rotate(-45 0 107.48)"
													fill="white"
												/>
											</svg>
											<div className="relative pt-10 px-10 flex items-center justify-center">
												<div
													className="block absolute md:w-40 md:h-40 w-20 h-20 bottom-0 left-0 -mb-24 ml-3"
													style={{
														background:
															"radial-gradient(black, transparent 60%)",
														transform:
															"rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
														opacity: "0.2",
													}}
												></div>
												<img
													className="relative md:w-28 w-20"
													src={
														form.category.icon
															? `${conf.categoryUrlPrefix}${form.category.icon}`
															: "/mostViewIcon.png"
													}
													alt={form.name}
												/>
											</div>
											<div className="relative text-white it px-6 pb-6 mt-6">
												<span className="block opacity-75 -mb-1">
													{form.category.name}
												</span>
												<div className="flex justify-between">
													<span className="block font-semibold text-xl">
														{form.name.length > 51
															? `${form.name.slice(0, 51)}........`
															: form.name}
													</span>
												</div>
											</div>
										</div>
									</div>
								</Link>
							</SwiperSlide>
						))}
						{/* <SwiperSlide>
                            <Link href={''}>
                                <div className='lg:pt-3'>
                                    <img src={"/recommendation.jpg"} alt="..." />
                                </div>
                            </Link>
                        </SwiperSlide> */}
					</div>
				</Swiper>
			</>
		</>
	);
}
