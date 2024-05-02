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
