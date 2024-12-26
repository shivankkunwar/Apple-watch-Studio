import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collections } from "@/data/collections";
import { setFace } from "@/store/slices/watchSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CaseSlider = () => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const { currentCaseImage, currentBandImage, size, collection } = useSelector(
    (state: any) => state.watch
  );

  const collectionCases = collections.find((col) => col.id === collection);
  const allVariations = collectionCases?.cases.flatMap(
    (caseCategory) => caseCategory.variations
  );

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const getCurrentIndex = () => {
    if (!containerRef.current) return 0;
    const scrollPosition = containerRef.current.scrollLeft;
    return Math.round(scrollPosition / 312);
  };

  const scrollToIndex = (index: number) => {
    if (!containerRef.current || !allVariations) return;
    const maxIndex = allVariations.length - 1;
    const safeIndex = Math.max(0, Math.min(index, maxIndex));
    const scrollPosition = safeIndex * 312;
    
    containerRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  const handleNavigationClick = (direction: 'next' | 'prev') => {
    if (isScrolling) return;

    setIsScrolling(true);
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    const currentIndex = getCurrentIndex();
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    scrollToIndex(newIndex);

    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 500); // Prevent rapid clicks for 500ms
  };

  const handleCaseClick = (variation: any, mainCase: any) => {
    if (isScrolling) return;

    // dispatch(
    //   setFace({
    //     subCase: variation,
    //     mainCase,
    //   })
    // );
    scrollToElement(variation.id);
  };

  const scrollToElement = (id: string) => {
    if (isScrolling) return;

    const selected = document.getElementById(`case-${id}`);
    if (!selected || !containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const selectedRect = selected.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    const scrollPosition = 
      container.scrollLeft + 
      selectedRect.left - 
      containerRect.left - 
      (containerWidth / 2) + 
      (selectedRect.width / 2);

    setIsScrolling(true);
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleScrollEnd = () => {
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        scrollTimeout.current = setTimeout(() => {
          setIsScrolling(false);
          handleScroll();
        }, 150);
      };

      container.addEventListener('scroll', handleScrollEnd);
      container.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => {
        container.removeEventListener('scroll', handleScrollEnd);
        container.removeEventListener('scroll', handleScroll);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
      };
    }
  }, []);

  useEffect(() => {
    const selectedElement = allVariations?.find(
      (variation) => variation.image === currentCaseImage
    );

    if (selectedElement) {
      scrollToElement(selectedElement.id);
    }
  }, [currentCaseImage, collection]);

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full"
      >
        <div className="h-[53vh] max-h-[508px] min-h-[314px] overflow-hidden m-auto w-full relative z-10">
          {showLeftButton && (
            <button
              onClick={() => !isScrolling && handleNavigationClick('prev')}
              disabled={isScrolling}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 ${
                isScrolling ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Previous case"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {showRightButton && (
            <button
              onClick={() => !isScrolling && handleNavigationClick('next')}
              disabled={isScrolling}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 ${
                isScrolling ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Next case"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
          <div
            ref={containerRef}
            className="h-full overflow-x-auto whitespace-nowrap scroll-smooth hide-scrollbar"
          >
            <div 
              className="inline-block h-full"
              style={{ padding: '0 calc(50vw - 155px)' }}
            >
              {allVariations?.map((variation) => {
                const mainCase = collectionCases?.cases.find((c) =>
                  c.variations.some((v) => v.id === variation.id)
                );
                
                return (
                  <div
                    id={`case-${variation.id}`}
                    className="inline-block h-full align-middle"
                    key={variation.id}
                    style={{ width: '312px' }}
                  >
                    <div className="flex items-center justify-center h-full px-6">
                      <button
                        className="relative flex items-center justify-center w-full h-full"
                        onClick={() => handleCaseClick(variation, mainCase)}
                        
                      >
                        <img
                          src={'/face1.png'}
                          alt={variation.name}
                          className="w-[52vh] max-w-[500px] object-contain"
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 h-[53vh] max-w-[500px] w-[52vh]">
          <img
            src={'band1.jpeg'}
            alt="watch band"
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CaseSlider;