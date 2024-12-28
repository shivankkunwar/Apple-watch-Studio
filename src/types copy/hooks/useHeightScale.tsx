import { useState, useEffect } from "react";

interface UseHeightScaleOptions {
  largeScreenThreshold?: number; 
  largeScreenScale?: number; 
  smallScreenScale?: number; 
}

const useHeightScale = ({
  largeScreenThreshold = 800,
  largeScreenScale = 0.9,
  smallScreenScale = 0.7,
}: UseHeightScaleOptions = {}) => {
  const [scaleValue, setScaleValue] = useState(largeScreenScale);

  useEffect(() => {
    const calculateScale = () => {
      const screenHeight = window.innerHeight;
      const scale = screenHeight > largeScreenThreshold
        ? largeScreenScale
        : smallScreenScale;
      setScaleValue(scale);
    };

    calculateScale();

    window.addEventListener("resize", calculateScale);

    return () => {
      window.removeEventListener("resize", calculateScale);
    };
  }, [largeScreenThreshold, largeScreenScale, smallScreenScale]);

  return scaleValue;
};

export default useHeightScale;
