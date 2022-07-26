import { DetailedHTMLProps, forwardRef, Ref, TextareaHTMLAttributes } from 'react';
import { InputMode, InputSize, joinInputStyles } from './Input';

export type TextareaProps = Partial<{
  label: string;
  size: InputSize;
  mode: InputMode;
}> &
  DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

function Textarea(
  { mode = 'default', label, size = 'm', className = '', disabled = false, ...props }: TextareaProps,
  ref: Ref<HTMLTextAreaElement>
) {
  return (
    <textarea
      ref={ref}
      aria-label={label}
      className={joinInputStyles({ mode, size, disabled, className })}
      autoComplete='on'
      {...props}
    />
  );
}

export default forwardRef<HTMLTextAreaElement, TextareaProps>(Textarea);
