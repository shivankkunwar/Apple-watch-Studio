'use client'
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collections } from "@/data/collections";
import { setBand } from "@/store/slices/watchSlice";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { setIsSideView } from "@/store/slices/uiSlice";

const BandSlider = () => {
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const transitionTimeout = useRef<NodeJS.Timeout | null>(null);
    const [slideWidth, setSlideWidth] = useState(550);
    const [selectedBandId, setSelectedBandId] = useState<string | null>(null);
    const initialRenderRef = useRef(true);

    const { isSideView } = useSelector((state: any) => state.ui);
    const { currentFaceImage, currentBandImage, size, band, collection, selectedFace, selectedBand } = useSelector(
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

    // Initial centering effect
    useEffect(() => {
        if (initialRenderRef.current && allVariations?.length && containerRef.current) {
            const firstBand = allVariations[0];
            setSelectedBandId(firstBand.id);
            
            // Wait for layout to settle
            setTimeout(() => {
                scrollToElement(firstBand.id);
                initialRenderRef.current = false;
            }, 100);
        }
    }, [allVariations]);

    
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
        if (isScrolling || isTransitioning) return;
    
        setIsScrolling(true);
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }
    
        const currentIndex = getCurrentIndex();
        const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        
        if (allVariations && newIndex >= 0 && newIndex < allVariations.length) {
            const variation = allVariations[newIndex];
            setSelectedBandId(variation.id);
            dispatch(
                setBand({
                    subBand: variation,
                    mainBand: {id:band?.id, name:band?.name}, 
                })
            );
        }

        if (isSideView) {
            setIsTransitioning(true);
            dispatch(setIsSideView(false));
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
    
        if (event?.type === 'touchstart') {
            event.preventDefault();
        }
    };

    const handleBandClick = (variation: any, mainBand: any) => {
        if (isScrolling || isTransitioning) return;
        
        setIsTransitioning(true);
        
        if (isSideView) {
            dispatch(setIsSideView(false));
            transitionTimeout.current = setTimeout(() => {
                setSelectedBandId(variation.id);
                dispatch(
                    setBand({
                        subBand: variation,
                        mainBand,
                    })
                );
                scrollToElement(variation.id);
                setIsTransitioning(false);
            }, 300);
        } else {
            setSelectedBandId(variation.id);
            dispatch(
                setBand({
                    subBand: variation,
                    mainBand,
                })
            );
            scrollToElement(variation.id);
            setIsTransitioning(false);
        }
    };

    const scrollToElement = (id: string) => {
        if (isScrolling || isTransitioning) return;
    
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
            setSelectedBandId(selectedElement.id);
            scrollToElement(selectedElement.id);
        }
    }, [currentBandImage, collection]);

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

    const calculatePadding = () => {
        if (typeof window === 'undefined') return '0 calc(50vw - 275px)';
        const vw = window.innerWidth;
        if (vw < 640) return '0 16px';
        if (vw < 768) return '0 calc(50vw - 250px)';
        if (isSideView) return '0 max(calc(50vw - 255px), 200px)';
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
                <div className="relative h-[53vh] max-h-[508px] min-h-[350px] sm:min-h-[314px] w-full m-auto z-0">
                    {!isSideView && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-full w-full max-w-[500px] sm:w-[52vh] px-4 sm:px-0"
                        >
                            <img
                                src={currentFaceImage}
                                alt="watch face"
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                    )}
                    <div className="relative h-full overflow-hidden">
                        {showLeftButton && (
                            <button
                                onClick={(e) => !isTransitioning && handleNavigationClick('prev', e)}
                                onTouchStart={(e) => !isTransitioning && handleNavigationClick('prev', e)}
                                disabled={isScrolling || isTransitioning}
                                className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-300 ${
                                    (isScrolling || isTransitioning) ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                aria-label="Previous band"
                            >
                                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        )}
                        {showRightButton && (
                            <button
                                onClick={(e) => !isTransitioning && handleNavigationClick('next', e)}
                                onTouchStart={(e) => !isTransitioning && handleNavigationClick('next', e)}
                                disabled={isScrolling || isTransitioning}
                                className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-300 ${
                                    (isScrolling || isTransitioning) ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
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
                            <div 
                                className="inline-block h-full" 
                                style={{ 
                                    padding: calculatePadding(),
                                    transform: isSideView ? 'translateX(-50px)' : 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {allVariations?.map((variation) => {
                                    const isSelected = selectedBandId === variation.id;
                                    
                                    return (
                                        <div
                                            id={`band-${variation.id}`}
                                            className="inline-block h-full align-middle"
                                            key={variation.id}
                                            style={{
                                                width: `${slideWidth}px`,
                                                margin: isSideView && isSelected ? '0 50px' : '0',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <div className="flex items-center justify-center h-full px-3 sm:px-12">
                                                <button
                                                    className="relative flex items-center justify-center w-full h-full max-w-[calc(100vw-32px)] sm:max-w-[calc(100vw-400px)]"
                                                    onClick={() => !isTransitioning && handleBandClick(variation, "")}
                                                    disabled={isTransitioning}
                                                >
                                                    <motion.div
                                                        initial={false}
                                                        animate={{ 
                                                            opacity: 1,
                                                            scale: isSideView && isSelected ? 1 : 1
                                                        }}
                                                        transition={{ duration: 0.3 }}
                                                        className="w-full h-full flex justify-center"
                                                    >
                                                        {isSideView && isSelected ? (
                                                            <img
                                                                src={`/images/side/${selectedFace?.id}_${selectedBand?.id}_side.jpg`}
                                                                height={1000}
                                                                width={1000}
                                                                alt={variation.name}
                                                                className="object-cover w-[52vh] max-w-[500px]"
                                                            />
                                                        ) : (
                                                            <img
                                                                src={variation.image}
                                                                alt={variation.name}
                                                                className="w-full h-full sm:w-[52vh] max-w-[500px] min-h-[250px] sm:min-h-[200px] object-contain"
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
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BandSlider;

