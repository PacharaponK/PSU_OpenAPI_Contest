"use client";

import { Carousel } from "flowbite-react";

const firstPic:string = "https://media.istockphoto.com/id/1359932120/vector/contract-document-icon-in-flat-style-report-with-folder-vector-illustration-on-isolated.jpg?s=612x612&w=0&k=20&c=eJUJzNLAWNHutYtNiX1x0ORNXMpOriOMH0S4aX0vUm0=";
const secondPic:string = "https://www.shredall.co.uk/cdn/shop/articles/AdobeStock_294459087.jpg?v=1688403076"
const thirdPic:string = "https://nanonets.com/blog/content/images/2022/09/shutterstock_1689740221.jpg"

export default function HomeCarousel() {
    return (
        <div className="lg:w-4/12 lg:h-56 max-lg:hidden">
            <Carousel>
                <img src={firstPic} alt="..." />
                <img src={secondPic} alt="..." />
                <img src={thirdPic} alt="..." />
            </Carousel>
        </div>
    );
}