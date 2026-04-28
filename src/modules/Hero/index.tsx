import { Link } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { shuffle } from 'lodash';
import jacosign from '../../assets/nature/image (1).jpg?w=1200&webp';
import jacosignThumb from '../../assets/nature/image (1).jpg?w=400&webp';
import lr1 from '../../assets/living_room/image (3).jpg?w=1200&webp';
import lr1Thumb from '../../assets/living_room/image (3).jpg?w=400&webp';
import k1 from '../../assets/kitchen/image (5).jpg?w=1200&webp';
import k1Thumb from '../../assets/kitchen/image (5).jpg?w=400&webp';
import k2 from '../../assets/kitchen/image (4).jpg?w=1200&webp';
import k2Thumb from '../../assets/kitchen/image (4).jpg?w=400&webp';
import pool from '../../assets/common/image (2).jpg?w=1200&webp';

const POLAROID_LAYOUT_STORAGE_KEY = 'hero-polaroid-layout-v1';
const POLAROID_ANIMATION_PLAYED_STORAGE_KEY = 'hero-polaroid-animation-played-v2';
const POLAROID_Z_INDEX_STORAGE_KEY = 'hero-polaroid-z-indexes-v1';

const safeGetStorageItem = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSetStorageItem = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // no-op
  }
};

type PolaroidLayout = {
  src: string;
  caption: string;
  top: string;
  left: string;
  rotation: number;
  delay: number;
};

const isValidPolaroidLayout = (value: unknown): value is PolaroidLayout[] => {
  if (!Array.isArray(value)) return false;

  return value.every((item) =>
    typeof item?.src === 'string' &&
    typeof item?.caption === 'string' &&
    typeof item?.top === 'string' &&
    typeof item?.left === 'string' &&
    typeof item?.rotation === 'number' &&
    typeof item?.delay === 'number'
  );
};

const isValidZIndexState = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'number');

export const Hero = () => {
  const hasPlayedAnimation =
    safeGetStorageItem(POLAROID_ANIMATION_PLAYED_STORAGE_KEY) === 'true';

  const [mounted, setMounted] = useState(hasPlayedAnimation);
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string } | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [originData, setOriginData] = useState<{ x: number; y: number; rotation: number } | null>(null);
  const [animationsCompleted, setAnimationsCompleted] = useState(hasPlayedAnimation);
  const [expandedHeight, setExpandedHeight] = useState<number | null>(null);

  const polaroidRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rawImages = [
    { src: jacosign, caption: 'Jaco Beach' },
    { src: lr1, caption: 'Cozy Living Room' },
    { src: k1, caption: 'Modern Kitchen' },
    { src: k2, caption: 'Cooking with a View' },
    { src: pool, caption: 'Relaxing Pool' },
  ];

  const images = useMemo(() => shuffle(rawImages), []);

  const polaroids = useMemo(() => {
    const savedLayoutRaw = safeGetStorageItem(POLAROID_LAYOUT_STORAGE_KEY);

    if (savedLayoutRaw) {
      try {
        const savedLayout = JSON.parse(savedLayoutRaw);
        if (
          isValidPolaroidLayout(savedLayout) &&
          savedLayout.length === images.length &&
          images.every((image) => savedLayout.some((saved) => saved.src === image.src && saved.caption === image.caption))
        ) {
          return savedLayout;
        }
      } catch {
        // Ignore malformed localStorage and regenerate.
      }
    }

    const generatedLayout = images.map((item, index) => {
      const baseTop = index % 2 === 0 ? 5 : 45;
      const randomTop = baseTop + Math.random() * 10;
      const baseLeft = (index / (images.length - 1)) * 60;
      const randomLeft = baseLeft + (Math.random() * 10 - 5);
      const rotation = Math.random() * 40 - 20;
      const delay = index * 800;

      return {
        ...item,
        top: `${randomTop}%`,
        left: `${Math.max(0, Math.min(90, randomLeft))}%`,
        rotation,
        delay,
      };
    });

    safeSetStorageItem(POLAROID_LAYOUT_STORAGE_KEY, JSON.stringify(generatedLayout));

    return generatedLayout;
  }, [images]);

  const zIndexes = useMemo(() => {
    const defaultZIndexes = polaroids.map((_, index) => index + 10);
    const savedZIndexesRaw = safeGetStorageItem(POLAROID_Z_INDEX_STORAGE_KEY);

    if (!savedZIndexesRaw) {
      return defaultZIndexes;
    }

    try {
      const savedZIndexes = JSON.parse(savedZIndexesRaw);
      if (isValidZIndexState(savedZIndexes) && savedZIndexes.length === polaroids.length) {
        return savedZIndexes;
      }
    } catch {
      // Ignore malformed localStorage and fall back to defaults.
    }

    return defaultZIndexes;
  }, [polaroids]);

  const [storedZIndexes, setStoredZIndexes] = useState<number[]>(zIndexes);

  useEffect(() => {
    setStoredZIndexes(zIndexes);
  }, [zIndexes]);

  useEffect(() => {
    if (hasPlayedAnimation) {
      return;
    }

    const mountTimer = setTimeout(() => {
      setMounted(true);
    }, 100);

    const completeTimer = setTimeout(() => {
      setAnimationsCompleted(true);
      safeSetStorageItem(POLAROID_ANIMATION_PLAYED_STORAGE_KEY, 'true');
    }, 5000);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(completeTimer);
    };
  }, [hasPlayedAnimation]);

  useEffect(() => {
    if (selectedImage) {
      const viewportWidth = window.innerWidth;
      const maxWidth = 600;
      const targetWidth = Math.min(viewportWidth * 0.9, maxWidth);
      const ratio = 20 / 17.5;
      const targetHeight = targetWidth * ratio;

      setExpandedHeight(targetHeight);

      requestAnimationFrame(() => {
        setIsModalVisible(true);
      });
    }
  }, [selectedImage]);

  const handleImageClick = (index: number) => {
    const el = polaroidRefs.current[index];
    if (!el) return;

    const maxZ = Math.max(...storedZIndexes);
    const newZIndexes = [...storedZIndexes];
    newZIndexes[index] = maxZ + 1;
    setStoredZIndexes(newZIndexes);
    safeSetStorageItem(POLAROID_Z_INDEX_STORAGE_KEY, JSON.stringify(newZIndexes));

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotation = polaroids[index].rotation;

    setOriginData({ x: centerX, y: centerY, rotation });
    setSelectedIndex(index);
    setSelectedImage({ src: polaroids[index].src, caption: polaroids[index].caption });
  };

  const closeModal = () => {
    if (selectedIndex !== null && polaroidRefs.current[selectedIndex]) {
      const el = polaroidRefs.current[selectedIndex];
      if (el) {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotation = polaroids[selectedIndex].rotation;
        setOriginData({ x: centerX, y: centerY, rotation });
      }
    }

    requestAnimationFrame(() => {
      setIsModalVisible(false);
    });

    setTimeout(() => {
      setSelectedImage(null);
      setSelectedIndex(null);
      setOriginData(null);
      setExpandedHeight(null);
    }, 500);
  };

  return (
    <section className="section-frame relative pt-6">
      <div className="absolute left-4 top-8 h-28 w-28 rounded-full bg-[#ffd7b1]/60 blur-3xl sm:h-40 sm:w-40" />
      <div className="absolute right-6 top-16 h-32 w-32 rounded-full bg-[#9ed3d2]/40 blur-3xl sm:h-48 sm:w-48" />
      <div className="sunset-panel relative overflow-visible px-4 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-12">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_70%)]" />
        <div className="grid lg:grid-cols-7 lg:items-center lg:gap-x-10 xl:gap-x-12">
          <div className="animate-fade-up lg:col-span-3">
            <p className="section-kicker text-center lg:text-left">Mountain-view Coastal Stay</p>
            <h1 className="mt-4 block text-center font-pacifico text-5xl leading-none text-[#d48a58] sm:text-6xl lg:text-left lg:text-8xl">
              Welcome
            </h1>
            <p className="mt-6 text-center text-lg leading-8 text-slate-600 lg:text-left">
              Vista Monte Mar blends airy condo comfort, walkable beach access,
              and an easy home base for sunset swims, day trips, and relaxed evenings.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <span className="hero-chip">Sleeps 4 comfortably</span>
              <span className="hero-chip">Pool and modern amenities</span>
              <span className="hero-chip">Minutes from Jaco Beach</span>
            </div>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link to="/gallery" className="soft-button w-full sm:min-w-[12rem] sm:w-auto">
                Explore the gallery
              </Link>
              <a href="#contact" className="ghost-button w-full sm:min-w-[12rem] sm:w-auto">
                Plan your stay
              </a>
            </div>
            <div className="mt-8 hidden max-w-md rounded-[1.5rem] border border-white/80 bg-white/85 p-4 text-sm text-slate-600 shadow-[0_18px_40px_rgba(34,56,69,0.12)] backdrop-blur lg:block">
              <p className="font-semibold uppercase tracking-[0.18em] text-[#d48a58]">House mood</p>
              <p className="mt-2 leading-6">
                Warm light, open space, and little details that make arrival feel easy.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-3 text-center sm:grid-cols-3 lg:text-left">
              <div className="rounded-2xl border border-white/70 bg-[#fffaf5] px-4 py-3 shadow-sm">
                <p className="text-2xl font-semibold text-[#23404b]">5</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Curated views</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-[#fffaf5] px-4 py-3 shadow-sm">
                <p className="text-2xl font-semibold text-[#23404b]">1</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Coastal basecamp</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-[#fffaf5] px-4 py-3 shadow-sm">
                <p className="text-2xl font-semibold text-[#23404b]">∞</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Sunset moments</p>
              </div>
            </div>
          </div>
          <div className="relative mt-10 hidden h-[600px] w-full overflow-visible lg:col-span-4 lg:mt-0 lg:block">
            <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(145deg,rgba(255,248,239,0.92),rgba(244,252,252,0.68))]" />
            {polaroids.map((polaroid, index) => (
              <div
                key={index}
                className="absolute hover:z-50"
                style={{
                  top: polaroid.top,
                  left: polaroid.left,
                  transition: !animationsCompleted
                    ? `transform 1250ms cubic-bezier(0.18, 0.88, 0.32, 1.15) ${polaroid.delay}ms, opacity 800ms ease-out ${polaroid.delay}ms`
                    : 'none',
                  transform: mounted
                    ? `rotate(${polaroid.rotation}deg) scale(1) translateY(0)`
                    : `rotate(${polaroid.rotation + (index % 2 === 0 ? -14 : 14)}deg) scale(0.82) translate3d(${index % 2 === 0 ? '-30px' : '30px'}, -180px, 0)`,
                  opacity: mounted && index !== selectedIndex ? 1 : 0,
                  zIndex: storedZIndexes[index],
                }}
              >
                <div
                  ref={(el) => {
                    polaroidRefs.current[index] = el;
                  }}
                  className="polaroid-texture polaroid-shadow min-w-[16rem] cursor-pointer rounded-sm border border-gray-200 p-3 pb-12 transition-transform duration-300 hover:rotate-0 hover:scale-110"
                  onClick={() => handleImageClick(index)}
                >
                  <div className="relative">
                    <img
                      src={polaroid.src}
                      alt={polaroid.caption}
                      className="h-64 w-64 max-w-none object-cover"
                    />
                    <div className="absolute inset-0 polaroid-img-shadow pointer-events-none"></div>
                  </div>
                  <p className="mt-3 whitespace-nowrap text-center font-pacifico text-xl text-gray-700 opacity-90 -rotate-2">
                    {polaroid.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 lg:hidden">
            <div className="rounded-[1.9rem] border border-white/70 bg-[linear-gradient(160deg,rgba(255,249,241,0.96),rgba(244,250,250,0.82))] p-4 shadow-[0_18px_40px_rgba(34,56,69,0.08)]">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="section-kicker">House mood</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Warm light, open space, and a calm base for beach days and easy evenings.
                  </p>
                </div>
                <Link to="/gallery" className="ghost-button shrink-0 px-4 py-2 text-xs">
                  Photos
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {images.slice(0, 4).map((item, index) => (
                  <div
                    key={index}
                    className={`polaroid-texture polaroid-shadow rounded-sm border border-gray-200 p-2 ${
                      index % 2 === 0 ? '-rotate-2' : 'rotate-2'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={item.src}
                        alt={item.caption}
                        className="aspect-[0.95] w-full object-cover"
                      />
                      <div className="absolute inset-0 polaroid-img-shadow pointer-events-none"></div>
                    </div>
                    <p className="mt-2 truncate text-center font-pacifico text-base text-gray-700">
                      {item.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {selectedImage && (
        <div
          className={`fixed inset-0 z-[90] bg-black transition-opacity duration-500 ${isModalVisible ? 'opacity-80' : 'opacity-0'}`}
          onClick={closeModal}
        />
      )}

      {selectedImage && originData && (
        <div
          className="fixed z-[100] overflow-hidden rounded-sm border border-gray-200 p-3 pb-12 polaroid-texture polaroid-shadow cursor-pointer"
          style={{
            top: isModalVisible ? '50%' : `${originData.y}px`,
            left: isModalVisible ? '50%' : `${originData.x}px`,
            width: isModalVisible ? 'min(90vw, 600px)' : '17.5rem',
            height: isModalVisible && expandedHeight ? `${expandedHeight}px` : '22rem',
            transform: `translate(-50%, -50%) rotate(${isModalVisible ? 0 : originData.rotation}deg)`,
            transition: 'all 500ms cubic-bezier(0.34, 1.1, 0.64, 1)',
          }}
          onClick={closeModal}
        >
          <button
            className={`absolute right-2 top-2 z-10 text-2xl font-bold text-gray-800 transition-opacity duration-300 ${isModalVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
          >
            &times;
          </button>
          <div className="relative aspect-square w-full">
            <img
              src={selectedImage.src}
              alt="Full size"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 polaroid-img-shadow pointer-events-none"></div>
          </div>
          <p
            className={`mt-3 text-center font-pacifico text-gray-700 -rotate-1 ${isModalVisible ? 'text-3xl' : 'text-xl'}`}
            style={{ transition: 'all 500ms cubic-bezier(0.34, 1.1, 0.64, 1)' }}
          >
            {selectedImage.caption}
          </p>
        </div>
      )}
    </section>
  );
};

export default Hero;
