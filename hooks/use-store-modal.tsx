

// Import the `create` function from the 'zustand' library.
import { create } from "zustand";

// Define an interface `useStoreModalStore` to specify the shape of the store's state.
interface useStoreModalStore {
    isOpen: boolean;     // A boolean flag to track whether the modal is open or closed.
    onOpen: () => void;  // Function to open the modal.
    onClose: () => void; // Function to close the modal.
}

// Create a store named `useStoreModal` using the `create` function.
export const useStoreModal = create<useStoreModalStore>((set) => ({
    isOpen: false,           // Initialize `isOpen` as 'false' (modal is initially closed).
    onOpen: () => set({ isOpen: true }),  // Define a function to open the modal.
    onClose: () => set({ isOpen: false }), // Define a function to close the modal.
}));
