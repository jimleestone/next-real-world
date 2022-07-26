import React from 'react';
import CustomButton from '../common/CustomButton';
import Errors, { GenericErrors } from '../common/Errors';
import CustomInput from './CustomInput';
import TagInput from './TagInput';
import TextAreaInput from './TextAreaInput';

export interface CustomFormField {
  name: string;
  type: 'text' | 'password' | 'email';
  placeholder: string;
  rows?: number;
  fieldType: 'input' | 'textarea' | 'list';
  listName?: string;
  size: 's' | 'm' | 'l';
}

export interface CustomFormProps {
  fields: CustomFormField[];
  disabled: boolean;
  formObject: Record<string, string | null>;
  submitButtonText: string;
  errors: GenericErrors;
  onChange: (name: string, value: string) => void;
  onSubmit: (ev: React.FormEvent) => void;
  onAddItemToList?: (name: string) => void;
  onRemoveListItem?: (name: string, index: number) => void;
}

export default function CustomForm({
  fields,
  disabled,
  formObject,
  submitButtonText,
  errors,
  onChange,
  onSubmit,
  onAddItemToList,
  onRemoveListItem,
}: CustomFormProps) {
  return (
    <>
      <Errors errors={errors} />
      <form onSubmit={onSubmit}>
        <fieldset className='flex flex-col justify-center mx-auto space-y-6'>
          {fields.map((field) =>
            field.fieldType === 'input' ? (
              <CustomInput
                key={field.name}
                disabled={disabled}
                type={field.type}
                placeholder={field.placeholder}
                value={formObject[field.name] || ''}
                onChange={onUpdateField(field.name, onChange)}
                size={field.size}
              />
            ) : field.fieldType === 'textarea' ? (
              <TextAreaInput
                key={field.name}
                disabled={disabled}
                placeholder={field.placeholder}
                value={formObject[field.name] || ''}
                rows={field.rows as number}
                onChange={onUpdateField(field.name, onChange)}
                size={field.size}
              />
            ) : (
              <TagInput
                key={field.name}
                disabled={disabled}
                placeholder={field.placeholder}
                value={formObject[field.name] || ''}
                onChange={onUpdateField(field.name, onChange)}
                listValue={formObject[field.listName as string] as unknown as string[]}
                onEnter={() => onAddItemToList && field.listName && onAddItemToList(field.listName)}
                onRemoveItem={(index) => onRemoveListItem && field.listName && onRemoveListItem(field.listName, index)}
                size={field.size}
              />
            )
          )}
          <CustomButton type='submit' color='primary' size='l' className='self-end text-lg font-medium'>
            {submitButtonText}
          </CustomButton>
        </fieldset>
      </form>
    </>
  );
}

export function buildCustomFormField(data: Partial<CustomFormField> & { name: string }): CustomFormField {
  return {
    type: 'text',
    placeholder: '',
    fieldType: 'input',
    size: 'l',
    ...data,
  };
}

function onUpdateField(
  name: string,
  onChange: CustomFormProps['onChange']
): (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void {
  return ({ target: { value } }) => {
    onChange(name, value);
  };
}
