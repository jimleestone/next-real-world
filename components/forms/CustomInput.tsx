import { joinStylesFromArray } from '../../lib/utils/styles-builder';

export interface LoginFields {
  email: string;
  password: string;
}

export interface CommonInputProps {
  mode?: 'default' | 'failed' | 'success';
  size?: 's' | 'm' | 'l';
  placeholder: string;
  disabled: boolean;
  value: string;
  className?: string;
}

interface CustomInputProps extends CommonInputProps {
  type: 'text' | 'password' | 'email';
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

export const inputConfig = {
  basic: 'rounded-md border focus:outline-none focus:ring-4 focus:ring-opacity-50',
  disabled: 'cursor-not-allowed focus:ring-0',
  mode: {
    default: 'text-gray-900 bg-gray-50 border-gray-300 focus:border-primary focus:ring-primary-300',
    success:
      'bg-green-50 border-green-500 focus:border-green-500 focus:ring-green-300 text-green-900 placeholder-green-700',
    failed: 'bg-red-50 border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900 placeholder-red-700',
  },

  size: {
    s: 'px-3 p-2',
    m: 'px-4 py-2.5',
    l: 'px-5 py-3',
  },
};

export const joinInputStyles = ({
  mode,
  size,
  disabled,
}: Required<Pick<CommonInputProps, 'size' | 'mode' | 'disabled'>>) =>
  joinStylesFromArray(
    inputConfig.basic,
    inputConfig.mode[mode],
    inputConfig.size[size],
    disabled ? inputConfig.disabled : ''
  );

export default function CustomInput({
  mode = 'default',
  type,
  placeholder,
  disabled,
  value,
  onChange,
  size = 'l',
  className,
}: CustomInputProps) {
  return (
    <>
      <input
        className={`${joinInputStyles({ mode, size, disabled })} ${className}`}
        {...{ type, placeholder, disabled, onChange, value }}
        autoComplete={`${type === 'password' ? 'off' : 'on'}`}
      />
      {/* {errors &&  (
        <p className='mt-2 text-sm text-red-600'>
          <span className='font-medium'>{label}</span> field required
        </p>
      )} */}
    </>
  );
}
