"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useIsCheckoutPage = () => {
  const pathname = usePathname();
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);

  useEffect(() => {
    setIsCheckoutPage(pathname === "/checkout");
  }, [pathname]);

  return isCheckoutPage;
};

export default useIsCheckoutPage;
