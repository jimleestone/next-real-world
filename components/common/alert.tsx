import { MessageType, useMessageHandler } from '../../lib/hooks/use-message';
import { joinStylesFromArray } from '../../lib/utils/styles-builder';

type AlertProps = Partial<{
  className: string;
}>;

const alertConfig = {
  basic: 'flex px-4 py-2 text-sm rounded-lg font-medium',
};

const alertTypeConfig: { [key in MessageType]: string } = {
  info: 'text-primary-700 bg-green-100',
  error: 'text-red-700 bg-red-100',
  success: 'text-green-700 bg-green-200',
};

const alertPrefixConfig: { [key in MessageType]: string } = {
  info: 'Info',
  error: 'Error',
  success: 'Success',
};

const joinAlertStyles = ({ type, className }: { type: MessageType; className?: string }) =>
  joinStylesFromArray(alertConfig.basic, alertTypeConfig[type], className);

export default function Alert({ className }: AlertProps) {
  const { message } = useMessageHandler();
  return (
    <div className='my-2 h-10' role='alert'>
      {message && message.mode === 'alert' && (
        <div className={joinAlertStyles({ className, type: message.type })}>
          <svg
            aria-hidden='true'
            className={`inline shrink-0 w-5 h-5 ${alertTypeConfig[message.type]}`}
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
          <span className='sr-only'>{alertPrefixConfig[message.type]}</span>
          <p className='ml-2'> {message.content}</p>
        </div>
      )}
    </div>
  );
}
