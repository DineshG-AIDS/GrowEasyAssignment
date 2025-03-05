"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const FixedRealEstateCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const carouselRef = useRef(null);
    const animationRef = useRef(null);
    console.log('test');
    const slides = [
        {
            type: "text",
            content: (
                <div className="absolute top-0 left-0 p-4 md:p-8 max-w-xs md:max-w-lg">
                    <h2 className="text-4xl md:text-6xl font-helvetica font-bold text-black tracking-tighter leading-none">
                        NEW ON
                    </h2>
                    <h2 className="text-4xl md:text-6xl font-helvetica font-bold text-black tracking-tighter leading-none">
                        SALE
                    </h2>
                    <p className="text-lg md:text-2xl font-helvetica text-black mt-2 tracking-tight">
                        NEW YORK, NY
                    </p>
                </div>
            ),
        },
        {
            type: "image",
            src: "https://picsum.photos/id/10/800/600",
        },
        {
            type: "image",
            src: "https://picsum.photos/id/11/800/600",
        },
        {
            type: "image",
            src: "https://picsum.photos/id/12/800/600",
        },
        {
            type: "image",
            src: "https://picsum.photos/id/13/800/600",
        },
        {
            type: "text",
            content: (
                <div className="absolute top-0 left-0 p-4 md:p-8 max-w-xs md:max-w-lg">
                    <h2 className="text-4xl md:text-6xl font-helvetica font-bold text-black tracking-tighter leading-none">
                        SEE FULL
                    </h2>
                    <h2 className="text-4xl md:text-6xl font-helvetica font-bold text-black tracking-tighter leading-none">
                        LISTING
                    </h2>
                    <p className="text-lg md:text-2xl font-helvetica text-black mt-2 tracking-tight">
                        ON DESCRIPTION
                    </p>
                </div>
            ),
        },
    ];

    const totalSlides = slides.length;
    const extendedSlides = [...slides, ...slides, ...slides];

    const goToNextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    useEffect(() => {
        if (!carouselRef.current) return;

        if (animationRef.current) {
            animationRef.current.kill();
        }

        animationRef.current = gsap.to(carouselRef.current, {
            x: `-${(currentIndex) * 33.33}%`,
            duration: 1,
            ease: "power3.inOut",
        });

        let autoAdvanceTimeout;
        if (isPlaying) {
            autoAdvanceTimeout = setTimeout(goToNextSlide, 3000);
        }

        return () => {
            if (autoAdvanceTimeout) {
                clearTimeout(autoAdvanceTimeout);
            }
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [currentIndex, isPlaying]);

    const togglePlay = () => {
        setIsPlaying((prev) => !prev);
    };

    const goToSlide = (index) => {
        if (isPlaying) return;
        setCurrentIndex(index);
    };

    return (
        <div className="relative flex items-center justify-center w-full h-screen">
            <div className="overflow-hidden w-full max-w-3xl md:w-[50%] h-auto md:h-[600px] lg:h-[800px] relative">
                <div
                    ref={carouselRef}
                    className="flex transition-transform duration-1000 ease-in-out gap-x-4"
                    style={{
                        transform: `translateX(-${(currentIndex / totalSlides) * 100}%)`,
                        width: `${extendedSlides.length * 22}%`, // Adjusted width to accommodate gap
                    }}
                >
                    {extendedSlides.map((slide, i) => (
                        <div
                            key={i}
                            className="w-[20%] flex-shrink-0 relative px-2" // Added padding for spacing
                        >
                            {slide.type === 'image' ? (
                                <img
                                    src={slide.src}
                                    alt={`Property ${i + 1}`}
                                    className="w-full h-[800px] object-cover rounded-4xl"
                                    draggable="false"
                                />
                            ) : (
                                slide.content
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={togglePlay}
                className="absolute bottom-16 md:bottom-24 right-4 md:right-8 bg-white/50 p-3 rounded-full z-10 hover:bg-white/75 transition-all"
            >
                {isPlaying ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                )}
            </button>

            <div className="absolute bottom-6 md:bottom-10 flex gap-2">
                {slides.slice(1, -1).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index + 1)}
                        className={`w-10 md:w-16 h-1 rounded-full transition-all duration-300 hover:bg-black/75 ${index + 1 === currentIndex ? "bg-black" : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default FixedRealEstateCarousel;