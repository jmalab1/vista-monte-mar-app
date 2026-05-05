import _ from 'lodash';
import axios from '../../utility/axiosInstance';
import { useEffect, useState, useRef } from 'react';
import { useToast } from '../../context/ToastContext';
import FormCard from '../../components/MiniCards/FormCard';
import ButtonItem from '../../components/form-items/ButtonItem';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout';
import AdminTopbar from '../../components/admin/AdminTopbar';
import AdminSurfaceCard from '../../components/admin/AdminSurfaceCard';
import AdminStatPill from '../../components/admin/AdminStatPill';

const Inventory = () => {
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);
  const { isAuthenticated } = useAuth();
  const [inventoryObj, setInventoryObj] = useState<Record<string, any>>({});
  const [formData, setFormData] = useState<Record<string, Record<string, any>>>(
    {}
  );
  const [alerts, setAlerts] = useState<
    Array<{ sectionName: string; fieldName: string; value: number; min: number; unit: string; critical: boolean }>
  >([]);

  // Ref to store the debounce timer ID, so it can be cleared on each trigger
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    Promise.allSettled([
      axios.get('/api/inventory-listing'),
      axios.get('/api/get-inventory'),
      axios.get('/api/inventory-alerts'),
    ])
      .then(([inventoryListingResult, inventoryResult, alertsResult]) => {
        if (inventoryListingResult.status === 'fulfilled' && inventoryResult.status === 'fulfilled') {
          setInventoryObj(inventoryListingResult.value.data);
          setFormData(inventoryResult.value.data);
        } else {
          showToast('Oh no! Unable to get inventory.', 'error');
          return;
        }

        if (alertsResult.status === 'fulfilled') {
          setAlerts(alertsResult.value.data.alerts || []);
        } else {
          setAlerts([]);
          showToast('Unable to load inventory alerts.', 'warning');
        }
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
    <>
      {!isAuthenticated && <Navigate to="/login" />}
      {isAuthenticated && (
        <AdminDashboardLayout activeNavKey="inventory">
          <AdminTopbar
            title="Inventory"
            subtitle="Update live inventory values. Changes autosave and can be saved manually."
            actions={
              <ButtonItem
                classValue={'btn-secondary'}
                type={'button'}
                onClick={() => handleDebouncedSave(formData)}
                saving={saving}
              >
                Save
              </ButtonItem>
            }
          />

          <div className="flex flex-wrap items-center gap-2">
            <AdminStatPill label="Cards" value={Object.keys(inventoryObj).length} tone="info" />
            <AdminStatPill label="Save State" value={saving ? 'Saving' : 'Ready'} />
            <AdminStatPill label="Low Stock" value={alerts.length} tone={alerts.length ? 'warning' : 'success'} />
            <AdminStatPill
              label="Critical"
              value={alerts.filter((item) => item.critical).length}
              tone={alerts.some((item) => item.critical) ? 'danger' : 'success'}
            />
          </div>

          <AdminSurfaceCard title="Needs Restock" subtitle="Fields at or below minimum threshold.">
            {alerts.length === 0 && <p className="text-sm text-slate-600">No low-stock alerts.</p>}
            {alerts.length > 0 && (
              <div className="grid gap-2 md:grid-cols-2">
                {alerts.map((alert, index) => (
                  <div key={`${alert.sectionName}-${alert.fieldName}-${index}`} className="rounded border border-slate-200 px-3 py-2 text-sm">
                    <p className="font-semibold text-slate-800">{alert.sectionName} - {alert.fieldName}</p>
                    <p className="text-slate-600">
                      {alert.value} {alert.unit} / min {alert.min} {alert.unit}
                    </p>
                    {alert.critical && <p className="text-xs font-semibold text-red-600">Critical</p>}
                  </div>
                ))}
              </div>
            )}
          </AdminSurfaceCard>

          <AdminSurfaceCard
            title="Inventory Form Cards"
            subtitle="Edit each inventory card. Changes queue a debounced save."
          >
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
          </AdminSurfaceCard>
        </AdminDashboardLayout>
      )}
    </>
  );
};

export default Inventory;
