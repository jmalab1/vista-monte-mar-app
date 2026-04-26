import { useState } from 'react';
import SectionHeader from '../../components/heading/SectionHeader';
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
import Container from '../../components/Container';

export const GallerySection = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');

  const balcony = [balcony1, balcony2, balcony3];

  const living_room = [lr1, lr2, lr3, lr4, lr5, lr6, lr7, lr8];

  const kitchen = [k1, k2, k3, k4, k5];

  const bedrooms = [br1, br2, br3, br4, br5];

  const bathrooms = [bt1, bt2, bt3];

  const nature = [n1, n2, n3];

  const common = [c1, c2];

  const misc = [m1, m2];

  const renderImageSection = (title: string, images: string[]) => (
    <SectionHeader title={title} horizontalLine={true}>
      <div className="columns-1 gap-7 mt-8 md:columns-2 xl:columns-3">
        {images.map((image, index) => (
          <div className="break-inside-avoid mb-8" key={`${title}-${index}`}>
            <img
              className="h-auto max-w-full rounded-lg"
              src={image}
              alt={`${title} image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </SectionHeader>
  );

  return (
    <Container classValue="bg-base-200 lg:px-8">
      <SectionHeader title="Gallery" centerText={true}>
        <div className="my-8 flex justify-center">
          <div className="tabs tabs-boxed border border-secondary/20 bg-base-100 shadow">
            <button
              className={`tab min-w-28 text-base font-bold normal-case tracking-wide ${
                activeTab === 'photos' ? 'tab-active' : ''
              }`}
              onClick={() => setActiveTab('photos')}
              type="button"
            >
              Photos
            </button>
            <button
              className={`tab min-w-28 text-base font-bold normal-case tracking-wide ${
                activeTab === 'videos' ? 'tab-active' : ''
              }`}
              onClick={() => setActiveTab('videos')}
              type="button"
            >
              Videos
            </button>
          </div>
        </div>
      </SectionHeader>
      {activeTab === 'videos' ? (
        <SectionHeader title="Videos" horizontalLine={true}>
          <div className="my-8 place-items-center lg:mx-40">
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
      ) : (
        <>
          {renderImageSection('Living Room', living_room)}
          {renderImageSection('Balcony', balcony)}
          {renderImageSection('Kitchen', kitchen)}
          {renderImageSection('Bedrooms', bedrooms)}
          {renderImageSection('Bathrooms', bathrooms)}
          {renderImageSection('Miscellaneous', misc)}
          {renderImageSection('Common Areas', common)}
          {renderImageSection('Nature', nature)}
        </>
      )}
    </Container>
  );
};

export default GallerySection;
