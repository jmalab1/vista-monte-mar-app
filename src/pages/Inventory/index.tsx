import SectionHeader from '../../components/heading/SectionHeader';
import _ from 'lodash';
import axios from '../../utility/axiosInstance';
import { useEffect, useState, useRef } from 'react';
import { useToast } from '../../context/ToastContext';
import FormCard from '../../components/MiniCards/FormCard';
import ButtonItem from '../../components/form-items/ButtonItem';
import Container from '../../components/Container';
import AdminNav from '../../modules/AdminNav';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Inventory = () => {
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);
  const { isAuthenticated } = useAuth();
  const [inventoryObj, setInventoryObj] = useState<Record<string, any>>({});
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
      axios.get('/api/inventory-listing'),
      axios.get('/api/get-inventory'),
    ])
      .then(([inventoryListing, inventory]) => {
        setInventoryObj(inventoryListing.data);
        setFormData(inventory.data);
      })
      .catch(() => {
        showToast('Oh no! Unable to get inventory.', 'error');
      });

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [isAuthenticated, showToast]);

  const handleChange = (
    parentID: string,
    id: string,
    e: React.ChangeEvent<Element>
  ) => {
    const { value, type, checked } = e.target as HTMLInputElement;

    // Update formData immutably
    setFormData((prevFormData) => {
      const updatedData = {
        ...prevFormData,
        [parentID]: {
          ...prevFormData[parentID],
          [id]: type === 'checkbox' ? checked : value,
        },
      };

      // Call debounced save immediately after form change
      handleDebouncedSave(updatedData);

      return updatedData;
    });
  };

  const saveForm = async (dataToSave = formData) => {
    if (saving) return; // Prevent save if already loading
    setSaving(true);

    try {
      await axios.post('/api/save-inventory', dataToSave);
      showToast('Inventory saved successfully!', 'success');
    } catch {
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

  const handleReset = (parentID: string) => {
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [parentID]: _.mapValues(prev[parentID], (_value, key) => {
          // Get the field type from inventoryObj
          const fieldType = inventoryObj[parentID]?.fields?.[key]?.type;

          // Reset based on field type
          switch (fieldType) {
            case 'number':
              return '0'; // Reset number fields to '0'
            case 'textarea':
              return ''; // Reset textarea fields to an empty string
            case 'toggle':
              return false; // Reset toggle fields to false
            default:
              return ''; // Default to an empty string
          }
        }),
      };

      // Immediately save the latest state using debounced save
      handleDebouncedSave(updatedData);

      return updatedData;
    });
  };

  return (
    <Container classValue="bg-base-200 lg:px-8">
      {!isAuthenticated && <Navigate to="/login" />}
      {isAuthenticated && (
        <div className="lg:grid lg:grid-cols-6 gap-4">
          <AdminNav page="inventory" />
          <div className="col-span-5">
            <SectionHeader
              title="Inventory"
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
                {_.map(inventoryObj, (value, key) => (
                  <div key={key}>
                    <FormCard
                      title={value.name}
                      fields={value.fields}
                      onChange={handleChange}
                      value={formData[key]}
                      parentID={key}
                      onReset={handleReset}
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

export default Inventory;
