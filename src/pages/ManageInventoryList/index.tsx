import React, { useState, ChangeEvent, useEffect } from 'react';
import axiosInstance from '../../utility/axiosInstance';
import { useToast } from '../../context/ToastContext';
import FormCard from '../../components/MiniCards/FormCard';
import _ from 'lodash';
import ButtonItem from '../../components/form-items/ButtonItem';
import Modal from '../../components/Modal';
import CodeEditor from '../../components/CodeEditor';
import { useAuth } from '../../context/AuthContext';
import { useAuthToken } from '../../hooks/useAuthToken';
import { Navigate } from 'react-router-dom';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout';
import AdminTopbar from '../../components/admin/AdminTopbar';
import AdminStatPill from '../../components/admin/AdminStatPill';
import AdminSurfaceCard from '../../components/admin/AdminSurfaceCard';

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
    <>
      {!isAuthenticated && <Navigate to="/login" />}
      {isAuthenticated && (
        <AdminDashboardLayout activeNavKey="manage_inventory">
          <AdminTopbar
            title="Manage Inventory Listing"
            subtitle="Edit inventory listing JSON and preview rendered forms."
          />
          <div className="flex flex-wrap items-center gap-2">
            <AdminStatPill label="Records" value={Object.keys(validJson).length} tone="info" />
            <AdminStatPill
              label="Parser"
              value={errorMessage ? 'Invalid JSON' : 'Valid JSON'}
              tone={errorMessage ? 'danger' : 'success'}
            />
            <AdminStatPill label="Save State" value={saving ? 'Saving' : 'Ready'} />
          </div>

          <AdminSurfaceCard
            title="Inventory JSON Editor"
            subtitle="Submit writes changes to the listing endpoint. Preview opens the form modal."
          >
            <CodeEditor code={code} onChange={handleInputChange} />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <ButtonItem
                onClick={handleSubmitClick}
                classValue="btn-secondary"
                type="button"
                saving={saving}
              >
                Submit
              </ButtonItem>
              <ButtonItem
                onClick={() => setShowModal(true)}
                classValue="btn-info"
                type="button"
              >
                Preview
              </ButtonItem>
            </div>
            {errorMessage && <div className="pt-4 text-red-600 text-sm">{errorMessage}</div>}
          </AdminSurfaceCard>

          <Modal
            showModal={showModal}
            title={'Form Preview'}
            text={''}
            callback={() => setShowModal(false)}
            classValue="max-w-[1000px]"
          >
            <div className="grid gap-4 border md:grid-cols-2 lg:grid-cols-4">
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
        </AdminDashboardLayout>
      )}
    </>
  );
};

export default ManageInventory;
