import * as R from 'ramda';
import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useMessageHandler } from '../../lib/hooks/use-message';
import TagList from '../common/TagList';
import FormErrorMessage from './FormErrorMessage';
import Input, { InputProps } from './Input';

export type TagInputProps<TFormValues extends { tagList: string[] }> = {
  name: 'tagList'; // Path<TFormValues>; // haven't find a better approach to deal with the 'setValue' function in typescript
} & Omit<InputProps, 'name'>;

export default function TagInput<TFormValues extends Record<string, any> & { tagList: string[] }>({
  name,
  ...props
}: TagInputProps<TFormValues>) {
  const { control, trigger, formState, setValue } = useFormContext();
  const { isSubmitting } = formState;
  const { field, fieldState } = useController({ name, control });
  const { value } = field;
  const { error } = fieldState;
  const [tag, setTag] = useState('');
  const { dismiss } = useMessageHandler();

  function executeCheck() {
    trigger(name);
    dismiss();
  }

  function onChange(): (ev: React.ChangeEvent<HTMLInputElement>) => void {
    return ({ target: { value } }) => {
      setTag(value);
    };
  }
  function onKeyDown(): (ev: React.KeyboardEvent) => void {
    return (ev) => ev.key === 'Enter' && ev.preventDefault();
  }

  function onAddTag(): (ev: React.KeyboardEvent) => void {
    return (ev) => {
      if (ev.key === 'Enter') {
        ev.preventDefault();
        if (
          tag.trim().length > 0 &&
          !value.some((val: string) => {
            // remove the duplicated tag ignore case
            return val.toLowerCase() === tag.trim().toLowerCase();
          })
        ) {
          setValue(name, R.append(tag.trim(), value));
        }
        setTag('');
        executeCheck();
      }
    };
  }

  function onRemoveTag(index: number) {
    setValue(name, R.remove(index, 1, value));
    executeCheck();
  }

  function onBlur(): (ev: React.FocusEvent) => void {
    return (ev) => {
      ev.preventDefault();
      executeCheck();
    };
  }

  return (
    <>
      <Input
        value={tag}
        mode={error ? 'failed' : 'default'}
        aria-invalid={!!error}
        {...props}
        disabled={isSubmitting}
        onChange={onChange()}
        onKeyUp={onAddTag()}
        onKeyDown={onKeyDown()}
        onBlur={onBlur()}
      />
      <TagList tagList={value} onRemoveItem={onRemoveTag} className='mt-2' />
      <FormErrorMessage message={error?.message} />
    </>
  );
}
