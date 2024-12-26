import { collections } from "@/data/collections";
import { setSize } from "@/store/slices/watchSlice";
import { watchImageSize } from "@/data/collections";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHeightScale from "@/hooks/useHeightScale";

const SizeSelection = () => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const { collection, size } = useSelector((state: any) => state.watch);

  const handleSizeClick = (option: {
    id: string;
    size: string;
    price: number;
  }) => {
    if (!isDragging) {
      dispatch(setSize(option));
      scrollToElement(option.id);
    }
  };

  const scrollToElement = (id: string) => {
    const container = containerRef.current;
    const selected = document.getElementById(`watch-${id}`);
    
    if (container && selected) {
      const containerCenter = container.offsetWidth / 2;
      const selectedRect = selected.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      const scrollPosition = 
        container.scrollLeft + 
        (selectedRect.left - containerRect.left) - 
        containerCenter + 
        (selectedRect.width / 2);

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current!.offsetLeft);
    setScrollLeft(containerRef.current!.scrollLeft);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      snapToNearestWatch();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    snapToNearestWatch();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current!.scrollLeft = scrollLeft - walk;
  };

  const snapToNearestWatch = () => {
    const container = containerRef.current;
    if (!container) return;

    const watches = Array.from(container.getElementsByClassName('watch-option'));
    const containerCenter = container.offsetWidth / 2;
    let closestWatch = watches[0];
    let minDistance = Infinity;

    watches.forEach((watch) => {
      const watchRect = watch.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const watchCenter = watchRect.left - containerRect.left + watchRect.width / 2;
      const distance = Math.abs(watchCenter - containerCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestWatch = watch;
      }
    });

    const watchId = closestWatch.id.replace('watch-', '');
    const sizes = collections.find((opt: any) => opt.id === collection)?.sizes;
    const selectedSize = sizes?.find((s: any) => s.id === watchId);
    
    if (selectedSize) {
      dispatch(setSize(selectedSize));
      scrollToElement(watchId);
    }
  };

  useEffect(() => {
    if (size.id) {
      scrollToElement(size.id);
    }
  }, [size.id, collection]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1,scale:1}}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full"
      >
        <div className="h-[53vh] max-h-[600px] min-h-[314px] overflow-hidden m-auto w-full relative z-10">
          <div
            ref={containerRef}
            className="h-full overflow-x-auto whitespace-nowrap cursor-grab active:cursor-grabbing scroll-smooth hide-scrollbar"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <div className="inline-flex items-center h-full" style={{ padding: '0 calc(50% - 140px)' }}>
              {collections
                .find((opt: any) => opt.id === collection)
                ?.sizes.map((option: any) => {
                  const sizeClass = watchImageSize(option.size);
                  
                  return (
                    <div
                      id={`watch-${option.id}`}
                      className={`watch-option flex-shrink-0 inline-flex items-center justify-center transition-all duration-300`}
                      key={option.id}
                      style={{ width: '312px' }}
                    >
                      <button
                        className="relative flex items-center justify-center w-full h-full"
                        onClick={() => handleSizeClick(option)}
                      >
                        <div className={`relative ${sizeClass}`}>
                          <img
                            src="/band1.jpeg"
                            alt={`${option.size} band`}
                            className="absolute inset-0 w-full h-full object-contain"
                          />
                          <img
                            src="/face1.png"
                            alt={`${option.size} face`}
                            className="absolute inset-0 w-full h-full object-contain"
                          />
                        </div>
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SizeSelection;