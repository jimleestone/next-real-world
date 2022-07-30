import { Path, useController, useFormContext, useFormState } from 'react-hook-form';
import { useFormCallback } from '../../lib/hooks/use-form-callback';
import ControlInput from './control-input';
import FormErrorMessage from './FormErrorMessage';
import { InputProps } from './Input';

export interface FormInputBaseProps<TFormValues> {
  name: Path<TFormValues>;
  watch?: boolean; // RHF 'onBlur' mode to watch change
  clear?: boolean; //clear after submit successful and page not redirect
}

export type FormInputProps<TFormValues> = FormInputBaseProps<TFormValues> & Omit<InputProps, 'name'>;

export default function FormInput<TFormValues extends Record<string, any>>({
  name,
  watch,
  clear,
  ...props
}: FormInputProps<TFormValues>) {
  const { control } = useFormContext();
  const { isSubmitting } = useFormState({ control });
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;

  useFormCallback({ watch, clear, name });

  return (
    <>
      <ControlInput
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
