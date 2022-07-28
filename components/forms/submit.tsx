import { useFormContext, useFormState } from 'react-hook-form';
import { useErrorsHandler } from '../../lib/hooks/use-errors-handler';
import CustomButton, { ButtonProps, joinButtonStyles } from '../common/CustomButton';

type SubmitProps = Partial<{
  strict: boolean; // when using RHF 'isValid' state to control this button, switch to true
}> &
  ButtonProps;

export default function Submit({ color, size, outlined, className, children, strict = false, ...props }: SubmitProps) {
  const { control } = useFormContext();
  const { isSubmitting, isValid } = useFormState({ control });
  const { toasting, errors } = useErrorsHandler();
  return (
    <CustomButton
      type='submit'
      className={joinButtonStyles({ color, size, outlined, className })}
      {...props}
      disabled={isSubmitting || (strict && !isValid) || !!toasting || !!errors}
    >
      {children}
    </CustomButton>
  );
}
