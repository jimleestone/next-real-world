import { animated, useSpring } from '@react-spring/web';
import { useEffect, useRef } from 'react';
import { useErrorsHandler } from '../../lib/hooks/use-errors-handler';
import { joinStylesFromArray } from '../../lib/utils/styles-builder';

type ToastType = 'error' | 'success';

interface ToastProps {
  type?: ToastType;
}

const toastConfig = 'fixed right-5 bottom-5 p-4 w-full max-w-xs rounded-lg shadow-lg';
const toastTypeConfig: { [key in ToastType]: string } = {
  error: 'text-red-600 bg-red-300 ',
  success: 'text-green-600 bg-green-300 ',
};

const joinToastStyles = (type: ToastType) => joinStylesFromArray(toastConfig, toastTypeConfig[type]);

export default function Toast({ type = 'error' }: ToastProps) {
  const { toasting, dismiss } = useErrorsHandler();
  const removeRef = useRef(dismiss);
  removeRef.current = dismiss;
  const styles = useSpring({
    to: { opacity: toasting ? 1 : 0 },
    from: { opacity: 0 },
    config: { duration: 500 },
  });
  useEffect(() => {
    const duration = 4500;
    const id = setTimeout(() => removeRef.current(), duration);

    return () => clearTimeout(id);
  }, [toasting]);

  return (
    <animated.div style={styles}>
      {toasting && (
        <div className={joinToastStyles(type)} role='alert'>
          <p className='font-normal whitespace-nowrap overflow-clip'>{toasting}</p>
        </div>
      )}
    </animated.div>
  );
}
