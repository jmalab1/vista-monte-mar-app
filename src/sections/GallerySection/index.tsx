import { useState } from 'react';
import SectionHeader from '../../components/heading/SectionHeader';
import ImageModal from '../../components/ImageModal';
import balcony1 from '/src/assets/balcony/image (1).jpg?w=800&webp';
import balcony2 from '/src/assets/balcony/image (2).jpg?w=800&webp';
import balcony3 from '/src/assets/balcony/image (3).jpg?w=800&webp';
import lr1 from '/src/assets/living_room/image (1).jpg?w=800&webp';
import lr2 from '/src/assets/living_room/image (2).jpg?w=800&webp';
import lr3 from '/src/assets/living_room/image (3).jpg?w=800&webp';
import lr4 from '/src/assets/living_room/image (4).jpg?w=800&webp';
import lr5 from '/src/assets/living_room/image (5).jpg?w=800&webp';
import lr6 from '/src/assets/living_room/image (6).jpg?w=800&webp';
import lr7 from '/src/assets/living_room/image (7).jpg?w=800&webp';
import lr8 from '/src/assets/living_room/image (8).jpg?w=800&webp';
import k1 from '/src/assets/kitchen/image (1).jpg?w=800&webp';
import k2 from '/src/assets/kitchen/image (2).jpg?w=800&webp';
import k3 from '/src/assets/kitchen/image (3).jpg?w=800&webp';
import k4 from '/src/assets/kitchen/image (4).jpg?w=800&webp';
import k5 from '/src/assets/kitchen/image (5).jpg?w=800&webp';
import br1 from '/src/assets/bedrooms/image (1).jpg?w=800&webp';
import br2 from '/src/assets/bedrooms/image (2).jpg?w=800&webp';
import br3 from '/src/assets/bedrooms/image (3).jpg?w=800&webp';
import br4 from '/src/assets/bedrooms/image (4).jpg?w=800&webp';
import br5 from '/src/assets/bedrooms/image (5).jpg?w=800&webp';
import bt1 from '/src/assets/bathrooms/image (1).jpg?w=800&webp';
import bt2 from '/src/assets/bathrooms/image (2).jpg?w=800&webp';
import bt3 from '/src/assets/bathrooms/image (3).jpg?w=800&webp';
import n1 from '/src/assets/nature/image (1).jpg?w=800&webp';
import n2 from '/src/assets/nature/image (2).jpg?w=800&webp';
import n3 from '/src/assets/nature/image (3).jpg?w=800&webp';
import c1 from '/src/assets/common/image (1).jpg?w=800&webp';
import c2 from '/src/assets/common/image (2).jpg?w=800&webp';
import m1 from '/src/assets/misc/image (1).jpg?w=800&webp';
import m2 from '/src/assets/misc/image (2).jpg?w=800&webp';
import movie from '/src/assets/movie/Condo.mp4?w=800&webp';

export const GallerySection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState<string[]>([]);

  const balcony = [balcony1, balcony2, balcony3];

  const living_room = [lr1, lr2, lr3, lr4, lr5, lr6, lr7, lr8];

  const kitchen = [k1, k2, k3, k4, k5];

  const bedrooms = [br1, br2, br3, br4, br5];

  const bathrooms = [bt1, bt2, bt3];

  const nature = [n1, n2, n3];

  const common = [c1, c2];

  const misc = [m1, m2];

  const handleImageClick = (categoryImages: string[], imageIndex: number) => {
    setAllImages(categoryImages);
    setCurrentImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="px-8 pb-10 bg-base-200 shadow-xl" id="gallery">
      <div className="mb-10 grid lg:ml-56 lg:mr-56">
        <SectionHeader title="Gallery" centerText={true}>
          <div className="mt-8 mb-8">
            <video
              className="h-auto max-w-full rounded-lg"
              autoPlay
              controls
              loop
            >
              <source src={movie} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </SectionHeader>
        <SectionHeader title="Living Room" horizontalLine={true}>
          <div className="columns-1 md:columns-2 xl:columns-3 gap-7 mt-8">
            {living_room.map((image, index) => (
              <div className="break-inside-avoid mb-8" key={index}>
                <img
                  className="h-auto max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  src={image}
                  alt={'image ' + (index + 1)}
                  onClick={() => handleImageClick(living_room, index)}
                />
              </div>
            ))}
          </div>
        </SectionHeader>
        <SectionHeader title="Balcony" horizontalLine={true}>
          <div className="columns-1 md:columns-2 xl:columns-3 gap-7 mt-8">
            {balcony.map((image, index) => (
              <div className="break-inside-avoid mb-8" key={index}>
                <img
                  className="h-auto max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  src={image}
                  alt={'image ' + (index + 1)}
                  onClick={() => handleImageClick(balcony, index)}
                />
              </div>
            ))}
          </div>
        </SectionHeader>
        <SectionHeader title="Kitchen" horizontalLine={true}>
          <div className="columns-1 md:columns-2 xl:columns-3 gap-7 mt-8">
            {kitchen.map((image, index) => (
              <div className="break-inside-avoid mb-8" key={index}>
                <img
                  className="h-auto max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  src={image}
                  alt={'image ' + (index + 1)}
                  onClick={() => handleImageClick(kitchen, index)}
                />
              </div>
            ))}
          </div>
        </SectionHeader>
        <SectionHeader title="Bedrooms" horizontalLine={true}>
          <div className="columns-1 md:columns-2 xl:columns-3 gap-7 mt-8">
            {bedrooms.map((image, index) => (
              <div className="break-inside-avoid mb-8" key={index}>
                <img
                  className="h-auto max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  src={image}
                  alt={'image ' + (index + 1)}
                  onClick={() => handleImageClick(bedrooms, index)}
                />
              </div>
            ))}
          </div>
        </SectionHeader>
        <SectionHeader title="Bathrooms" horizontalLine={true}>
          <div className="columns-1 md:columns-2 xl:columns-3 gap-7 mt-8">
            {bathrooms.map((image, index) => (
              <div className="break-inside-avoid mb-8" key={index}>
                <img
                  className="h-auto max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  src={image}
                  alt={'image ' + (index + 1)}
                  onClick={() => handleImageClick(bathrooms, index)}
                />
              </div>
            ))}
          </div>
        </SectionHeader>
        <SectionHeader title="Miscellaneous" horizontalLine={true}>
          <div className="columns-1 md:columns-2 xl:columns-3 gap-7 mt-8">
            {misc.map((image, index) => (
              <div className="break-inside-avoid mb-8" key={index}>
                <img
                  className="h-auto max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  src={image}
                  alt={'image ' + (index + 1)}
                  onClick={() => handleImageClick(misc, index)}
                />
              </div>
            ))}
          </div>
        </SectionHeader>
        <SectionHeader title="Common Areas" horizontalLine={true}>
          <div className="columns-1 md:columns-2 xl:columns-3 gap-7 mt-8">
            {common.map((image, index) => (
              <div className="break-inside-avoid mb-8" key={index}>
                <img
                  className="h-auto max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  src={image}
                  alt={'image ' + (index + 1)}
                  onClick={() => handleImageClick(common, index)}
                />
              </div>
            ))}
          </div>
        </SectionHeader>
        <SectionHeader title="Nature" horizontalLine={true}>
          <div className="columns-1 md:columns-2 xl:columns-3 gap-7 mt-8">
            {nature.map((image, index) => (
              <div className="break-inside-avoid mb-8" key={index}>
                <img
                  className="h-auto max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  src={image}
                  alt={'image ' + (index + 1)}
                  onClick={() => handleImageClick(nature, index)}
                />
              </div>
            ))}
          </div>
        </SectionHeader>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        currentIndex={currentImageIndex}
        images={allImages}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};

export default GallerySection;
