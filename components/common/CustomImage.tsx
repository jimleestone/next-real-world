import Image from 'next/image';
import { DEFAULT_AVATAR, DEFAULT_AVATAR_PLACEHOLDER } from '../../lib/constants';

interface CustomImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  size?: 's' | 'm' | 'l';
  rounded?: boolean;
}

const imageConfig = {
  basic: 'overflow-hidden relative',
  rounded: 'rounded-full',
  size: {
    s: 'w-5 h-5',
    m: 'w-10 h-10',
    l: 'w-24 h-24',
  },
};

export default function CustomImage({ size = 'm', rounded = true, alt, className, src }: CustomImageProps) {
  function onHandleBrokenImage() {
    return (ev: React.SyntheticEvent<HTMLImageElement, Event>) => {
      ev.currentTarget.src = DEFAULT_AVATAR;
    };
  }

  return (
    <div className={`${imageConfig.basic} ${imageConfig.size[size]} ${rounded && imageConfig.rounded} ${className}`}>
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
