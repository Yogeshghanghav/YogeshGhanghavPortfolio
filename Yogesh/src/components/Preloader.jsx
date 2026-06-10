import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    tl.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
    )
    .to(textRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
      delay: 0.5,
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
    });
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 bg-[#06050a] z-[100] flex flex-col items-center justify-center gap-6" 
      ref={containerRef}
    >
      <div 
        className="flex flex-col items-center text-center" 
        ref={textRef}
      >
        
        <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-widest text-white">
          YG<span className="text-red-500">.</span>
        </h1>
        
        
        <div className="relative w-10 h-10 mt-6">
          <div className="absolute inset-0 rounded-full border border-red-500/10" />
          <div className="absolute inset-0 rounded-full border border-t-red-500 border-r-red-500 animate-spin" />
        </div>
      </div>
    </div>
  );
}
