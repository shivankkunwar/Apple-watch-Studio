import { Dialog, DialogContent } from "./ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setIsCollectionDrop } from "@/store/slices/uiSlice";
import { setCollection } from "../store/slices/watchSlice";
import { collections } from "../data/collections";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";

export function CollectionDrop() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isCollectionDrop);
  const currentCollection = useAppSelector((state) => state.watch.collection);

  return (
    <div className="relative">
      <button
        onClick={() => dispatch(setIsCollectionDrop(!isOpen))}
        className="flex items-center gap-2 text-[17px] font-normal tracking-tight"
      >
        <span>Collections</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-[rgba(50,50,50,0.44)]"
              onClick={() => dispatch(setIsCollectionDrop(false))}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed  -translate-x-1/2 top-[120px] left-[3.7rem] md:absolute  md:translate-x-0 md:-left-24 md:top-[40px] z-50 min-w-72 rounded-[18px] bg-white shadow-lg flex flex-col justify-center items-center"
              style={{ maxWidth: "816px" }}
            >
              <div className="px-[16px] w-fit flex flex-col justify-center items-center">
                {collections.map((collection, index) => (
                  <React.Fragment key={collection.id}>
                    <button
                      className={`w-fit py-[18px] text-center font-normal text-base text-[17px] tracking-tight leading-[1.470] ${
                        collection.id === currentCollection
                          ? "text-[#86868b] cursor-default"
                          : "text-[#1d1d1f] hover:text-[#86868b] transition-colors"
                      }`}
                      onClick={() => {
                        if (collection.id !== currentCollection) {
                          dispatch(setCollection(collection.id));
                          dispatch(setIsCollectionDrop(false));
                        }
                      }}
                    >
                      {collection.name}
                    </button>
                    {index < collections.length - 1 && (
                      <div className="h-[1px] bg-[#d2d2d7] w-full" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
