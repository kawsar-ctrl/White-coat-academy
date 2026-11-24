import React, { useState } from 'react';
import { Stethoscope } from 'lucide-react';

export const BRAND_NAME = 'WHITE COAT ACADEMY';
export const BRAND_LOGO_SRC =
  '/assets/aistudio/8HLW-UivjuweAG0Z3BMQDOEyyuc3w7XkXDl76apkwyDA-6vZ7GhI_cEw06IsefJpb82KO6Se8eQ_1LDE4DQ-m-IfAz5w1x-6iyo0Pq-zWapx8bqUysJFUtJj9E88eBTrHfSkQc2MXqfN39R4Wdk5je2G7SPipjGUlb-WEKqFyl1xD5R9Ycz-vUtj-_w1Ou1Y_5bf0d538.jfif';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', className = '' }) => {
  const [imgFailed, setImgFailed] = useState(false);

  const dims =
    size === 'sm'
      ? 'w-7 h-7 rounded-md'
      : size === 'lg'
        ? 'w-14 h-14 sm:w-16 sm:h-16 rounded-xl'
        : 'w-9 h-9 rounded-lg';

  const iconDims =
    size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-7 h-7' : 'w-4 h-4';

  if (imgFailed) {
    return (
      <span
        className={`${dims} bg-gradient-to-br from-[#23296B] to-[#121642] border border-white/80 shadow-[0_8px_18px_-6px_rgba(22,27,77,0.45),inset_0_1px_1px_rgba(255,255,255,0.45)] text-white inline-flex items-center justify-center shrink-0 ${className}`}
        aria-hidden="true"
      >
        <Stethoscope className={iconDims} />
      </span>
    );
  }

  return (
    <img
      src={BRAND_LOGO_SRC}
      alt="WHITE COAT ACADEMY Logo"
      referrerPolicy="no-referrer"
      onError={() => setImgFailed(true)}
      className={`${dims} object-cover border border-white/85 shadow-[0_8px_18px_-6px_rgba(29,19,54,0.35)] bg-[#161B4D] shrink-0 ${className}`}
    />
  );
};
