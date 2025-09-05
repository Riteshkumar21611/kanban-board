import { useRef, useEffect, ReactNode, FC } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  isFullscreen?: boolean;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  showCloseButton = true,
  isFullscreen = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? "w-full h-full"
    : "relative w-full max-w-lg mx-auto rounded-lg bg-white dark:bg-blue-900 shadow-lg";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      {!isFullscreen && (
        <div className="fixed inset-0 bg-blue-400/50" onClick={onClose} />
      )}

      {/* Modal content */}
      <div
        ref={modalRef}
        className={`${contentClasses} ${className}`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Close button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full 
                       bg-blue-100 text-blue-400 transition-colors hover:bg-blue-200 hover:text-blue-700 
                       dark:bg-blue-800 dark:text-blue-400 dark:hover:bg-blue-700 dark:hover:text-white"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.04 16.54a.9.9 0 0 0 1.42 1.42L12 13.41l4.54 4.55a.9.9 0 1 0 1.42-1.42L13.41 12l4.55-4.54a.9.9 0 1 0-1.42-1.42L12 10.59 7.46 6.04a.9.9 0 1 0-1.42 1.42L10.59 12l-4.55 4.54Z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}

        {/* Children inside modal */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
