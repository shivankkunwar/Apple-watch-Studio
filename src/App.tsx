import { useEffect, useState } from "react";
import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import { Header } from "./components/Header";
import { motion } from "framer-motion";
import { useAppSelector } from "./lib/hooks";
import { CollectionDrop } from "./components/CollectionDrop";
import WatchDescription from "./components/WatchDescription";
import FeatureButtons from "./components/FeatureButtons";

function App() {
  const [currentFace, setCurrentFace] = useState("/face1.png");
  const [currentBand, setCurrentBand] = useState("/band1.jpeg");
  const [sideview, setSideView] = useState(false);
  const isLanding = useAppSelector((state) => state.ui.isLanding);

  const [scaleValue, setScaleValue] = useState(2);

  useEffect(() => {
    const calculateScale = () => {
      const screenHeight = window.innerHeight;
      const scale = screenHeight > 800 ? 0.9 : 0.7;
      setScaleValue(scale);
    };

    calculateScale();

    window.addEventListener("resize", calculateScale);

    return () => {
      window.removeEventListener("resize", calculateScale);
    };
  }, []);

  return (
    <>
      <Header />
      {isLanding && <LandingPage />}

      <div
        className={`text-center ${
          scaleValue < 0.9 ? "max-h-[50vh]" : "max-h-[60vh]"
        } min-h-60`}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: "26rem",
            scale: 2,
            top: "7vh",
          }}
          animate={{
            opacity: 1,
            y: isLanding ? "26rem" : 0,
            scale: isLanding ? 1.5 : scaleValue,
            top: isLanding ? -50 : "2vh",
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: 0.4,
          }}
          style={{ transformOrigin: "top center" }}
          className="relative overflow-hidden mx-auto max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
        >
          <div className="relative pt-[133%] md:pt-[110%] lg:pt-[104%]">
            <img
              src={currentBand}
              loading="lazy"
              alt="watch band preview"
              className="absolute inset-0 object-contain w-full h-full"
            />
            <img
              src={currentFace}
              loading="lazy"
              alt="watch case preview"
              className="absolute inset-0 object-contain w-full h-full"
            />
          </div>
        </motion.div>
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
              onClick={() => setSideView(!sideview)}
              className="mb-3 text-[#06c] underline text-xs"
            >
              {sideview ? "Front view" : "Side view"}
            </button>

            <WatchDescription />
            <FeatureButtons />
          </motion.div>
        </>
      )}
    </>
  );
}

export default App;
