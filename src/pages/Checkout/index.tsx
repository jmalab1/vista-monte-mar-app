import ContactForm from '../../modules/ContactForm';
import CheckoutSection from '../../sections/CheckoutSection';

const Checkout = () => {
  return (
    <div className="page-shell flex flex-col gap-12 pt-6 sm:pt-8">
      <CheckoutSection />
      <ContactForm />
    </div>
  );
};

export default Checkout;
