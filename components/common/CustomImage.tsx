import Image from 'next/image';
import { DEFAULT_AVATAR, DEFAULT_AVATAR_PLACEHOLDER } from '../../lib/constants';

interface CustomImageProps {
  src?: string | null;
  alt: string;
  className?: string;
}
export default function CustomImage({ alt, className, src }: CustomImageProps) {
  function onHandleBrokenImage() {
    return (ev: React.SyntheticEvent<HTMLImageElement, Event>) => {
      ev.currentTarget.src = DEFAULT_AVATAR;
    };
  }

  return (
    <div className={className}>
      <Image
        unoptimized
        src={src || DEFAULT_AVATAR}
        alt={alt}
        layout='fill'
        objectFit='cover'
        placeholder='blur'
        blurDataURL={DEFAULT_AVATAR_PLACEHOLDER}
        onError={onHandleBrokenImage()}
      />
    </div>
  );
}
