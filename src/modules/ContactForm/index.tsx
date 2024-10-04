import { FormEvent, useState } from 'react';
import ButtonItem from '../../components/form-items/ButtonItem';
import Input from '../../components/form-items/Input';
import TextArea from '../../components/form-items/TextArea';
import Upload from '../../components/form-items/Upload';
import SectionHeader from '../../components/heading/SectionHeader';
import axios from 'axios';
import Modal from '../../components/Modal';

const ContactForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone_number: '',
    comment: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    await axios.post('/api/send-email', formValues)
      .then((response) => {
        if (response.status === 200) {
          setShowModal(true);
        }
      })
      .catch(() => {
        setError(true);
      }).finally(() => {
        // Always run cleanup code, stop loading spinner
        setLoading(false);

        setFormValues({
          firstname: '',
          lastname: '',
          email: '',
          phone_number: '',
          comment: '',
        });
      });
  }

  const modalCallbackHandler = () => {
    setShowModal(false);
  }

  return (
    <div>
      <form className="mb-12 lg:mx-72" id="contact" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <SectionHeader
              title="Contact Us"
              subsection="Tell us about your visit. We'd love to hear from you."
            />
            <div className="mr-6 ml-6 mt-10 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <Input type="text" title="First Name" id="firstname" required={true} callback={handleChange} value={formValues.firstname} />
              <Input type="text" title="Last Name" id="lastname" callback={handleChange} value={formValues.lastname} />
              <Input type="email" title="Email" id="email" required={true} callback={handleChange} value={formValues.email} />
              <Input type="text" title="Phone Number" id="phone_number" callback={handleChange} value={formValues.phone_number} />
              <TextArea
                title="Comment"
                id="comment"
                placeholder="Let us know what you think"
                callback={handleChange}
                value={formValues.comment}
              />
              <Upload title="Attachments" />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6 mr-4">
          {loading && <span className="loading loading-spinner loading-md"></span>}
          <ButtonItem title="submit" classValue="btn-secondary" type="submit" />
        </div>
      </form>
      {error
        ? (<Modal showModal={showModal} title="Uh Oh!" text="We've hit a snag, try again some other time!" callback={modalCallbackHandler} />)
        : (<Modal showModal={showModal} title="We've got your message" text="Thank you for time!" callback={modalCallbackHandler} />)}
    </div>
  );
};

export default ContactForm;
