import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collections } from "@/data/collections";
import { setBand } from "@/store/slices/watchSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BandSlider = () => {
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const [slideWidth, setSlideWidth] = useState(550);

    const { currentCaseImage, currentBandImage, size, collection } = useSelector(
        (state: any) => state.watch
    );

    const collectionBands = collections.find((col) => col.id === collection);
    const allVariations = collectionBands?.bands.flatMap(
        (bandCategory) => bandCategory.variations
    );

    const calculateSlideWidth = () => {
        if (typeof window === 'undefined') return 550;
        const vw = window.innerWidth;
        if (vw < 640) return vw - 32;
        if (vw < 768) return 500;
        return 550;
    };

    useEffect(() => {
        const updateWidth = () => {
            setSlideWidth(calculateSlideWidth());
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

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
        return Math.round(scrollPosition / slideWidth);
    };

    const scrollToIndex = (index: number) => {
        if (!containerRef.current || !allVariations) return;
        const maxIndex = allVariations.length - 1;
        const safeIndex = Math.max(0, Math.min(index, maxIndex));
        const scrollPosition = safeIndex * slideWidth;
        
        containerRef.current.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    };

    const handleNavigationClick = (direction: 'next' | 'prev', event?: React.TouchEvent | React.MouseEvent) => {
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
        }, 500);
    

        if (event?.type === 'touchstart') {
            event.preventDefault();
        }
    };

    const handleBandClick = (variation: any, mainBand: any) => {
        if (isScrolling) return;

        // dispatch(
        //     setBand({
        //         subBand: variation,
        //         mainBand,
        //     })
        // );
        scrollToElement(variation.id);
    };

    const scrollToElement = (id: string) => {
        if (isScrolling) return;
    
        const selected = document.getElementById(`band-${id}`);
        if (!selected || !containerRef.current) return;
    
        const container = containerRef.current;
        const containerWidth = container.offsetWidth;
        const selectedRect = selected.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        const containerCenter = containerRect.left + (containerWidth / 2);
        const elementCenter = selectedRect.left + (selectedRect.width / 2);
        const scrollOffset = elementCenter - containerCenter;
        
        setIsScrolling(true);
        container.scrollBy({
            left: scrollOffset,
            behavior: 'smooth'
        });
    
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }
        
        scrollTimeout.current = setTimeout(() => {
            setIsScrolling(false);
            handleScroll();
        }, 500);
    };
 
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            handleNavigationClick('next');
        } else if (isRightSwipe) {
            handleNavigationClick('prev');
        }

        setTouchStart(null);
        setTouchEnd(null);
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
            (variation) => variation.image === currentBandImage
        );

        if (selectedElement) {
            scrollToElement(selectedElement.id);
        }
    }, [currentBandImage, collection]);

    useEffect(() => {
        return () => {
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, []);

    const calculatePadding = () => {
        if (typeof window === 'undefined') return '0 calc(50vw - 275px)';
        const vw = window.innerWidth;
        if (vw < 640) return '0 16px'; 
        if (vw < 768) return '0 calc(50vw - 250px)'; 
        return '0 calc(50vw - 275px)'; 
    };

    return (
         <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full"
            >
                <div className="relative h-[53vh] max-h-[508px] min-h-[314px] w-full m-auto z-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 h-full w-full max-w-[500px] sm:w-[52vh] px-4 sm:px-0">
                        <img
                            src={currentCaseImage || '/face1.png'}
                            alt="watch face"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="relative h-full overflow-hidden">
                        {showLeftButton && (
                            <button
                                onClick={(e) => handleNavigationClick('prev', e)}
                                onTouchStart={(e) => handleNavigationClick('prev', e)}
                                disabled={isScrolling}
                                className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-300 ${isScrolling ? 'opacity-50 cursor-not-allowed' : ''}`}
                                aria-label="Previous band"
                            >
                                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        )}
                        {showRightButton && (
                            <button
                                onClick={(e) => handleNavigationClick('next', e)}
                                onTouchStart={(e) => handleNavigationClick('next', e)}
                                disabled={isScrolling}
                                className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-300 ${isScrolling ? 'opacity-50 cursor-not-allowed' : ''}`}
                                aria-label="Next band"
                            >
                                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        )}
                        <div
                            ref={containerRef}
                            className="h-full overflow-x-auto whitespace-nowrap scroll-smooth hide-scrollbar touch-pan-y"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div className="inline-block h-full" style={{ padding: calculatePadding() }}>
                                {allVariations?.map((variation) => (
                                    <div
                                        id={`band-${variation.id}`}
                                        className="inline-block h-full align-middle"
                                        key={variation.id}
                                        style={{ width: `${slideWidth}px` }}
                                    >
                                        <div className="flex items-center justify-center h-full px-3 sm:px-12">
                                            <button
                                                className="relative flex items-center justify-center w-full h-full"
                                                onClick={() => handleBandClick(variation, "")}
                                            >
                                                <img
                                                    src={'/band1.jpeg'}
                                                    alt={variation.name}
                                                    className="w-full sm:w-[52vh] max-w-[500px] object-contain"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BandSlider;
