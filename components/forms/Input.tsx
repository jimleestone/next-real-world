import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { joinStylesFromArray } from '../../lib/utils/styles-builder';

export type InputSize = 's' | 'm' | 'l';
export type InputType = 'text' | 'email' | 'password';
export type InputMode = 'default' | 'failed' | 'success';

export type InputProps = Partial<{
  label: string;
  type: InputType;
  size: InputSize;
  mode: InputMode;
}> &
  Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'>;

const inputConfig = {
  basic: 'rounded-md border focus:outline-none focus:ring-4 focus:ring-opacity-50 appearance-none',
  disabled: 'cursor-not-allowed focus:ring-0',
};

const inputSizeConfig: { [key in InputSize]: string } = {
  s: 'px-3 p-2',
  m: 'px-4 py-2.5',
  l: 'px-5 py-3',
};

const inputModeConfig: { [key in InputMode]: string } = {
  default: 'text-gray-900 bg-gray-50 border-gray-300 focus:border-primary focus:ring-primary-300',
  success:
    'bg-green-50 border-green-500 focus:border-green-500 focus:ring-green-300 text-green-900 placeholder-green-700',
  failed: 'bg-red-50 border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900 placeholder-red-700',
};

export const joinInputStyles = ({
  mode,
  size,
  disabled,
  className,
}: Pick<InputProps, 'size' | 'mode' | 'disabled' | 'className'>) =>
  joinStylesFromArray(
    inputConfig.basic,
    mode && inputModeConfig[mode],
    size && inputSizeConfig[size],
    disabled && inputConfig.disabled,
    className
  );

export default function Input({
  mode = 'default',
  label,
  type = 'text',
  size = 'm',
  className = '',
  disabled = false,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      aria-label={label}
      className={joinInputStyles({ mode, size, disabled, className })}
      autoComplete={`${type === 'password' ? 'off' : 'on'}`}
      {...props}
    />
  );
}
