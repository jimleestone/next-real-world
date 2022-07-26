import { joinStylesFromArray } from '../../lib/utils/styles-builder';

export type AlertType = 'info' | 'danger' | 'success';

type AlertProps = Partial<{
  type: AlertType;
  message: string;
  className: string;
}>;

const alertConfig = {
  basic: 'flex px-4 py-2 my-2 text-sm rounded-lg font-semibold h-10', // a fixed height to take the place permanently
};

const alertTypeConfig: { [key in AlertType]: string } = {
  info: 'text-primary-700 bg-green-100',
  danger: 'text-red-700 bg-red-100',
  success: 'text-green-700 bg-green-100',
};

const alertPrefixConfig: { [key in AlertType]: string } = {
  info: 'Info',
  danger: 'Error',
  success: 'Success',
};

const joinAlertStyles = ({ type, message, className }: AlertProps) =>
  joinStylesFromArray(alertConfig.basic, message && type && alertTypeConfig[type], className);

export default function Alert({ type = 'info', message, className }: AlertProps) {
  return (
    <div className={joinAlertStyles({ type, message, className })} role='alert'>
      {message && (
        <>
          <svg
            aria-hidden='true'
            className={`flex-shrink-0 w-5 h-5 ${alertTypeConfig[type]}`}
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
              clipRule='evenodd'
            ></path>
          </svg>
          <span className='sr-only'>{alertPrefixConfig[type]}</span>
          <p className='ml-2'> {message}</p>
        </>
      )}
    </div>
  );
}
