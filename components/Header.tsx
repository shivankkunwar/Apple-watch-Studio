
import { FaApple } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { motion } from "framer-motion";
import { CollectionDrop } from "./CollectionDrop";
import { SaveModal } from "./SaveModal"
import { useState } from "react";

export const Header = () => {
  const dispatch = useAppDispatch();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
  const { isLanding } = useAppSelector(state => state.ui);

  return (
    <header className="header-title m-4 font-bold p-2">
      
      <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-4">
        
        <div className="flex justify-center md:justify-start md:items-center md:flex-grow">
          <div className="flex items-center">
            <FaApple className="text-lg align-top h-[20px]" />
            <span className="pt-1 text-xl">WATCH</span>
          </div>
        </div>

        {!isLanding && (
          <div className="flex justify-between items-center mt-4 md:mt-0 md:flex-grow">
           
            <div className="md:flex md:items-center md:justify-center md:flex-grow">
              <div className="md:flex-1 md:flex md:justify-start">
                <CollectionDrop />
              </div>
            </div>

        
            <div className="md:flex md:justify-end md:flex-grow">
              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeIn" }}
                className="font-normal bg-[#0071e3] px-4 py-2 rounded-full text-[14px] text-white"
                onClick={() => setIsSaveModalOpen(true)}
              >
                Save
              </motion.button>
            </div>
          </div>
        )}
      </div>
      <SaveModal 
        isOpen={isSaveModalOpen} 
        onClose={() => setIsSaveModalOpen(false)} 
      />
    </header>
  );
};
export default Header;