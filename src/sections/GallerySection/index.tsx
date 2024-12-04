import SectionHeader from '../../components/heading/SectionHeader';
import image1 from './images/image (1).jpg?w=800&webp';
import image2 from './images/image (2).jpg?w=800&webp';
import image3 from './images/image (3).jpg?w=800&webp';
import image4 from './images/image (4).jpg?w=800&webp';
import image5 from './images/image (5).jpg?w=800&webp';
import image6 from './images/image (6).jpg?w=800&webp';
import image7 from './images/image (7).jpg?w=800&webp';
import image8 from './images/image (8).jpg?w=800&webp';
import image9 from './images/image (9).jpg?w=800&webp';
import image10 from './images/image (10).jpg?w=800&webp';
import image11 from './images/image (11).jpg?w=800&webp';
import image12 from './images/image (12).jpg?w=800&webp';
import image13 from './images/image (13).jpg?w=800&webp';
import image14 from './images/image (14).jpg?w=800&webp';
import image15 from './images/image (15).jpg?w=800&webp';
import image16 from './images/image (16).jpg?w=800&webp';
import image17 from './images/image (17).jpg?w=800&webp';
import image18 from './images/image (18).jpg?w=800&webp';
import image19 from './images/image (19).jpg?w=800&webp';
import image20 from './images/image (20).jpg?w=800&webp';
import image21 from './images/image (21).jpg?w=800&webp';
import image22 from './images/image (22).jpg?w=800&webp';
import image23 from './images/image (23).jpg?w=800&webp';
import image24 from './images/image (24).jpg?w=800&webp';
import image25 from './images/image (25).jpg?w=800&webp';
import image26 from './images/image (26).jpg?w=800&webp';
import image27 from './images/image (27).jpg?w=800&webp';
import image28 from './images/image (28).jpg?w=800&webp';
import image29 from './images/image (29).jpg?w=800&webp';
import image30 from './images/image (30).jpg?w=800&webp';
import image31 from './images/image (31).jpg?w=800&webp';
import image32 from './images/image (32).jpg?w=800&webp';
import image33 from './images/image (33).jpg?w=800&webp';
import movie from './movie/Condo.mov?w=800&webp';

export const GallerySection = () => {
  const images = [
    image1, image2, image3, image4, image5, image6, image7, image8, image9, image10,
    image11, image12, image13, image14, image15, image16, image17, image18, image19, image20,
    image21, image22, image23, image24, image25, image26, image27, image28, image29, image30,
    image31, image32, image33
  ];

  return (
    <section className="px-8 pb-10 bg-base-200 shadow-xl" id="house_rules">
      <div className="mb-10 grid lg:ml-56 lg:mr-56">
        <SectionHeader title="Gallery">
          <div className="mt-8 mb-8">
            <video className="h-auto max-w-full rounded-lg" autoPlay controls loop>
              <source src={movie} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="columns-1 md:columns-2 xl:columns-3 gap-7">
            {images.map((image, index) => (
              <div className="break-inside-avoid mb-8">
                <img className="h-auto max-w-full rounded-lg" src={image} alt={"image " + (index + 1)} />
              </div>
            ))}
          </div>
        </SectionHeader>
      </div>
    </section>
  );
};

export default GallerySection;
