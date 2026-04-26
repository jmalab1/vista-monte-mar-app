import React, { useState, ChangeEvent, useEffect } from 'react';
import axiosInstance from '../../utility/axiosInstance';
import SectionHeader from '../../components/heading/SectionHeader';
import { useToast } from '../../context/ToastContext';
import FormCard from '../../components/MiniCards/FormCard';
import _ from 'lodash';
import ButtonItem from '../../components/form-items/ButtonItem';
import Modal from '../../components/Modal';
import Container from '../../components/Container';
import CodeEditor from '../../components/CodeEditor';
import AdminNav from '../../modules/AdminNav';
import { useAuth } from '../../context/AuthContext';
import { useAuthToken } from '../../hooks/useAuthToken';
import { Navigate } from 'react-router-dom';

const ManageInventory: React.FC = () => {
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();
  const token = useAuthToken();
  const [saving, setSaving] = useState(false);
  const [code, setCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [validJson, setValidJson] = useState<Record<string, any>>({});
  const [showModal, setShowModal] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        const response = await axiosInstance.get('/api/inventory-listing', {
          headers: {
            'x-access-token': token,
          },
        });
        setCode(JSON.stringify(response.data, null, 2));
        setValidJson(response.data);
      } catch (error) {
        console.log('Oh no!' + error);
      }
    };

    fetchData();
  }, [isAuthenticated, token]);

  // Handle clicking the "Submit" button
  const handleSubmitClick = async (): Promise<void> => {
    try {
      setSaving(true);
      // Attempt to parse the code as JSON
      const parsedCode = JSON.parse(code);
      // Prettify the JSON code with 2-space indentation
      const prettifiedCode = JSON.stringify(parsedCode, null, 2);
      setCode(prettifiedCode); // Update the textarea with prettified code
      setValidJson(parsedCode);
      setErrorMessage('');

      const response = await axiosInstance.post(
        '/api/update-inventory-listing',
        parsedCode,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        showToast('Inventory Listing Updated Successfully.', 'success');
      } else {
        showToast('Inventory Listing Update Failed.', 'error');
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        const errorDetails = error.message;
        const positionMatch = errorDetails.match(/in JSON at position (\d+)/);
        if (positionMatch) {
          const position = parseInt(positionMatch[1], 10);
          const { line, column } = getLineAndColumn(code, position);
          setErrorMessage(
            `Invalid JSON at line ${line}, column ${column}. Please check your code.`
          );
        } else {
          setErrorMessage('Invalid JSON. Please check your code.');
        }
      } else {
        showToast('Inventory Listing Update Failed.', 'error');
      }
    } finally {
      setTimeout(() => {
        setSaving(false);
      }, 1500);
    }
  };

  // Function to calculate the line and column of an error
  const getLineAndColumn = (text: string, position: number) => {
    const lines = text.substring(0, position).split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    return { line, column };
  };

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  return (
    <Container classValue="bg-base-200 lg:px-8">
      {!isAuthenticated && <Navigate to="/login" />}
      {isAuthenticated && (
        <div className="lg:grid lg:grid-cols-6 gap-4">
          <AdminNav page="manage_inventory" />
          <div className="col-span-5">
            <SectionHeader
              title="Manage Inventory Listing"
              horizontalLine={true}
              headerPadding={0}
            >
              <div className="bg-white p-8 rounded-lg shadow-lg mt-2">
                {/* Code Editor with Line Numbers */}
                <CodeEditor code={code} onChange={handleInputChange} />
                <div className="grid grid-cols-2 gap-4">
                  <ButtonItem
                    onClick={handleSubmitClick}
                    classValue="btn-secondary mt-4"
                    type="button"
                    saving={saving}
                  >
                    Submit
                  </ButtonItem>
                  <ButtonItem
                    onClick={() => setShowModal(true)}
                    classValue="btn-info mt-4"
                    type="button"
                  >
                    Preview
                  </ButtonItem>
                </div>

                <div className="pt-6">{errorMessage}</div>
              </div>

              {/* Displaying Code Block */}
              <Modal
                showModal={showModal}
                title={'Form Preview'}
                text={''}
                callback={() => setShowModal(false)}
                classValue="max-w-[1000px]"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 border">
                  {_.map(validJson, (value, key) => (
                    <FormCard
                      title={value.name}
                      fields={value.fields}
                      onChange={() => {}}
                      value={{}}
                      parentID={key}
                    ></FormCard>
                  ))}
                </div>
              </Modal>
            </SectionHeader>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ManageInventory;
