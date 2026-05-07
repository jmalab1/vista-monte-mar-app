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
    <section className="pb-12">
      <Container classValue="bg-[linear-gradient(180deg,rgba(247,251,252,0.95),rgba(255,248,242,0.98))]">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-[1.75rem] bg-[linear-gradient(180deg,#245465,#1f3f4c)] p-6 text-white shadow-[0_20px_60px_rgba(22,51,61,0.22)] sm:p-8">
            <p className="section-kicker text-white/75">Stay In Touch</p>
            <h2 className="mt-4 font-pacifico text-4xl text-[#ffd8b4] sm:text-5xl">Contact Us</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/75">
              Tell us about your plans, your questions, or what would make your stay feel
              especially easy. We&apos;d love to hear from you.
            </p>
            <div className="mt-8 space-y-3 text-sm text-white/80">
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                Friendly support for visit questions
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                Great for planning arrival details in advance
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                Quick note or full message, both are welcome
              </div>
            </div>
          </div>
          <form
            id="contact"
            onSubmit={handleSubmit}
            className="rounded-[1.75rem] border border-white/80 bg-white/80 p-6 shadow-lg backdrop-blur sm:p-8"
          >
            <SectionHeader title="Plan Your Visit" centerText={false} headerPadding={0}>
              Share a few details and we&apos;ll be in touch.
            </SectionHeader>
            <div className="mt-8 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
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
                placeholder="Tell us what you're planning or what you'd like to know"
                onChange={handleChange}
                required={true}
                value={formValues.comment}
                rows={5}
              />
            </div>
            <div className="mr-1 mt-6 flex items-center justify-end gap-x-6">
              <ButtonItem classValue="btn-guest" type="submit" saving={saving}>
                Submit
              </ButtonItem>
            </div>
          </form>
        </div>
      </Container>
      {modalValues.title != '' && (
        <Modal
          showModal={true}
          title={modalValues.title}
          text={modalValues.text}
          callback={modalCallbackHandler}
        />
      )}
    </section>
  );
};

export default ContactForm;
