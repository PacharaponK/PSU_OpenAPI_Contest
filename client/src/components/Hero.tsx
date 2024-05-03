import React, { useMemo } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";
import Link from "next/link";

interface User {
  name: string;
  number: string;
  icon: string;
}

interface HeroProps {
  listUser?: User[];
  signIn: () => void;
}

const Hero: React.FC<HeroProps> = ({ signIn }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className="max-w-screen-xl pt-24 px-8 xl:px-16 mx-auto" id="about">
      <ScrollAnimationWrapper>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
          variants={scrollAnimation}
        >
          <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
              <strong>PSUFormHub</strong><p>
                ทำให้การกรอกเเบบฟอร์มเป็นเรื่องง่าย
              </p>
            </h1>
            <p className="text-black-500 mt-4 mb-6">
              ครบจบในเว็บเดียว รวบรวมฟอร์มจากคณะต่างๆมาให้เพื่อคุณพร้อมระบบกรอกฟอร์มอัตโนมัติที่จะพาคุณเขียนแบบฟอร์มเสร็จภายในไม่กี่นาที
            </p>
            <button
              className="bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl p-4 w-50 w-4/6 mt-5"
              onClick={signIn}
            >
              <span className="flex items-center justify-center">
                <img
                  className="w-8/12"
                  src={'/PSUOauth.svg'}
                  alt="PSU login button"
                />
              </span>
            </button>
            <Link href={'/form'} className="bg-gray-400 flex justify-center hover:bg-gray-500 text-white font-bold rounded-xl p-4 w-50 w-6/12 mt-5"> 
              <button>
                <span className="flex items-center text-center mx-auto justify-center">
                  เข้าใช้งานโดยไม่ต้องลงทะเบียน
                </span>
              </button>
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
  );
};

export default Hero;
