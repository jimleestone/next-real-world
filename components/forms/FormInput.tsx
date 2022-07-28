import { useEffect } from 'react';
import { Path, useController, useFormContext, useFormState, useWatch } from 'react-hook-form';
import { useErrorsHandler } from '../../lib/hooks/use-errors-handler';
import ControlInput from './control-input';
import FormErrorMessage from './FormErrorMessage';
import { InputProps } from './Input';

export type FormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  watch?: boolean; // RHF 'onBlur' mode to watch change
} & Omit<InputProps, 'name'>;

export default function FormInput<TFormValues extends Record<string, any>>({
  name,
  watch = false,
  ...props
}: FormInputProps<TFormValues>) {
  const { control, trigger } = useFormContext();
  const { isSubmitting } = useFormState({ control });
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;
  const { dismiss } = useErrorsHandler();

  const watching = useWatch({ control, name });
  useEffect(() => {
    console.log('dddddd');
    if (watch) trigger(name);
    dismiss();
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
