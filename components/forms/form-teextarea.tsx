import { useEffect } from 'react';
import { Path, useController, useFormContext, useFormState, useWatch } from 'react-hook-form';
import { useErrorsHandler } from '../../lib/hooks/use-errors-handler';
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
  const { dismiss } = useErrorsHandler();

  const watching = useWatch({ control, name });
  useEffect(() => {
    if (watch) trigger(name);
    dismiss();
  }, [watching, trigger, name, watch, dismiss]);

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
