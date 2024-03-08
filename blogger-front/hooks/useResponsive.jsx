import { useEffect, useState } from "react";

/**
 * Checks if the current screen is mobile or desktop based on the viewport width.
 * @returns {{ isMobile: boolean, isDesktop: boolean }} { isMobile: boolean, isDesktop: boolean } - Returns an object with the current screen type.
 */
const useResponsive = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const BREAKPOINT = 768;

  const handleResize = () => {
    setIsDesktop(window.innerWidth > BREAKPOINT);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = !isDesktop;

  return { isMobile, isDesktop };
};

export default useResponsive;
