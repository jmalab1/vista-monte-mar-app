import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import FormCard from '../../components/MiniCards/FormCard';
import { useToast } from '../../context/ToastContext';
import axios from '../../utility/axiosInstance';
import _ from 'lodash';
import { Navigate } from 'react-router-dom';
import ButtonItem from '../../components/form-items/ButtonItem';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout';
import AdminTopbar from '../../components/admin/AdminTopbar';
import AdminSurfaceCard from '../../components/admin/AdminSurfaceCard';
import AdminStatPill from '../../components/admin/AdminStatPill';

type ChecklistItemConfig = {
  name?: string;
  fields?: Record<string, { type: string; name: string; value?: string }>;
  day?: string | number;
};

type ChecklistSection = {
  label: string;
  sortOrder: number;
  items: Array<{ idPath: string; config: ChecklistItemConfig }>;
};

const isObject = (value: unknown): value is Record<string, unknown> => {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
};

const isChecklistItem = (value: unknown): value is ChecklistItemConfig => {
  return isObject(value) && Boolean((value as ChecklistItemConfig).fields);
};

const getDayMeta = (
  rawDay: string | number | undefined,
  fallbackKey: string
): { label: string; order: number } => {
  const fallback = { label: 'Checklist', order: Number.MAX_SAFE_INTEGER };

  const normalizeDay = (text: string): { label: string; order: number } | null => {
    const trimmed = text.trim();
    const dayMatch = trimmed.match(/^(?:day\s*)?(\d+)$/i);

    if (dayMatch) {
      const dayNum = Number(dayMatch[1]);
      return { label: `Day ${dayNum}`, order: dayNum };
    }

    return null;
  };

  if (typeof rawDay === 'number' && Number.isFinite(rawDay)) {
    return { label: `Day ${rawDay}`, order: rawDay };
  }

  if (typeof rawDay === 'string') {
    const parsed = normalizeDay(rawDay);
    if (parsed) {
      return parsed;
    }
    return { label: rawDay, order: Number.MAX_SAFE_INTEGER - 1 };
  }

  const fromKey = normalizeDay(fallbackKey);
  if (fromKey) {
    return fromKey;
  }

  return fallback;
};

const buildSections = (checklist: Record<string, unknown>): ChecklistSection[] => {
  const grouped = new Map<string, ChecklistSection>();

  const ensureSection = (label: string, order: number): ChecklistSection => {
    if (!grouped.has(label)) {
      grouped.set(label, { label, sortOrder: order, items: [] });
    }
    return grouped.get(label) as ChecklistSection;
  };

  _.forEach(checklist, (value, key) => {
    if (isChecklistItem(value)) {
      const { label, order } = getDayMeta(value.day, key);
      ensureSection(label, order).items.push({ idPath: key, config: value });
      return;
    }

    if (isObject(value) && isObject(value.items)) {
      const group = value as {
        name?: string;
        day?: string | number;
        items: Record<string, unknown>;
      };

      const dayMeta = getDayMeta(group.day, key);
      const label = group.name?.trim() || dayMeta.label;
      const section = ensureSection(label, dayMeta.order);

      _.forEach(group.items, (itemValue, itemKey) => {
        if (isChecklistItem(itemValue)) {
          section.items.push({ idPath: `${key}.${itemKey}`, config: itemValue });
        }
      });
    }
  });

  return Array.from(grouped.values())
    .map((section) => ({
      ...section,
      items: section.items.sort((a, b) => a.idPath.localeCompare(b.idPath)),
    }))
    .sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) {
        return a.sortOrder - b.sortOrder;
      }
      return a.label.localeCompare(b.label);
    });
};

const Checklist = () => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);
  const [checklistObj, setChecklistObj] = useState<Record<string, unknown>>({});
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [analytics, setAnalytics] = useState<{
    totalItems: number;
    completedItems: number;
    completionRate: number;
    overdueItems: number;
  } | null>(null);

  // Ref to store the debounce timer ID, so it can be cleared on each trigger
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    Promise.allSettled([
      axios.get('/api/checklist-listing'),
      axios.get('/api/get-checklist'),
      axios.get('/api/checklist-analytics'),
    ])
      .then(([checklistListingResult, checklistResult, analyticsResult]) => {
        if (checklistListingResult.status === 'fulfilled' && checklistResult.status === 'fulfilled') {
          setChecklistObj(checklistListingResult.value.data);
          setFormData(checklistResult.value.data);
        } else {
          showToast('Oh no! Unable to get checklist.', 'error');
          return;
        }

        if (analyticsResult.status === 'fulfilled') {
          setAnalytics(analyticsResult.value.data);
        } else {
          setAnalytics(null);
          showToast('Unable to load checklist analytics.', 'warning');
        }
      })
      .catch(() => {
        showToast('Oh no! Unable to get checklist.', 'error');
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

    setFormData((prevFormData) => {
      const updatedData = _.cloneDeep(prevFormData);
      const currentParentValue = _.get(updatedData, parentID);
      const nextValue = type === 'checkbox' ? checked : value;
      const updatedParentValue =
        currentParentValue &&
        typeof currentParentValue === 'object' &&
        !Array.isArray(currentParentValue)
          ? { ...currentParentValue, [id]: nextValue }
          : id === 'checked'
            ? nextValue
            : { [id]: nextValue };

      _.set(updatedData, parentID, updatedParentValue);

      handleDebouncedSave(updatedData);

      return updatedData;
    });
  };

  const saveForm = async (dataToSave = formData) => {
    if (saving) return; // Prevent save if already loading
    setSaving(true);

    try {
      await axios.post('/api/save-checklist', dataToSave);
      showToast('Checklist saved successfully!', 'success');
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

  const checklistSections = buildSections(checklistObj);

  return (
    <>
      {!isAuthenticated && <Navigate to="/login" />}
      {isAuthenticated && (
        <AdminDashboardLayout activeNavKey="checklist">
          <AdminTopbar
            title="Checklist"
            subtitle="Track checklist progress by day and category. Changes autosave in the background."
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
            <AdminStatPill label="Sections" value={checklistSections.length} tone="info" />
            <AdminStatPill
              label="Cards"
              value={checklistSections.reduce((total, section) => total + section.items.length, 0)}
            />
            <AdminStatPill label="Save State" value={saving ? 'Saving' : 'Ready'} />
            <AdminStatPill label="Completion" value={`${analytics?.completionRate ?? 0}%`} tone="success" />
            <AdminStatPill label="Overdue" value={analytics?.overdueItems ?? 0} tone="warning" />
          </div>

          {_.map(checklistSections, (section) => (
            <AdminSurfaceCard
              key={section.label}
              title={section.label}
              subtitle="Checklist entries for this section."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {_.map(section.items, (item) => (
                      <div key={item.idPath}>
                        <FormCard
                          title={item.config.name || item.idPath}
                          fields={item.config.fields}
                          onChange={handleChange}
                          value={_.get(formData, item.idPath) as Record<string, unknown>}
                          parentID={item.idPath}
                          checkbox={true}
                        ></FormCard>
                      </div>
                    ))}
              </div>
            </AdminSurfaceCard>
          ))}
        </AdminDashboardLayout>
      )}
    </>
  );
};

export default Checklist;
