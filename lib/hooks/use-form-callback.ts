import { useEffect } from 'react';
import { useController, useFormContext, useFormState, useWatch } from 'react-hook-form';
import { FormInputBaseProps } from '../../components/forms/FormInput';
import { useMessageHandler } from './use-message';
/**
 * just a few shared uses of <input/> and <textarea/>
 * make sure this hook is inside a react-hook-form context
 * @param
 */
export function useFormCallback<TFormValues>({ name, watch = false, clear = false }: FormInputBaseProps<TFormValues>) {
  const { control, trigger, resetField } = useFormContext();
  const { isSubmitSuccessful } = useFormState();
  const { dismiss, message } = useMessageHandler();
  const { fieldState } = useController({ name, control });
  const { isDirty, isTouched } = fieldState;

  const watching = useWatch({ control, name });
  useEffect(() => {
    if (watch) trigger(name); // trigger validation on change manually
    if (isDirty || isTouched) dismiss(); // dismiss messages from fetching data
  }, [watching, trigger, name, watch, dismiss, isDirty, isTouched]);

  useEffect(() => {
    if (clear && isSubmitSuccessful && (!message || message.type === 'success')) resetField(name); // manually reset field after a successful submit
  }, [clear, isSubmitSuccessful, resetField, name, message]);
}
