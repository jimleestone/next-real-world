import TagList from '../common/TagList';
import { CommonInputProps, joinInputStyles } from './CustomInput';

interface TagInputProps extends CommonInputProps {
  listValue: string[];
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: () => void;
  onRemoveItem: (index: number) => void;
}

export default function TagInput({
  size = 'l',
  placeholder,
  disabled,
  value,
  listValue,
  className,
  mode = 'default',
  onChange,
  onEnter,
  onRemoveItem,
}: TagInputProps) {
  return (
    <>
      <input
        type='text'
        className={`${joinInputStyles({ mode, size, disabled })} ${className}`}
        {...{ placeholder, disabled, value, onChange }}
        onKeyDown={(ev) => ev.key === 'Enter' && ev.preventDefault()}
        onKeyUp={onListFieldKeyUp(onEnter)}
        autoComplete='on'
      />
      <TagList tagList={listValue} onRemoveItem={onRemoveItem} />
    </>
  );
}

export function onListFieldKeyUp(onEnter: () => void): (ev: React.KeyboardEvent) => void {
  return (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      onEnter();
    }
  };
}
