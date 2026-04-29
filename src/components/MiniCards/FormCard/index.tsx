import { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import TextArea from '../../form-items/TextArea';
import Toggle from '../../form-items/Toggle';
import _ from 'lodash';
import NumberInput from '../../form-items/NumberInput';
import Checkbox from '../../form-items/Checkbox';
import Paragraph from '../../ElementWrapper/Paragraph';

type TFormCard = {
  title: string;
  fields?: Record<string, { type: string; name: string; value?: string }>;
  value: Record<string, unknown> | boolean;
  parentID: string;
  onChange: (parentID: string, id: string, e: any) => void;
  onReset?: (parentID: string) => void;
  onBlur?: () => void;
  checkbox?: boolean;
};

const FormCard: FunctionComponent<TFormCard> = ({
  title,
  fields,
  onChange,
  value,
  parentID,
  onReset,
  onBlur,
  checkbox,
}) => {
  const getFieldValue = (fieldKey: string): string => {
    if (value && typeof value === 'object') {
      const raw = (value as Record<string, unknown>)[fieldKey];
      if (raw === undefined || raw === null) {
        return '';
      }
      return String(raw);
    }
    return '';
  };

  const getChecked = (): boolean => {
    if (typeof value === 'boolean') {
      return value;
    }

    if (value && typeof value === 'object') {
      return Boolean((value as Record<string, unknown>).checked);
    }

    return false;
  };

  const getToggleValue = (fieldKey: string): boolean => {
    if (value && typeof value === 'object') {
      return Boolean((value as Record<string, unknown>)[fieldKey]);
    }
    return false;
  };

  const getJsx = (
    parentID: string,
    inputType: string,
    id: string,
    fieldTitle: string,
    value: string,
    fieldText?: string
  ) => {
    switch (inputType) {
      case 'number':
        return (
          <NumberInput
            title={fieldTitle}
            id={id}
            value={value || '0'}
            onChange={(e) => onChange(parentID, id, e)}
          />
        );
      case 'textarea':
        return (
          <TextArea
            title={fieldTitle}
            rows={2}
            id={id}
            value={value || ''}
            onChange={(e) => onChange(parentID, id, e)}
            placeholder=""
            onBlur={onBlur}
          />
        );
      case 'toggle':
        return (
          <Toggle
            title={fieldTitle}
            id={id}
            onChange={(e) => onChange(parentID, id, e)}
            checked={getToggleValue(id)}
          />
        );
      case 'text':
        return <Paragraph classValue="text-xs">{fieldText}</Paragraph>;
      default:
        return null;
    }
  };

  return (
    <div className="admin-form-card h-full rounded-lg border border-slate-300 bg-white p-6">
      {checkbox && (
        <Checkbox
          id={parentID}
          title={title}
          checked={getChecked()}
          onChange={(e) => onChange(parentID, 'checked', e)}
        />
      )}
      {!checkbox && (
        <h5 className="mb-2 block text-xl font-semibold leading-snug tracking-normal text-slate-900">
          {title}
          {onReset && (
            <FontAwesomeIcon
              icon={faEraser}
              color="#2563eb"
              cursor="pointer"
              onClick={() => onReset?.(parentID)}
            />
          )}
        </h5>
      )}
      {fields &&
        _.map(fields, (fv, fk) =>
          getJsx(
            parentID,
            fv.type,
            fk,
            fv.name,
            getFieldValue(fk),
            fv.value || ''
          )
        )}
    </div>
  );
};

export default FormCard;
