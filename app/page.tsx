'use client'
import { useEffect, } from "react";

import LandingPage  from "@/components/LandingPage";
import { Header } from "@/components/Header";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import WatchDescription from "@/components/WatchDescription";
import FeatureButtons from "@/components/FeatureButtons";
import SizeSelection from "@/components/carousel/SizeSelection";
import useHeightScale from "@/hooks/useHeightScale";
import CaseSelection from "@/components/carousel/CaseSelection";
import BandSelection from "@/components/carousel/BandSelection";
import { setIsSideView } from "@/store/slices/uiSlice";
import { parseUrlParams, clearUrlParams } from "@/lib/url-utils"
import { setFullConfiguration } from "@/store/slices/watchSlice"
import Image from "next/image";

function Home() {
const dispatch = useAppDispatch();
  const isLanding = useAppSelector((state) => state.ui.isLanding);
  const isSideView = useAppSelector((state) => state.ui.isSideView);
  const openButton = useAppSelector((state: { ui: { featureButtonOpen: string | null } }) => state.ui.featureButtonOpen);
  const { currentFaceImage, currentBandImage, sideImage } = useAppSelector(
    (state: { watch: { currentFaceImage: string; currentBandImage: string; sideImage: string } }) => state.watch
  );
  const scaleValue = useHeightScale();
  useEffect(() => {
    const urlConfig = parseUrlParams()
    if (urlConfig) {
      const validConfig = {
        collection: urlConfig.collection || '',
        size: urlConfig.size || '',
        case: urlConfig.case || '',
        band: urlConfig.band || ''
      };
      dispatch(setFullConfiguration(validConfig))
      clearUrlParams()
    }
  }, [dispatch])
  return (
    <>
      <Header />
      {isLanding && <LandingPage />}

      <div
        className={`text-center ${
          scaleValue < 0.9 ? "max-h-[50vh]" : "max-h-[60vh]"
        } min-h-60`}
      >
        {openButton === "Size" && <SizeSelection />}
        {openButton === "Case" && <CaseSelection />}
        {openButton === "Band" && <BandSelection />}
        {openButton === null && (
          <div
            className={`h-[45vh] md:h-[50vh] lg:h-[53vh] max-h-[29.88rem] min-h-[18.47rem] m-auto max-w-[300px] md:max-w-[400px] lg:max-w-[500px] w-[42vh] md:w-[48vh] lg:w-[52vh] relative`}
          >
            {!isSideView && (
              <AnimatePresence>
                <motion.div
                  initial={
                    isSideView === null
                      ? {
                          opacity: 0,
                          y: "26rem",
                          
                          top: "4vh",
                          scale: isLanding ? 1.5 : scaleValue,
                        }
                      : { opacity: 0,scale: isLanding ? 1.5 : scaleValue, top: "4vh", }
                  }
                  animate={{
                    opacity: 1,
                    y: isSideView === null ? (isLanding ? "26rem" : 0) : 0,
                    scale: isLanding ? 1.5 : scaleValue,
                    top: "4vh",
                  }}
                  exit={{ opacity: 0 }}
                  transition={
                    isSideView === null
                      ? {
                          duration: 1.2,
                          ease: "easeOut",
                          delay: 0.4,
                        }
                      : {
                          duration: 0.7,
                          ease: "easeInOut",
                        }
                  }
                  style={{ transformOrigin: "top center" }}
                  className="relative overflow-hidden mx-auto max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
                >
                  <div className="relative pt-[133%] md:pt-[110%] lg:pt-[104%]">
                    <Image
                      src={currentBandImage}
                      loading="lazy"
                      height={1000}
              width={1000}
                      alt="watch band preview"
                      className="absolute inset-0 object-contain w-full h-full"
                      style={{ zIndex: isSideView ? 1 : 2, top: isSideView ? '0' : 'auto' }} // Adjust z-index and top position
                    />
                    <Image
                      src={currentFaceImage}
                      loading="lazy"
                      height={1000}
              width={1000}
                      alt="watch case preview"
                      className="absolute inset-0 object-contain w-full h-full"
                      style={{ zIndex: isSideView ? 1 : 2, top: isSideView ? '0' : 'auto' }} // Adjust z-index and top position
                    />
                    {isSideView && (
                      <Image
                        src={sideImage}
                        loading="lazy"
                        height={1000}
              width={1000}
                        alt="watch side view"
                        className="absolute inset-0 object-contain w-full h-full"
                        style={{ zIndex: 3, top: '0' }} // Ensure side view image is on top and positioned correctly
                      />
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {isSideView && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 , scale:0.8, top: "4vh",}}
                  animate={{ scale:0.8 ,top: "4vh",}}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.7,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <Image
                    src={sideImage}
                    height={1000}
                    width={1000}
                    alt="watch side preview"
                    className="object-cover absolute w-[42vh] md:w-[48vh] lg:w-[52vh] max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        )}
      </div>
      {!isLanding && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 1.5, ease: "easeInOut" }}
            className="m-auto flex flex-col pt-[6vh] text-center justify-center items-center font-proTextRegular text-sm   leading-[1.42]"
          >
            <button
              onClick={() =>
                dispatch(setIsSideView(
                   isSideView===null? true : !isSideView
                ))
              }
              className="mb-3 text-[#06c] underline text-xs"
            >
              {isSideView? "Front view" : "Side view"}
            </button>

            <WatchDescription />
            <FeatureButtons />
          </motion.div>
        </>
      )}
    </>
  );
}

export default Home;
