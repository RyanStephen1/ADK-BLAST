import type { ImgHTMLAttributes } from 'react';
import type { ResponsiveImageAsset } from '../lib/assets';

type LoadingValue = ImgHTMLAttributes<HTMLImageElement>['loading'];
type DecodingValue = ImgHTMLAttributes<HTMLImageElement>['decoding'];
type FetchPriorityValue = ImgHTMLAttributes<HTMLImageElement>['fetchPriority'];

interface ResponsiveImageProps {
  asset: ResponsiveImageAsset;
  alt: string;
  sizes: string;
  pictureClassName?: string;
  imgClassName?: string;
  loading?: LoadingValue;
  decoding?: DecodingValue;
  fetchPriority?: FetchPriorityValue;
  /** When true, omits width/height attrs so CSS can control dimensions freely */
  fill?: boolean;
}

const ResponsiveImage = ({
  asset,
  alt,
  sizes,
  pictureClassName,
  imgClassName,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  fill = false,
}: ResponsiveImageProps) => (
  <picture
    className={`${pictureClassName} ${fill ? 'block w-full h-full' : ''}`}
  >
    <source srcSet={asset.srcSet} sizes={sizes} type="image/webp" />
    <img
      src={asset.src}
      alt={alt}
      {...(!fill && { width: asset.width, height: asset.height })}
      sizes={sizes}
      className={`${imgClassName} ${fill ? 'w-full! h-full! object-cover' : ''}`}
      style={fill ? { width: '100%', height: '100%', objectFit: 'cover' } : undefined}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
    />
  </picture>
);

export default ResponsiveImage;

