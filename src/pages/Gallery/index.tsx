import ContactForm from '../../modules/ContactForm';
import GallerySection from '../../sections/GallerySection';

const Gallery = () => {
  return (
    <div className="page-shell flex flex-col gap-12 pt-6 sm:pt-8">
      <GallerySection />
      <ContactForm />
    </div>
  );
};

export default Gallery;
