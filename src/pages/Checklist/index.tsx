import { useEffect, useRef, useState } from 'react';
import Container from '../../components/Container';
import SectionHeader from '../../components/heading/SectionHeader';
import AdminNav from '../../modules/AdminNav';
import { useAuth } from '../../context/AuthContext';
import FormCard from '../../components/MiniCards/FormCard';
import { useToast } from '../../context/ToastContext';
import axios from '../../utility/axiosInstance';
import _ from 'lodash';
import { Navigate } from 'react-router-dom';
import ButtonItem from '../../components/form-items/ButtonItem';

const Checklist = () => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);
  const [checklistObj, setChecklistObj] = useState({});
  const [formData, setFormData] = useState<Record<string, Record<string, any>>>(
    {}
  );

  // Ref to store the debounce timer ID, so it can be cleared on each trigger
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    Promise.all([
      axios.get('/api/checklist-listing'),
      axios.get('/api/get-checklist'),
    ])
      .then(([inventoryListing, inventory]) => {
        setChecklistObj(inventoryListing.data);
        setFormData(inventory.data);
      })
      .catch((error) => {
        showToast('Oh no! Unable to get inventory.', 'error');
      });
  }, []);

  const saveForm = async (dataToSave = formData) => {
    if (saving) return; // Prevent save if already loading
    setSaving(true);

    try {
      await axios.post('/api/save-checklist', dataToSave);
      showToast('Inventory saved successfully!', 'success');
    } catch (error) {
      showToast('Oh no! Failed to save updates :(', 'error');
    } finally {
      setTimeout(() => {
        setSaving(false);
      }, 500);
    }
  };

  // Handle debounced save, passing the current state
  const handleDebouncedSave = (dataToSave = formData) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current); // Clear the previous timer if any
    }
    // Set a new timer to trigger saveForm after a short delay
    debounceRef.current = setTimeout(() => {
      saveForm(dataToSave); // Save the passed current state
    }, 1000); // Adjust the delay as needed (1000ms = 1 second)
  };

  return (
    <Container classValue="bg-base-200 lg:px-8">
      {!isAuthenticated && <Navigate to="/login" />}
      {isAuthenticated && (
        <div className="lg:grid lg:grid-cols-6 gap-4">
          <AdminNav page="checklist" />
          <div className="col-span-5">
            <SectionHeader
              title="Checklist"
              horizontalLine={true}
              headerPadding={0}
            >
              <ButtonItem
                classValue={'btn-secondary'}
                type={'button'}
                onClick={() => handleDebouncedSave(formData)}
                saving={saving}
              >
                Save
              </ButtonItem>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {_.map(checklistObj, (value, key) => (
                  <div key={key}>
                    <FormCard
                      title={value.name}
                      fields={value.fields}
                      onChange={() => {}}
                      value={formData[key]}
                      parentID={key}
                      checkbox={true}
                    ></FormCard>
                  </div>
                ))}
              </div>
            </SectionHeader>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Checklist;
