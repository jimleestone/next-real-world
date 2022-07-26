import * as R from 'ramda';
import { useState } from 'react';
import { Path, useController, useFormContext } from 'react-hook-form';
import TagList from '../common/TagList';
import FormErrorMessage from './FormErrorMessage';
import Input, { InputProps } from './Input';

export type TagInputProps<TFormValues extends { tagList: string[] }> = {
  name: Path<TFormValues>;
} & Omit<InputProps, 'name'>;

export default function TagInput<TFormValues extends Record<string, any> & { tagList: string[] }>({
  name,
  ...props
}: TagInputProps<TFormValues>) {
  const { control, trigger, formState, setValue } = useFormContext();
  const { isSubmitting } = formState;
  const { field, fieldState } = useController({ name, control });
  const { value } = field;
  const { error, isDirty } = fieldState;
  const [tag, setTag] = useState('');

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
        if (tag.trim().length > 0) {
          setValue('tagList', R.append(tag.trim(), value));
        }
        setTag('');
        trigger(name);
      }
    };
  }

  function onRemoveTag(index: number) {
    setValue('tagList', R.remove(index, 1, value)); // haven't find a better way to deal with the 'setValue' function in typescript
    trigger(name);
  }

  function onBlur(): (ev: React.FocusEvent) => void {
    return (ev) => {
      ev.preventDefault();
      trigger(name);
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
