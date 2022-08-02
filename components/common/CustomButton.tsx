import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { joinStyles, joinStylesFromArray } from '../../lib/utils/styles-builder';

export type ButtonColor = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 's' | 'm' | 'l';
type ButtonMode = 'default' | 'outline';
type ButtonColorPattern =
  | 'bgColor'
  | 'color'
  | 'hover'
  | 'focus'
  | 'active'
  | 'activeHover'
  | 'activeFocus'
  | 'disabled'
  | 'disabledHover'
  | 'disabledFocus';

export type ButtonProps = Partial<{
  color: ButtonColor;
  size: ButtonSize;
  outlined?: boolean;
}> &
  Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'color'>;

const buttonConfig = {
  shape: 'rounded border appearance-none',
  focus: 'focus:ring-4 focus:ring-opacity-50',
  active: 'active:ring-4 active:ring-opacity-50',
  activeFocus: 'active:focus:ring-4 active:focus:ring-opacity-50',
  disabled: 'rounded border disabled:cursor-not-allowed disabled:ring-0',
};

const buttonColorConfig: {
  [key in ButtonColor]: { [key in ButtonMode]: Partial<{ [key in ButtonColorPattern]: string }> };
} = {
  primary: {
    default: {
      bgColor: 'bg-primary border-primary',
      color: 'text-white',
      hover: 'hover:bg-primary-600 hover:border-primary-700',
      focus: 'focus:bg-primary-600 focus:border-primary-700 focus:ring-primary',
      active: 'active:bg-primary-600 active:border-primary-700 active:ring-primary',
      activeHover: 'active:hover:bg-primary-800 active:hover:border-primary-900',
      activeFocus: 'active:focus:bg-primary-800 active:focus:border-primary-900 active:focus:ring-primary',
      disabled: 'disabled:bg-primary-300 disabled:border-primary-300',
      disabledHover: 'disabled:hover:bg-primary-300 disabled:hover:border-primary-300',
      disabledFocus: 'disabled:focus:bg-primary-300 disabled:focus:border-primary-300',
    },
    outline: {
      bgColor: 'border-primary bg-transparent',
      color: 'text-primary',
      hover: 'hover:bg-primary hover:border-primary hover:text-white',
      focus: 'focus:bg-primary focus:border-primary focus:text-white focus:ring-primary',
      active: 'active:bg-primary active:border-primary active:text-white active:ring-primary',
      activeHover: 'active:hover:bg-primary-800 active:hover:border-primary-900 active:hover:text-white',
      activeFocus:
        'active:focus:bg-primary-800 active:focus:border-primary-900 active:focus:text-white active:focus:ring-primary',
      disabled: 'disabled:bg-primary-300 disabled:border-primary-300 disabled:text-white',
      disabledHover: 'disabled:hover:bg-primary-300 disabled:hover:border-primary-300 disabled:hover:text-white',
      disabledFocus: 'disabled:focus:bg-primary-300 disabled:focus:border-primary-300 disabled:hover:text-white',
    },
  },
  secondary: {
    default: {
      bgColor: 'bg-gray-400 border-gray-400',
      color: 'text-white',
      hover: 'hover:bg-gray-500 hover:border-gray-600',
      focus: 'focus:bg-gray-500 focus:border-gray-600 focus:ring-gray-400',
      active: 'active:bg-gray-500 active:border-gray-600 active:ring-gray-400',
      activeHover: 'active:hover:bg-gray-500 active:hover:border-gray-600',
      activeFocus: 'active:focus:bg-gray-600 active:focus:border-gray-700 active:focus:ring-gray-400',
      disabled: 'disabled:bg-gray-300 disabled:border-gray-300',
      disabledHover: 'disabled:hover:bg-gray-300 disabled:hover:border-gray-300',
      disabledFocus: 'disabled:focus:bg-gray-300 disabled:focus:border-gray-300',
    },
    outline: {
      bgColor: 'border-gray-400 bg-transparent',
      color: 'text-gray-400',
      hover: 'hover:bg-gray-400 hover:border-gray-400 hover:text-white',
      focus: 'focus:bg-gray-400 focus:border-gray-500 focus:text-white focus:ring-gray-400',
      active: 'active:bg-gray-400 active:border-gray-500 active:text-white active:ring-gray-400',
      activeHover: 'active:hover:bg-gray-400 active:hover:border-gray-500 active:hover:text-white',
      activeFocus:
        'active:focus:bg-gray-500 active:focus:border-gray-600 active:focus:text-white active:focus:ring-gray-400',
      disabled: 'disabled:bg-gray-300 disabled:border-gray-300 disabled:text-white',
      disabledHover: 'disabled:hover:bg-gray-300 disabled:hover:border-gray-300 disabled:hover:text-white',
      disabledFocus: 'disabled:focus:bg-gray-300 disabled:focus:border-gray-300 disabled:hover:text-white',
    },
  },
  danger: {
    default: {
      bgColor: 'bg-red-600 border-red-600',
      color: 'text-white',
      hover: 'hover:bg-red-700 hover:border-red-700',
      focus: 'focus:bg-red-700 focus:border-red-800 focus:ring-red-300',
      active: 'active:bg-red-700 active:border-red-800 active:ring-red-300',
      activeHover: 'active:hover:bg-red-700 active:hover:border-red-800',
      activeFocus: 'active:focus:bg-red-800 active:focus:border-red-900 active:focus:ring-red-300',
      disabled: 'disabled:bg-red-300 disabled:border-red-300',
      disabledHover: 'disabled:hover:bg-red-300 disabled:hover:border-red-300',
      disabledFocus: 'disabled:focus:bg-red-300 disabled:focus:border-red-300',
    },
    outline: {
      bgColor: 'border-red-600 bg-transparent',
      color: 'text-red-600',
      hover: 'hover:bg-red-600 hover:border-red-600 hover:text-white',
      focus: 'focus:bg-red-600 focus:border-red-700 focus:text-white focus:ring-red-300',
      active: 'active:bg-red-600 active:border-red-700 active:text-white active:ring-red-300',
      activeHover: 'active:hover:bg-red-600 active:hover:border-red-700 active:hover:text-white',
      activeFocus:
        'active:focus:bg-red-700 active:focus:border-red-800 active:focus:text-white active:focus:ring-red-300',
      disabled: 'disabled:bg-red-300 disabled:border-red-300 disabled:text-white',
      disabledHover: 'disabled:hover:bg-red-300 disabled:hover:border-red-300 disabled:hover:text-white',
      disabledFocus: 'disabled:focus:bg-red-300 disabled:focus:border-red-300 disabled:hover:text-white',
    },
  },
};

const buttonSizeConfig: { [key in ButtonSize]: string } = {
  s: 'px-2 py-1',
  m: 'px-3.5 py-2',
  l: 'px-5 py-2 text-xl font-medium',
};

export const joinButtonStyles = ({
  color,
  size,
  outlined,
  className,
}: Pick<ButtonProps, 'size' | 'color' | 'outlined' | 'className'>) =>
  joinStylesFromArray(
    joinStyles(buttonConfig),
    size && buttonSizeConfig[size],
    color && (outlined ? joinStyles(buttonColorConfig[color].outline) : joinStyles(buttonColorConfig[color].default)),
    className
  );

export default function CustomButton({
  type = 'button',
  size = 'm',
  outlined = false,
  color = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={joinButtonStyles({ color, size, outlined, className })} {...props}>
      {children}
    </button>
  );
}
