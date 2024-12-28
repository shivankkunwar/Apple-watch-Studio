import { motion } from "framer-motion";
import React from "react";
import { FaApple } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { CollectionDrop } from "./CollectionDrop";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export const Header = () => {
  const dispatch = useAppDispatch()
  const {  isLanding } = useAppSelector(state => state.ui)

  return (
    <header className="header-title m-4 font-bold flex flex-row items-center">
      <div className="flex justify-start items-center flex-grow">
        <FaApple className="text-lg align-top" />
        <span className="pt-1 align-middle ml-2">WATCH</span>
      </div>

      {!isLanding && (
        <div className="flex items-center justify-center flex-grow">
          <div className="flex-1 flex justify-center">
            <CollectionDrop />
          </div>
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
            onClick={() => {
       
            }}
          >
            Save
          </motion.button>
        </div>
      )}
    </header>
  );
};