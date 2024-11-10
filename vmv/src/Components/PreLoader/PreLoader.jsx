import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PreLoader = ({ onComplete }) => {
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!circleRef.current || !textRef.current) {
      console.warn("Refs are not set yet");
      return;
    }

    const spinAnimation = gsap.timeline({ repeat: -1, yoyo: true });

    spinAnimation
      .to(circleRef.current, {
        rotation: 360,
        duration: 2,
        ease: "power1.inOut",
      })
      .to(circleRef.current, {
        rotation: 0,
        duration: 2,
        ease: "power1.inOut",
      });

    gsap.fromTo(
      textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.5 }
    );

    const timeout = setTimeout(() => {
      gsap.to(circleRef.current, { opacity: 0, duration: 0.5 });
      gsap.to(textRef.current, { opacity: 0, duration: 0.5, onComplete });
    }, 2000); 

    return () => {
      spinAnimation.kill(); 
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative flex flex-col items-center">
        <div
          ref={circleRef}
          className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border-t-4 border-gray-800 rounded-full transition-all"
        ></div>
        <h1
          ref={textRef}
          className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-800"
        >
          Loading...
        </h1>
      </div>
    </div>
  );
};

export default PreLoader;
