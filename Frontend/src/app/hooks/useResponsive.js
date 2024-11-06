import { useState, useEffect } from "react";

const breakpoints = {
  mobile: 568, // up to 768px
  tablet: 724, // up to 1024px
  desktop: 1025, // anything above 1024px
};

export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState("desktop");

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < breakpoints.mobile) {
        setScreenSize("mobile");
      } else if (width < breakpoints.tablet) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    updateScreenSize();

    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return screenSize;
};
