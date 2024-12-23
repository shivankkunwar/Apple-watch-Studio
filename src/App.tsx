import { useState } from "react";
import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import { Header } from "./components/Header";
import { motion } from "framer-motion";

function App() {
  const [currentFace, setCurrentFace] = useState("/face1.png");
  const [currentBand, setCurrentBand] = useState("/band1.jpeg");
  const [isGreeting, setIsGreeting] = useState(true);

  return (
    <>
      <Header />
      <LandingPage />
      <div className="text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: "28rem",
            scale: 2,
            top: "15vh",
          }}
          animate={{
            opacity: 1,
            y: isGreeting ? "28rem" : 0,
            scale: isGreeting ? 2 : 1,
            top: isGreeting ? "15vh" : "4vh",
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: 0.4,
          }}
          className="relative overflow-hidden mx-auto max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
        >
          <div className="relative pt-[133%] md:pt-[110%] lg:pt-[104%]"> 
            <img
              src={currentBand}
              alt="watch band preview"
              className="absolute inset-0 object-contain w-full h-full"
            />
            <img
              src={currentFace}
              alt="watch case preview"
              className="absolute inset-0 object-contain w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default App;