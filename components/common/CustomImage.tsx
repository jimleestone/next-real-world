import Image from 'next/image';
import { DEFAULT_IMAGE_SOURCE } from '../../lib/constants';

interface CustomImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}
export default function CustomImage({ src, alt, width, height, className }: CustomImageProps) {
  return (
    <Image
      unoptimized
      src={src || DEFAULT_IMAGE_SOURCE}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  );
}
