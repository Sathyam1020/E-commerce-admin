'use client'

import { useEffect, useState } from "react";
import { StoreModal } from "@/components/modals/store-modal";

export const ModalProvider = () => {
  // State variable to track if the component is mounted
  const [isMounted, setIsMounted] = useState(false);

  // Use the useEffect hook to run code when the component is mounted
  useEffect(() => {
    // Set isMounted to true when the component is mounted
    setIsMounted(true);
  }, []);

  // If the component is not yet mounted, return null (render nothing)
  if (!isMounted) {
    return null;
  }

  // If the component is mounted, render the StoreModal component
  return (
    <div>
      <StoreModal />
    </div>
  );
}
