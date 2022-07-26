import { CommonInputProps, joinInputStyles } from './CustomInput';

interface TextAreaProps extends CommonInputProps {
  rows: number;
  onChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextAreaInput({
  placeholder,
  disabled,
  value,
  size = 'l',
  mode = 'default',
  className,
  rows,
  onChange,
}: TextAreaProps) {
  return (
    <>
      <textarea
        {...{ placeholder, disabled, value, onChange, rows }}
        className={`${joinInputStyles({ mode, size, disabled })} ${className}`}
        autoComplete='on'
      ></textarea>
    </>
  );
}
