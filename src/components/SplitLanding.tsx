"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface SplitLandingProps {
  onComplete?: () => void;
}

// Use a module-level variable to track if landing was shown in this page lifecycle
let hasShownInSession = false;

export default function SplitLanding({ onComplete }: SplitLandingProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);
  const { scrollY } = useScroll();

  // All hooks must be called before any conditional return
  const topY = useTransform(scrollY, [0, 400], ["0%", "-100%"]);
  const bottomY = useTransform(scrollY, [0, 400], ["0%", "100%"]);
  // Fade out the background as splits move away
  const bgOpacity = useTransform(scrollY, [350, 450], [1, 0]);

  // Check if this is the first visit - module variable resets on refresh
  useEffect(() => {
    if (!hasShownInSession) {
      setIsAnimating(true);
    } else {
      // Already seen in this session, show content immediately
      onComplete?.();
    }
    setHasCheckedSession(true);
  }, [onComplete]);

  useEffect(() => {
    if (!isAnimating) return;

    const unsubscribe = scrollY.onChange((latest) => {
      if (latest > 380 && !isFadingOut) {
        setIsFadingOut(true);
      }
      if (latest > 480) {
        setIsAnimating(false);
        hasShownInSession = true; // Mark as shown for this session
        window.scrollTo({ top: 0, behavior: "instant" });
        onComplete?.();
      }
    });

    return () => unsubscribe();
  }, [scrollY, isFadingOut, onComplete, isAnimating]);

  // Add extra body height while landing is visible to enable scrolling
  useEffect(() => {
    if (isAnimating) {
      document.body.style.minHeight = "200vh";
      document.body.style.overflow = "auto";
    } else {
      document.body.style.minHeight = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.minHeight = "";
      document.body.style.overflow = "";
    };
  }, [isAnimating]);

  // Don't render anything until we've checked session
  if (!hasCheckedSession) return null;

  if (!isAnimating) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Full background to hide content until animation completes */}
      <motion.div
        className="absolute inset-0 bg-white dark:bg-black"
        style={{ opacity: bgOpacity }}
      />

      {/* Top Half */}
      <motion.div
        style={{ y: topY }}
        className="absolute top-0 left-0 w-full h-1/2 bg-white dark:bg-black overflow-hidden"
      >
        {/* Content positioned at center of full screen, clipped by this half */}
        <div className="absolute top-0 left-0 w-full h-[200%] flex flex-col items-center justify-center">
          <p className="text-black dark:text-white text-base sm:text-lg mb-2">
            Hey, I'm
          </p>
          <h1 className="text-black dark:text-white text-[18vw] md:text-[14vw] font-black leading-none select-none whitespace-nowrap tracking-tight">
            ARMAAN
          </h1>
        </div>
      </motion.div>

      {/* Bottom Half */}
      <motion.div
        style={{ y: bottomY }}
        className="absolute top-1/2 left-0 w-full h-1/2 bg-white dark:bg-black overflow-hidden"
      >
        {/* Content positioned at center of full screen, clipped by this half */}
        <div className="absolute bottom-0 left-0 w-full h-[200%] flex flex-col items-center justify-center">
          <p className="text-black dark:text-white text-base sm:text-lg mb-2">
            Hey, I'm
          </p>
          <h1 className="text-black dark:text-white text-[18vw] md:text-[14vw] font-black leading-none select-none whitespace-nowrap tracking-tight">
            ARMAAN
          </h1>
        </div>

        {/* Location text - positioned relative to this half */}
        <div className="absolute bottom-[20%] left-[5%] text-black dark:text-white text-xs sm:text-sm">
          <p>Originally from</p>
          <p className="italic font-light text-base sm:text-lg">Ambala, Haryana</p>
        </div>

        <div className="absolute bottom-[20%] right-[5%] text-black dark:text-white text-xs sm:text-sm text-right">
          <p>Currently in</p>
          <p className="italic font-light text-base sm:text-lg">Vadodara, Gujarat</p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 flex flex-col items-center">
          <svg
            className="w-6 h-6 text-black dark:text-white animate-bounce"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}
