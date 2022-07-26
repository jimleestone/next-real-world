import { useEffect } from 'react';
import { Path, useController, useFormContext, useFormState, useWatch } from 'react-hook-form';
import ControlInput from './control-input';
import FormErrorMessage from './FormErrorMessage';
import { InputProps } from './Input';

export type FormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  watch?: boolean; // RHF 'onBlur' mode to watch change
  dismiss?: () => void; // dismiss external error message
} & Omit<InputProps, 'name'>;

export default function FormInput<TFormValues extends Record<string, any>>({
  name,
  watch = false,
  dismiss,
  ...props
}: FormInputProps<TFormValues>) {
  const { control, trigger } = useFormContext();
  const { isSubmitting } = useFormState({ control });
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;

  const watching = useWatch({ control, name });
  useEffect(() => {
    if (watch) trigger(name);
    if (dismiss) dismiss();
  }, [watching, trigger, name, watch, dismiss]);

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
