import { useEffect } from 'react';
import { Path, useController, useFormContext, useFormState, useWatch } from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';
import Textarea, { TextareaProps } from './textarea';

export type FormTextareaProps<TFormValues> = {
  name: Path<TFormValues>;
  watch?: boolean; // RHF 'onBlur' mode to watch change
  clear?: boolean; //clear after submit successful
} & Omit<TextareaProps, 'name'>;

export default function FormTextarea<TFormValues extends Record<string, any>>({
  name,
  watch = false,
  clear = false,
  ...props
}: FormTextareaProps<TFormValues>) {
  const { control, trigger, reset } = useFormContext();
  const { isSubmitting, isSubmitSuccessful } = useFormState();
  const { field, fieldState } = useController({ name, control });
  const { error, isDirty } = fieldState;

  const watching = useWatch({ control, name });
  useEffect(() => {
    if (watch) trigger(name);
  }, [watching, trigger, name, watch]);

  useEffect(() => {
    if (clear) reset();
  }, [clear, isSubmitSuccessful, reset, name]);

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
