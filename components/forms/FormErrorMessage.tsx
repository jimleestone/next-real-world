import { joinStylesFromArray } from '../../lib/utils/styles-builder';

type FormErrorMessageProps = Partial<{
  className: string;
  message: string;
}>;

export default function FormErrorMessage({ message, className }: FormErrorMessageProps) {
  return (
    <div className='pt-1 pb-3 px-4 h-8'>
      {message && <p className={joinStylesFromArray('text-sm text-red-600', className)}>{message}</p>}
    </div>
  );
}
