import { useEffect, useRef, useState } from 'react';

interface InfiniteCarouselProps {
  children: React.ReactNode;
  autoScrollSpeed?: number;
  pauseOnInteraction?: boolean;
  resumeDelay?: number;
  className?: string;
}

export const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({
  children,
  autoScrollSpeed = 1,
  pauseOnInteraction = true,
  resumeDelay = 5000,
  className = '',
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollPosRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Drag state
  const [isDown, setIsDown] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Auto-scroll logic
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const getItemWidth = () => {
      const firstItem = carousel.querySelector('.carousel-item');
      if (!firstItem) return 0;
      const itemWidth = firstItem.getBoundingClientRect().width;
      // Add the space-x-4 gap (1rem = 16px)
      return itemWidth + 16;
    };

    const scroll = () => {
      if (!carousel) return;

      if (isPaused) {
        rafIdRef.current = requestAnimationFrame(scroll);
        return;
      }

      const itemWidth = getItemWidth();
      if (itemWidth === 0) {
        rafIdRef.current = requestAnimationFrame(scroll);
        return;
      }

      scrollPosRef.current += autoScrollSpeed;

      // Calculate total width of one complete set
      // Assuming children are duplicated 4 times in parent
      const totalItems = carousel.querySelectorAll('.carousel-item').length;
      const singleSetWidth = (itemWidth * totalItems) / 4;

      // Use modulo for infinite scroll
      if (scrollPosRef.current >= singleSetWidth) {
        scrollPosRef.current = scrollPosRef.current % singleSetWidth;
      }

      carousel.scrollLeft = scrollPosRef.current;
      rafIdRef.current = requestAnimationFrame(scroll);
    };

    rafIdRef.current = requestAnimationFrame(scroll);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isPaused, autoScrollSpeed]);

  const handleInteractionStart = () => {
    if (!pauseOnInteraction) return;
    setIsPaused(true);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  const handleInteractionEnd = () => {
    if (!pauseOnInteraction) return;

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      if (carouselRef.current) {
        scrollPosRef.current = carouselRef.current.scrollLeft;
      }
      setIsPaused(false);
    }, resumeDelay);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    setIsDown(true);
    carousel.style.cursor = 'grabbing';
    startXRef.current = e.pageX - carousel.offsetLeft;
    scrollLeftRef.current = carousel.scrollLeft;
    handleInteractionStart();
  };

  const handleMouseLeave = () => {
    if (!isDown) return;
    setIsDown(false);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
    }
    handleInteractionEnd();
  };

  const handleMouseUp = () => {
    setIsDown(false);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
    }
    handleInteractionEnd();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();

    const carousel = carouselRef.current;
    if (!carousel) return;

    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    carousel.scrollLeft = scrollLeftRef.current - walk;
    scrollPosRef.current = carousel.scrollLeft;
  };

  const handleWheel = () => {
    handleInteractionStart();
    // Debounce the resume
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      if (carouselRef.current) {
        scrollPosRef.current = carouselRef.current.scrollLeft;
      }
      setIsPaused(false);
    }, resumeDelay);
  };

  return (
    <div
      ref={carouselRef}
      className={`carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box overflow-x-auto cursor-grab active:cursor-grabbing ${className}`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
    >
      {children}
    </div>
  );
};

export default InfiniteCarousel;
