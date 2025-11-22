import jacosign from '../../assets/nature/image (1).jpg?w=1200&webp';
import lr1 from '../../assets/living_room/image (3).jpg?w=1200&webp';
import k1 from '../../assets/kitchen/image (5).jpg?w=1200&webp';
import k2 from '../../assets/kitchen/image (4).jpg?w=1200&webp';
import pool from '../../assets/common/image (2).jpg?w=1200&webp';
import Paragraph from '../../components/ElementWrapper/Paragraph';
import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef } from 'react';

export const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [originData, setOriginData] = useState<{ x: number; y: number; rotation: number } | null>(null);
  const [animationsCompleted, setAnimationsCompleted] = useState(false);

  const polaroidRefs = useRef<(HTMLDivElement | null)[]>([]);

  const images = [jacosign, lr1, k1, k2, pool];

  const polaroids = useMemo(() => {
    return images.map((img, index) => {
      // Zig-zag pattern for vertical position to minimize overlap
      // Even indices: Top 0-10%
      // Odd indices: Top 40-50%
      const baseTop = index % 2 === 0 ? 5 : 45;
      const randomTop = baseTop + Math.random() * 10;

      // Horizontal spread with jitter
      // Spread evenly across 0-60% to keep them contained
      const baseLeft = (index / (images.length - 1)) * 60;
      const randomLeft = baseLeft + (Math.random() * 10 - 5);

      // Random rotation between -20 and 20 degrees
      const rotation = Math.random() * 40 - 20;

      // Random delay
      const delay = index * 800;

      return {
        img,
        top: `${randomTop}%`,
        left: `${Math.max(0, Math.min(90, randomLeft))}%`, // Clamp between 0 and 90%
        rotation,
        delay,
      };
    });
  }, []);

  useEffect(() => {
    // Small delay to ensure initial state (opacity 0, etc.) is painted before animating
    const mountTimer = setTimeout(() => {
      setMounted(true);
    }, 100);

    // Disable the slow transition after the initial animation is done
    const completeTimer = setTimeout(() => {
      setAnimationsCompleted(true);
    }, 5000);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  const handleImageClick = (index: number) => {
    const el = polaroidRefs.current[index];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotation = polaroids[index].rotation;

    setOriginData({ x: centerX, y: centerY, rotation });
    setSelectedIndex(index);
    setSelectedImage(polaroids[index].img);

    // Use requestAnimationFrame to ensure the modal renders in the "closed" state (at origin) first
    requestAnimationFrame(() => {
      // Double RAF to ensure layout is calculated
      requestAnimationFrame(() => {
        setIsModalVisible(true);
      });
    });
  };

  const closeModal = () => {
    // Recalculate position in case the user scrolled
    if (selectedIndex !== null && polaroidRefs.current[selectedIndex]) {
      const el = polaroidRefs.current[selectedIndex]!;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotation = polaroids[selectedIndex].rotation;

      setOriginData({ x: centerX, y: centerY, rotation });
    }

    requestAnimationFrame(() => {
      setIsModalVisible(false);
    });

    // Wait for animation to finish before removing from DOM
    setTimeout(() => {
      setSelectedImage(null);
      setSelectedIndex(null);
      setOriginData(null);
    }, 500);
  };

  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-10">
      <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
        <div className="lg:col-span-3">
          <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-8xl text-center lg:text-left font-pacifico text-secondary">
            Welcome!
          </h1>
          <Paragraph>
            Welcome to Vista Monte Mar! Enjoy a cozy stay with modern amenities
            in a prime location. We look forward to hosting you!
          </Paragraph>
          <Link to="/gallery">
            <button className="btn btn-sm btn-secondary text-base-100">
              Want to see more photos?
            </button>
          </Link>
        </div>
        <div className="lg:col-span-4 mt-10 lg:mt-0 relative h-[600px] w-full hidden lg:block">
          {polaroids.map((polaroid, index) => (
            <div
              key={index}
              className="absolute hover:z-50"
              style={{
                top: polaroid.top,
                left: polaroid.left,
                transition: !animationsCompleted
                  ? `all 1000ms ease-out ${polaroid.delay}ms`
                  : 'none',
                transform: mounted
                  ? `rotate(${polaroid.rotation}deg) scale(1) translateY(0)`
                  : `rotate(${polaroid.rotation}deg) scale(1.5) translateY(-100px)`,
                opacity: mounted && index !== selectedIndex ? 1 : 0, // Hide if selected
                zIndex: index + 10,
              }}
            >
              <div
                ref={(el) => (polaroidRefs.current[index] = el)}
                className="bg-white p-3 pb-10 shadow-xl rounded-sm transform transition-transform duration-300 hover:scale-110 hover:rotate-0 cursor-pointer min-w-[16rem]"
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={polaroid.img}
                  alt={`Polaroid ${index + 1}`}
                  className="w-64 h-64 object-cover max-w-none"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Fallback */}
        <div className="lg:hidden mt-10 grid grid-cols-1 gap-8">
          {images.slice(0, 2).map((img, index) => (
             <div
               key={index}
               className={`bg-white p-3 pb-10 shadow-xl rounded-sm transform ${index % 2 === 0 ? '-rotate-2' : 'rotate-1'}`}
               onClick={() => handleImageClick(index)}
             >
              <img src={img} alt="Mobile Polaroid" className="w-full aspect-square object-cover block" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal Backdrop */}
      {selectedImage && (
        <div
          className={`fixed inset-0 z-[90] bg-black transition-opacity duration-500 ${isModalVisible ? 'opacity-80' : 'opacity-0'}`}
          onClick={closeModal}
        />
      )}

      {/* Animated Polaroid Modal */}
      {selectedImage && originData && (
        <div
          className="fixed z-[100] bg-white p-3 pb-10 shadow-2xl rounded-sm cursor-pointer overflow-hidden"
          style={{
            top: isModalVisible ? '50%' : `${originData.y}px`,
            left: isModalVisible ? '50%' : `${originData.x}px`,
            width: isModalVisible ? 'min(90vw, 600px)' : '17.5rem', // 16rem + padding
            height: isModalVisible ? 'auto' : '19.25rem', // 16rem + padding
            transform: `translate(-50%, -50%) rotate(${isModalVisible ? 0 : originData.rotation}deg)`,
            transition: 'all 500ms cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy effect
          }}
          onClick={closeModal}
        >
           <button
              className={`absolute top-2 right-2 text-gray-800 text-2xl font-bold z-10 transition-opacity duration-300 ${isModalVisible ? 'opacity-100' : 'opacity-0'}`}
              onClick={(e) => { e.stopPropagation(); closeModal(); }}
            >
              &times;
            </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default Hero;
