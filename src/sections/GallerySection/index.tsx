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

type GalleryGroup = {
  title: string;
  description: string;
  images: string[];
};

const galleryGroups: GalleryGroup[] = [
  {
    title: 'Living Room',
    description: 'Main shared space with open seating, natural light, and relaxed gathering areas.',
    images: [lr1, lr2, lr3, lr4, lr5, lr6, lr7, lr8],
  },
  {
    title: 'Balcony',
    description: 'Outdoor views and quiet corners for coffee, sunsets, and fresh air.',
    images: [balcony1, balcony2, balcony3],
  },
  {
    title: 'Kitchen',
    description: 'Cooking and prep space with the essentials for an easy stay-in meal.',
    images: [k1, k2, k3, k4, k5],
  },
  {
    title: 'Bedrooms',
    description: 'Sleeping areas set up for a comfortable, low-stress home base.',
    images: [br1, br2, br3, br4, br5],
  },
  {
    title: 'Bathrooms',
    description: 'Clean, bright utility spaces with the basics close at hand.',
    images: [bt1, bt2, bt3],
  },
  {
    title: 'Common Areas',
    description: 'Shared building spaces that shape the overall experience around the condo.',
    images: [c1, c2],
  },
  {
    title: 'Nature',
    description: 'A few views from the surrounding area that help set the mood of the trip.',
    images: [n1, n2, n3],
  },
  {
    title: 'Miscellaneous',
    description: 'Extra details and moments from around the property and stay.',
    images: [m1, m2],
  },
];

const renderPhotoGrid = (images: string[], title: string) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    {images.map((image, index) => (
      <figure
        key={`${title}-${index}`}
        className="aspect-[4/3] overflow-hidden rounded-[1.4rem] border border-white/80 bg-white/70 shadow-[0_12px_30px_rgba(34,56,69,0.08)]"
      >
        <img
          className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
          src={image}
          alt={`${title} image ${index + 1}`}
        />
      </figure>
    ))}
  </div>
);

export const GallerySection = () => {
  return (
    <Container classValue="bg-base-200 lg:px-8">
      <SectionHeader
        title="Gallery"
        centerText={true}
        classValue="mx-auto w-full max-w-6xl"
        contentClassValue="mt-6"
      >
        <p className="mx-auto max-w-3xl text-base leading-7 text-slate-600">
          A room-by-room look at the condo, plus a few surrounding views to help you get a feel
          for the stay before you arrive.
        </p>
      </SectionHeader>

      <SectionHeader
        title="Video Tour"
        horizontalLine={true}
        classValue="mx-auto w-full max-w-6xl"
        contentClassValue="mt-6"
      >
        <div className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/70 p-2 shadow-[0_16px_36px_rgba(34,56,69,0.1)] sm:p-3">
          <video
            className="h-auto max-w-full rounded-[1.1rem]"
            controls
            loop
          >
            <source src={movie} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </SectionHeader>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 sm:gap-12">
        {galleryGroups.map((group) => (
          <SectionHeader
            key={group.title}
            title={group.title}
            horizontalLine={true}
            contentClassValue="mt-6"
          >
            <p className="mb-6 max-w-3xl text-base leading-7 text-slate-600">
              {group.description}
            </p>
            {renderPhotoGrid(group.images, group.title)}
          </SectionHeader>
        ))}
      </div>
    </Container>
  );
};

export default GallerySection;
