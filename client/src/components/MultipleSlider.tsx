import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import 'swiper/swiper-bundle.css';

// import required modules
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import Link from 'next/link';

const firstPic: string = "https://media.istockphoto.com/id/1359932120/vector/contract-document-icon-in-flat-style-report-with-folder-vector-illustration-on-isolated.jpg?s=612x612&w=0&k=20&c=eJUJzNLAWNHutYtNiX1x0ORNXMpOriOMH0S4aX0vUm0=";
const secondPic: string = "https://www.shredall.co.uk/cdn/shop/articles/AdobeStock_294459087.jpg?v=1688403076"
const thirdPic: string = "https://nanonets.com/blog/content/images/2022/09/shutterstock_1689740221.jpg"

export default function MultipleSwiper() {
    return (
        <>
            <>
                <Swiper
                    initialSlide={2}
                    autoplay={{
                        delay: 2500,
                    }}
                    autoHeight={true}
                    spaceBetween={10}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        // when window width is >= 640px
                        640: {
                            width: 640,
                            slidesPerView: 1,
                        },
                        // when window width is >= 768px
                        768: {
                            width: 768,
                            slidesPerView: 2,
                        },
                    }}
                    centeredSlidesBounds={true}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper w-11/12 lg:w-10/12 rounded-xl"
                >
                    <div className='flex justify-center items-center align-middle'>
                        <SwiperSlide>
                            <Link href={''}>
                                <div className='lg:pt-3'>
                                    <img src={"/recommendation.jpg"} alt="..." />
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='lg:pt-3'>
                                <img src={"/recommendation_02.jpg"} alt="..." />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='lg:pt-3'>
                                <img src={"/recommendation_03.jpg"} alt="..." />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='lg:pt-3'>
                                <img src={"/recommendation_04.jpg"} alt="..." />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='lg:pt-3'>
                                <img src={"/recommendation_02.jpg"} alt="..." />
                            </div>
                        </SwiperSlide>
                    </div>
                </Swiper>
            </>
        </>
    );
}
