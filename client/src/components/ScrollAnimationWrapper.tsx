import { motion, Variants } from "framer-motion";
import React from "react";
import getScrollAnimation from "../utils/getScrollAnimation";

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

const variants: Variants = getScrollAnimation();

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      variants={variants}
      viewport={{ once: true, amount: 0.8 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;
