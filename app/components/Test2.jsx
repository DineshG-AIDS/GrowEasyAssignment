"use client"
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const RealEstateCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const carouselRef = useRef(null);
  const imagesRef = useRef([]);
  const intervalRef = useRef(null);

  const images = [
    'https://picsum.photos/id/10/800/600',
    'https://picsum.photos/id/11/800/600',
    'https://picsum.photos/id/12/800/600'
  ];

  // Auto-play functionality
  const startAutoPlay = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    // Control auto-play based on isPlaying state
    if (isPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    // GSAP horizontal sliding animation
    imagesRef.current.forEach((imageEl, index) => {
      gsap.to(imageEl, {
        x: `${-currentIndex * 100}%`,
        opacity: index === currentIndex ? 1 : 0,
        duration: 0.8,
        ease: 'power2.inOut'
      });
    });

    // Cleanup interval on unmount
    return () => {
      stopAutoPlay();
    };
  }, [currentIndex, isPlaying]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Image Container */}
      <div className="absolute inset-0 flex">
        {images.map((src, index) => (
          <div
            key={src}
            ref={el => imagesRef.current[index] = el}
            className="absolute w-full h-full flex-shrink-0"
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        ))}
      </div>

      {/* Overlay Text */}
      <div className="absolute top-0 left-0 p-8">
        <h2 className="text-[64px] font-helvetica font-bold text-black tracking-tighter leading-none">
          NEW ON
        </h2>
        <h2 className="text-[64px] font-helvetica font-bold text-black tracking-tighter leading-none">
          SALE
        </h2>
        <p className="text-[24px] font-helvetica text-black mt-2 tracking-tight">
          NEW YORK, NY
        </p>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className="absolute bottom-24 right-8 bg-white/50 p-3 rounded-full z-10"
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        )}
      </button>

      {/* Pagination */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8">
        <div className="flex space-x-2 bg-white/50 px-4 py-2 rounded-full">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-16 h-1 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-black' : 'bg-gray-300'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealEstateCarousel;