import { joinStylesFromArray } from '../../lib/utils/styles-builder';

interface FormErrorMessageProps {
  className?: string;
  message?: string;
}

export default function FormErrorMessage({ message, className }: FormErrorMessageProps) {
  return <p className={joinStylesFromArray('text-sm text-red-600', className)}>{message && <span>{message}</span>}</p>;
}
