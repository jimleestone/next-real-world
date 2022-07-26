import { forwardRef, Ref } from 'react';
import { InputProps, joinInputStyles } from './Input';

function ControlInput(
  { mode = 'default', label, type = 'text', size = 'm', className = '', disabled = false, ...props }: InputProps,
  ref: Ref<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      type={type}
      aria-label={label}
      className={joinInputStyles({ mode, size, disabled, className })}
      autoComplete={`${type === 'password' ? 'off' : 'on'}`}
      {...props}
    />
  );
}

export default forwardRef<HTMLInputElement, InputProps>(ControlInput);
