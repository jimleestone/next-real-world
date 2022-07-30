import { useController, useFormContext, useFormState } from 'react-hook-form';
import { useFormCallback } from '../../lib/hooks/use-form-callback';
import FormErrorMessage from './FormErrorMessage';
import { FormInputBaseProps } from './FormInput';
import Textarea, { TextareaProps } from './textarea';

export type FormTextareaProps<TFormValues> = FormInputBaseProps<TFormValues> & Omit<TextareaProps, 'name'>;

export default function FormTextarea<TFormValues extends Record<string, any>>({
  name,
  watch,
  clear,
  ...props
}: FormTextareaProps<TFormValues>) {
  const { control } = useFormContext();
  const { isSubmitting } = useFormState();
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;

  useFormCallback({ name, watch, clear });

  return (
    <>
      <Textarea
        mode={error ? 'failed' : 'default'}
        aria-invalid={!!error}
        {...props}
        {...field}
        disabled={isSubmitting}
      />
      <FormErrorMessage message={error?.message} />
    </>
  );
}
