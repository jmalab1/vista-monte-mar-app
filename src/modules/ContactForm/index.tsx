import { FormEvent, useState } from 'react';
import ButtonItem from '../../components/form-items/ButtonItem';
import Input from '../../components/form-items/Input';
import TextArea from '../../components/form-items/TextArea';
import SectionHeader from '../../components/heading/SectionHeader';
import axios from '../../utility/axiosInstance';
import Modal from '../../components/Modal';
import Container from '../../components/Container';

const ContactForm = () => {
  const modalDefault = {
    title: '',
    text: '',
  };
  const [modalValues, setModalValues] = useState(modalDefault);
  const [saving, setSaving] = useState(false);
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

    setSaving(true);

    await axios
      .post('/api/send-email', formValues)
      .then((response) => {
        if (response.status === 200) {
          setModalValues({
            title: "We've got your message",
            text: 'Thank you for time!',
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 429) {
          setModalValues({
            title: 'Uh Oh!',
            text: 'The limit to sending a message has been reached. Please Try again later.',
          });
        } else {
          setModalValues({
            title: 'Uh Oh!',
            text: "We've hit a snag, try again some other time!",
          });
        }
      })
      .finally(() => {
        // Always run cleanup code, stop loading spinner
        setSaving(false);

        setFormValues({
          firstname: '',
          lastname: '',
          email: '',
          phone_number: '',
          comment: '',
        });
      });
  };

  const modalCallbackHandler = () => {
    setModalValues(modalDefault);
  };

  return (
    <Container classValue="lg:px-72">
      <form id="contact" onSubmit={handleSubmit}>
        <SectionHeader title="Contact Us" centerText={true}>
          Tell us about your visit. We'd love to hear from you.
        </SectionHeader>
        <div className="mt-10 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
          <Input
            type="text"
            title="First Name"
            id="firstname"
            required={true}
            onChange={handleChange}
            value={formValues.firstname}
          />
          <Input
            type="text"
            title="Last Name"
            id="lastname"
            onChange={handleChange}
            value={formValues.lastname}
          />
          <Input
            type="email"
            title="Email"
            id="email"
            required={true}
            onChange={handleChange}
            value={formValues.email}
          />
          <Input
            type="text"
            title="Phone Number"
            id="phone_number"
            onChange={handleChange}
            value={formValues.phone_number}
          />
          <TextArea
            title="Comment"
            id="comment"
            placeholder="Let us know what you think"
            onChange={handleChange}
            required={true}
            value={formValues.comment}
            rows={5}
          />
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6 mr-4">
          <ButtonItem classValue="btn-secondary" type="submit" saving={saving}>
            Submit
          </ButtonItem>
        </div>
      </form>
      {modalValues.title != '' && (
        <Modal
          showModal={true}
          title={modalValues.title}
          text={modalValues.text}
          callback={modalCallbackHandler}
        />
      )}
    </Container>
  );
};

export default ContactForm;
