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
}: ResponsiveImageProps) => (
  <picture className={pictureClassName}>
    <source srcSet={asset.srcSet} sizes={sizes} type="image/webp" />
    <img
      src={asset.src}
      alt={alt}
      width={asset.width}
      height={asset.height}
      sizes={sizes}
      className={imgClassName}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
    />
  </picture>
);

export default ResponsiveImage;
