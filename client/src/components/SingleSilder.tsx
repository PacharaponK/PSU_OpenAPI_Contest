import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import 'swiper/swiper-bundle.css';

// import required modules
import { Mousewheel, Pagination } from 'swiper/modules';

export default function SingleSlider() {
    return (
        <>
            <Swiper
                direction={'vertical'}
                slidesPerView={1}
                spaceBetween={30}
                mousewheel={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Mousewheel, Pagination]}
                className="mySwiper w-1/6"
            >
                <SwiperSlide><div><img src={'https://reg.psu.ac.th/main/wp-content/uploads/2023/05/REG_givecard-01-1920x1280.jpg'} alt="..."></img></div></SwiperSlide>
                <SwiperSlide><div><img src={'https://reg.psu.ac.th/main/wp-content/uploads/2023/05/REG_givecard-02-1920x1920.jpg'} alt="..."></img></div></SwiperSlide>
            </Swiper>
        </>
    );
}