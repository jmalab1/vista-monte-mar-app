import { useEffect } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  currentIndex: number;
  images: string[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ImageModal = ({
  isOpen,
  currentIndex,
  images,
  onClose,
  onNext,
  onPrev,
}: ImageModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
        onClick={onClose}
        aria-label="Close modal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Previous button */}
      <button
        className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Image */}
      <div
        className="max-w-7xl max-h-[90vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
        />

        {/* Image counter */}
        <div className="text-center text-white mt-4 text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Next button */}
      <button
        className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default ImageModal;
