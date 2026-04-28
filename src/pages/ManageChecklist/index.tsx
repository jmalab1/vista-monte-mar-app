import React, { useState, ChangeEvent, useEffect } from 'react';
import axiosInstance from '../../utility/axiosInstance';
import { useToast } from '../../context/ToastContext';
import FormCard from '../../components/MiniCards/FormCard';
import _ from 'lodash';
import ButtonItem from '../../components/form-items/ButtonItem';
import Modal from '../../components/Modal';
import CodeEditor from '../../components/CodeEditor';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout';
import AdminTopbar from '../../components/admin/AdminTopbar';
import AdminStatPill from '../../components/admin/AdminStatPill';
import AdminSurfaceCard from '../../components/admin/AdminSurfaceCard';

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

const ManageChecklist: React.FC = () => {
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();
  const [saving, setSaving] = useState(false);
  const [code, setCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [validJson, setValidJson] = useState<Record<string, unknown>>({});
  const [showModal, setShowModal] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        const response = await axiosInstance.get('/api/checklist-listing');
        setCode(JSON.stringify(response.data, null, 4));
        setValidJson(response.data);
      } catch (error) {
        console.log('Oh no!' + error);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  // Handle textarea change
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setCode(event.target.value);
  };

  // Handle clicking the "Submit" button
  const handleSubmitClick = async (): Promise<void> => {
    try {
      setSaving(true);
      // Attempt to parse the code as JSON
      const parsedCode = JSON.parse(code);
      // Prettify the JSON code with 2-space indentation
      const prettifiedCode = JSON.stringify(parsedCode, null, 4);
      setCode(prettifiedCode); // Update the textarea with prettified code
      setValidJson(parsedCode);
      setErrorMessage('');

      const response = await axiosInstance.post(
        '/api/update-checklist-listing',
        parsedCode,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        showToast('Checklist Listing Updated Successfully.', 'success');
      } else {
        showToast('Checklist Listing Update Failed.', 'error');
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
        showToast('Checklist Listing Update Failed.', 'error');
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

  const checklistSections = buildSections(validJson);

  return (
    <>
      {!isAuthenticated && <Navigate to="/login" />}
      {isAuthenticated && (
        <AdminDashboardLayout activeNavKey="manage_checklist">
          <AdminTopbar
            title="Manage Checklist Listing"
            subtitle="Maintain checklist JSON and preview grouped checklist cards."
          />

          <div className="flex flex-wrap items-center gap-2">
            <AdminStatPill label="Sections" value={checklistSections.length} tone="info" />
            <AdminStatPill
              label="Parser"
              value={errorMessage ? 'Invalid JSON' : 'Valid JSON'}
              tone={errorMessage ? 'danger' : 'success'}
            />
            <AdminStatPill label="Save State" value={saving ? 'Saving' : 'Ready'} />
          </div>

          <AdminSurfaceCard
            title="Checklist JSON Editor"
            subtitle="Submit writes checklist listing changes. Preview opens grouped cards by day."
          >
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
          </AdminSurfaceCard>

          <Modal
            showModal={showModal}
            title={'Form Preview'}
            text={''}
            callback={() => setShowModal(false)}
            classValue="max-w-[1000px]"
          >
            <div className="space-y-5 border p-2">
              {_.map(checklistSections, (section) => (
                <div key={section.label}>
                  <h3 className="mb-3 text-lg font-semibold">{section.label}</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {_.map(section.items, (item) => (
                      <FormCard
                        key={item.idPath}
                        title={item.config.name || item.idPath}
                        fields={item.config.fields}
                        onChange={() => {}}
                        value={{}}
                        parentID={item.idPath}
                        checkbox={true}
                      ></FormCard>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Modal>
        </AdminDashboardLayout>
      )}
    </>
  );
};

export default ManageChecklist;
