import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collections } from "@/data/collections";
import { setFace } from "@/store/slices/watchSlice";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { setIsSideView } from "@/store/slices/uiSlice";
import Image from "next/image";
import { RootState } from "@/store/store";
import { Case, variations } from "@/types/watch";

const CaseSelection = () => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const transitionTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const { isSideView } = useSelector((state: RootState) => state.ui);
  const { currentFaceImage, currentBandImage, collection, mainFace, selectedFace, selectedBand } = useSelector(
    (state: RootState) => state.watch
  );

  const collectionCases = collections.find((col) => col.id === collection);
  const allVariations = collectionCases?.cases.flatMap(
    (caseCategory) => caseCategory.variations
  );

  const collectionList = collections
      .find((opt) => opt.id === collection)
      ?.cases.find((s) => s.id === mainFace.id);

  const variationsList = collectionList?.variations;

  const selected = variationsList?.find((s) => s.id === selectedFace.id);
  const [selectedCaseId, setSelectedCaseId] = useState<string | undefined>(selected?.id);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft } = containerRef.current;
      const currentIndex = Math.round(scrollLeft / 312);
      const maxIndex = allVariations ? allVariations.length - 1 : 0;
      
      setShowLeftButton(currentIndex > 0);
      setShowRightButton(currentIndex < maxIndex);
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
    if (isScrolling || isTransitioning) return;

    setIsScrolling(true);
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    const currentIndex = getCurrentIndex();
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (allVariations && newIndex >= 0 && newIndex < allVariations.length) {
      const variation = allVariations[newIndex];
      const mainCase = collectionCases?.cases.find((c) =>
        c.variations?.some((v) => v.id === variation?.id)
      );
      setSelectedCaseId(variation?.id);
      if (variation && mainCase) {
        dispatch(
          setFace({
            subCase: variation,
            mainCase,
          })
        );
      }
    }
    
    if (isSideView) {
      setIsTransitioning(true);
      dispatch(setIsSideView(false));
      // Wait for side view transition to complete before scrolling
      transitionTimeout.current = setTimeout(() => {
        scrollToIndex(newIndex);
        setIsTransitioning(false);
      }, 300);
    } else {
      scrollToIndex(newIndex);
    }

    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };

  const handleCaseClick = (variation: variations, mainCase: Case) => {
    if (isScrolling || isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (isSideView) {
      // First disable side view and wait for transition
      dispatch(setIsSideView(false));
      transitionTimeout.current = setTimeout(() => {
        setSelectedCaseId(variation.id);
        dispatch(
          setFace({
            subCase: variation,
            mainCase,
          })
        );
        scrollToElement(variation.id);
        setIsTransitioning(false);
      }, 300);
    } else {
      setSelectedCaseId(variation.id);
      dispatch(
        setFace({
          subCase: variation,
          mainCase,
        })
      );
      scrollToElement(variation.id);
      setIsTransitioning(false);
    }
  };

  const scrollToElement = (id: string) => {
    if (isScrolling || isTransitioning) return;

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
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const selectedElement = allVariations?.find(
      (variation) => variation?.image === currentFaceImage
    );
    if (selectedElement) {
      setSelectedCaseId(selectedElement.id);
      scrollToElement(selectedElement.id);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFaceImage, collection]);

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current);
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
              onClick={() => !isScrolling && !isTransitioning && handleNavigationClick('prev')}
              disabled={isScrolling || isTransitioning}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 ${
                (isScrolling || isTransitioning) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Previous case"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {showRightButton && (
            <button
              onClick={() => !isScrolling && !isTransitioning && handleNavigationClick('next')}
              disabled={isScrolling || isTransitioning}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 ${
                (isScrolling || isTransitioning) ? 'opacity-50 cursor-not-allowed' : ''
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
              style={{ 
                padding: `0 calc(50vw - ${isSideView ? '255px' : '155px'})`,
                transition: 'padding 0.3s ease'
              }}
            >
              {allVariations?.map((variation) => {
                const mainCase = collectionCases?.cases.find((c) =>
                  c.variations?.some((v) => v.id === variation?.id)
                );
                const isSelected = selectedCaseId === variation?.id;
                
                return (
                  <div
                    id={`case-${variation?.id}`}
                    className="inline-block h-full align-middle"
                    key={variation?.id}
                    style={{
                      width: '312px',
                      
                        margin: isSideView && isSelected ? (window.innerWidth <= 768 ? '0 50px' : '0 100px') : '0',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div className="flex items-center justify-center h-full px-3 sm:px-12">
                      <button
                        className={`relative flex items-center justify-center w-full h-full max-w-[calc(100vw-32px)] sm:max-w-[calc(100vw-400px)]`}
                        onClick={() => !isTransitioning && handleCaseClick(variation as variations, mainCase as Case)}
                        disabled={isTransitioning}
                      >
                        <motion.div
                          initial={false}
                          animate={{ 
                            opacity: 1,
                          
                            scale: isSideView && isSelected ? 1: 1
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {isSideView && isSelected ? (
                            <Image
                              src={`/images/side/${selectedFace?.id}_${selectedBand?.id}_side.jpg`}
                              height={1000}
                              width={1000}
                              loading="lazy"
                              alt={variation?.name as string}
                              className="object-cover w-[52vh] max-w-[300px]"
                            />
                          ) : (
                            <Image
                              src={variation?.image as string}
                              alt={variation?.name as string}
                              height={1000}
                              width={1000}
                              loading="lazy"
                              className=" w-[42vh] sm:w-[52vh] max-w-[500px] min-h-[250px] sm:min-h-[200px] min-w-[350px] object-cover"
                            />
                          )}
                        </motion.div>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {!isSideView && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 h-full w-full max-w-[500px] sm:w-[52vh] px-4 sm:px-0"  >
            <Image
              src={currentBandImage}
              alt="watch band"
              className="w-full h-full object-contain"
              height={1000}
              width={1000}
              loading="lazy"
            />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CaseSelection;
