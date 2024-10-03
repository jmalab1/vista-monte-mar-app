import { FormEvent, useState } from 'react';
import ButtonItem from '../../components/form-items/ButtonItem';
import Input from '../../components/form-items/Input';
import TextArea from '../../components/form-items/TextArea';
import Upload from '../../components/form-items/Upload';
import SectionHeader from '../../components/heading/SectionHeader';
import axios from 'axios';

const ContactForm = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
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
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formValues);

    setLoading(true);
    setError(null);

    try {
      axios.post('/api/send-email', formValues)
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message); // Type assertion
        } else {
          setError('An unknown error occurred'); // Fallback for unknown types
        }
      });
  
    } finally {
      setLoading(false);
    }
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
              <Input type="text" title="First Name" id="firstname" required={true} callback={handleChange}/>
              <Input type="text" title="Last Name" id="lastname" callback={handleChange}/>
              <Input type="email" title="Email" id="email" required={true} callback={handleChange}/>
              <Input type="text" title="Phone Number" id="phone_number" callback={handleChange}/>
              <TextArea
                title="Comment"
                id="comment"
                placeholder="Let us know what you think"
                callback={handleChange}
              />
              <Upload title="Attachments" />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6 mr-4">
          <ButtonItem title="submit" classValue="btn-secondary" type="submit"/>
        </div>
      </form>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ContactForm;
