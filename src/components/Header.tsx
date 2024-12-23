import { motion } from "framer-motion";
import React from "react";
import { FaApple } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";

export const Header = () => {
  const { isLanding } = useSelector((state: any) => state.ui);

  return (
    <header className="header-title m-4 font-bold flex flex-row items-center">
      <div className="flex justify-start items-center flex-grow"> 
        <FaApple className="text-lg align-top" />
        <span className="pt-1 align-middle ml-2">WATCH</span>
      </div>

      {!isLanding && (
        <div className="flex items-center justify-center flex-grow">
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            className="flex items-center tracking-tight justify-center font-proTextRegular text-[17px] space-x-1"
            onClick={() => {}}
          >
            <span>Collections</span>
            <span>
              <IoIosArrowDown size={14} />
            </span>
          </motion.button>
        </div>
      )}
      {!isLanding && (
        <div className="flex justify-end flex-grow"> 
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeIn" }}
            className="font-proTextRegular bg-[#0071e3] px-4 py-2 rounded-full text-[14px] text-white"
            onClick={() => {}}
          >
            Save
          </motion.button>
        </div>
      )}
    </header>
  );
};